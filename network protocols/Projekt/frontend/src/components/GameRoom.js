import { DeleteRoom, GetUserNames, changeRoomName, DeleteUserName, hideRoom, AddToChatLogs, GetRoomnames, AddToPlayersLogs, GetPlayerID, ClearUsernames } from "../actions/MainActions"
import { connect } from "react-redux"
import { Button, Container, Row, Col, InputGroup, FormControl, Card } from "react-bootstrap"
import { useParams, useHistory, withRouter, Link } from "react-router-dom"
import Cookies from 'universal-cookie'
import { useState, useEffect } from "react"
import Paho from "paho-mqtt"

const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
const client = new Paho.Client("broker.mqttdashboard.com", 8000, clientId)
const cookies = new Cookies();
const images = Array.from({length: 25}, (_, i) => i + 1)

const GameRoom = ({DeleteRoom, GetUserNames, usernames, changeRoomName, DeleteUserName, GetRoomnames, hideRoom, AddToChatLogs, current_roomname, AddToPlayersLogs, GetPlayerID, ClearUsernames}) => {

    const [chatMessage, setChatMessage] = useState('')
    const {id} = useParams()
    const [settedRoomName, setRoomName] = useState('')
    const [bothPlayersConnected, setBothPlayersConnected] = useState(false)
    const [firstPlayerTurn, setFirstPlayerTurn] = useState(null)
    const [randomImage, setRandomImage] = useState(null)
    const [id_one, set_id_one] = useState(0)
    const [id_two, set_id_two] = useState(0)
    const [mqttState, setmqttState] = useState('disconnected')

    const history = useHistory()
    const cookieUsername = cookies.get('username')

    useEffect(() =>{
        GetRoomnames()
        setRandomImage(images[Math.floor(Math.random()*images.length)])
        GetUserNames(id, {player: cookieUsername})
        const options = {
            timeout: 3,
            userName: cookieUsername,
            onSuccess: function () {
                console.log("Connected");
                client.subscribe(`guessWhoGameRoom-${id}`, { qos: 0 })
                console.log(`Subscibed to guessWhoGameRoom-${id}`)
                handlePublishing(' connected')
                AddToPlayersLogs({username: cookieUsername, action: 'connected'})
                setmqttState('connected')
            },
            onFailure: function (message) {
                console.log("Connection failed: " + message.errorMessage);
            },
        };
        console.log('Connecting mqtt client')
        client.connect(options);

        return () => {
            DeleteUserName(id, {username: cookieUsername})
            hideRoom(id, false)
            AddToPlayersLogs({username: cookieUsername, action: 'left'})
            ClearUsernames()
            handlePublishing(' left')
            client.unsubscribe(`guessWhoGameRoom-${id}`)
            console.log('Unsubscribed')
            client.disconnect()
            console.log('Disconnected')
            setmqttState('disconnected')
        }

    }, [])

    useEffect(() => {
        if (usernames.secondplayer != null && usernames.firstplayer != null) {
            setBothPlayersConnected(true)
            getIDs()
            hideRoom(id, true)
            setFirstPlayerTurn(true)
        }
        else {
           setBothPlayersConnected(false)
           hideRoom(id, false)
        }
    }, [usernames])


    useEffect(() => {
        if (mqttState === 'connected') {
            if (checkFirstPlayer()) {
                handlePublishing(" turn")
            }
            else if (checkSecondPlayer()) {
                handlePublishing(" turn")
            }
        }
    }, [firstPlayerTurn])

    useEffect(() => {
        document.getElementById("chat-input").addEventListener("keyup", handleEnterPress);
        return () => {
            window.removeEventListener('keydown', handleEnterPress);
        };
    }, [])

    async function getIDs() {
        const one = await GetPlayerID(usernames.firstplayer)
        const two = await GetPlayerID(usernames.secondplayer)
        set_id_one(one)
        set_id_two(two)
    }

    client.onConnectionLost = function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:"+ responseObject.errorMessage);
        }
    }

    client.onMessageArrived = function (message) {
        if (message.payloadString === `${usernames.firstplayer} ended turn` || message.payloadString === `${usernames.secondplayer} ended turn`){
            setFirstPlayerTurn(!firstPlayerTurn)
        }
        else if (message.payloadString.includes('winning-state')) {
            setRandomImage(images[Math.floor(Math.random()*images.length)])
            handlePublishingWithoutUsername(`Choosing new avatar`)
            if (message.payloadString.includes('first')) {
                if (checkFirstPlayer()){
                    const wins = cookies.get('today-wins')
                    cookies.set('today-wins', parseInt(wins)+1 )
                }
            }
            else if (message.payloadString.includes('second')){
                if (checkSecondPlayer()){
                    const wins = cookies.get('today-wins')
                    cookies.set('today-wins', parseInt(wins)+1 )
                }
            }
        }
        else if (message.payloadString.includes(` connected`)){
            displayOnChat(message.payloadString)
            GetUserNames(id, {player: cookieUsername})
        }
        else if (message.payloadString.includes(` left`)){
            displayOnChat(message.payloadString)
            GetUserNames(id, {player: cookieUsername})
        }
        else if (message.payloadString.includes(`My guess is`)) {
            const splitString = message.payloadString.split(' ')
            const guessedNumber = splitString[splitString.length - 1]
            displayOnChat(message.payloadString)
            if (firstPlayerTurn === false && cookieUsername === usernames.firstplayer) {
                if (message.payloadString.includes(usernames.secondplayer)) {
                    if (parseInt(guessedNumber) === randomImage) {
                        handlePublishingWithoutUsername(`${usernames.secondplayer}, you guessed right!`)
                        handlePublishingWithoutUsername('winning-state-second')
                    }
                    else {
                        handlePublishingWithoutUsername(`${usernames.secondplayer}, you guessed wrong!`)
                        handlePublishing(' ended turn')
                    }
                }
                else {
                    handlePublishing(', its not your turn!')
                }
            } 
            if (firstPlayerTurn === true && cookieUsername === usernames.secondplayer) {
                if (message.payloadString.includes(usernames.firstplayer)) {
                    if (parseInt(guessedNumber) === randomImage) {
                        handlePublishingWithoutUsername(`${usernames.firstplayer}, you guessed right!`)
                        handlePublishingWithoutUsername('winning-state-first')
                    }
                    else {
                        handlePublishingWithoutUsername(`${usernames.firstplayer}, you guessed wrong!`)
                        handlePublishing(' ended turn')
                    }
                }
                else {
                    handlePublishing(', its not your turn!')
                }
            }
        }
        else if (message.destinationName === `guessWhoGameRoom-${id}`) {
            displayOnChat(message.payloadString)
        }
    }

    const handlePublishing = (message) => {
        if (message !== ': '){
            const toSend = new Paho.Message(cookieUsername + message)
            toSend.destinationName = `guessWhoGameRoom-${id}`
            client.send(toSend)
        }
    }

    const handlePublishingWithoutUsername = (message) => {
        if (message !== ': '){
            const toSend = new Paho.Message(message)
            toSend.destinationName = `guessWhoGameRoom-${id}`
            client.send(toSend)
        }
    }

    const handleChatMessage = (chatmessage) => {
        handlePublishing(": " + chatmessage)
        if (chatmessage.includes('turn') === false){
            AddToChatLogs({
                message: chatmessage,
                username: cookieUsername,
                roomname: current_roomname[0].roomname
            })
        }
        setChatMessage('')
    }
    
    const handleEnterPress = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("chat-button").click();
        }
    }
    
    const handleOpacity = (number) => {
        if (checkFirstPlayer() || checkSecondPlayer()) {
            const element = document.getElementById(number)
            element.classList.contains("opacity-25") ? 
            element.className="border-primary mb-1" :
            element.className="border-primary mb-1 opacity-25"
        }
    }
    
    const handleDelete = () => {
        if (bothPlayersConnected === false) {
            DeleteRoom(id)
            history.push("/")
        }
        else {
            alert("Another player connected to room! Cannot delete!")
        }
    }

    const handleUpdate = () => {
        if (settedRoomName !== ''){
            changeRoomName({roomname: settedRoomName}, id)
            setRoomName('')
        }
    }

    const handleLeave = () => {
        if (window.confirm("Are you sure you want to leave?") === true){
                history.push("/")
        }
    }

    const displayOnChat = (message) => {
        const node = document.createElement("div")
        const textnode = document.createTextNode(message)
        node.appendChild(textnode)
        const chatbox = document.getElementById("chat-box")
        chatbox.appendChild(node)
        chatbox.scrollIntoView(false)
    }

    const checkFirstPlayer = () => {
        return (firstPlayerTurn === true && cookieUsername === usernames.firstplayer)
    }

    const checkSecondPlayer = () => {
        return (firstPlayerTurn === false && cookieUsername === usernames.secondplayer)
    }

    return (
        <div className="gameroom">
            <Container>
            <Row>
            <Col className="justify-content-md-end" md={8}>
            <Row md={5} className="gameInterface g-1 h-100 p-5">
            {images.map(number =>(
                    Array.from({ length: 1 }).map((_, idx) => (
                    <Col key={number} >
                        <Card className="border-primary mb-1" style={{ width: '7vw' }} id={number}>
                            <Card.Img variant="top" src={`/guess_who/${number}.jpg`} alt="image" onClick={() => handleOpacity(number)}/>
                            <Card.Title>{number}</Card.Title>
                        </Card>
                    </Col>
                    ))))}
                    { checkFirstPlayer() ?
                    <Button id="endturn-button" variant="primary" size="sm" onClick={() => handlePublishing(' ended turn')}>End turn</Button>
                    : null }
                    { checkSecondPlayer() ?
                    <Button id="endturn-button" variant="primary" size="sm" onClick={() => handlePublishing(' ended turn')}>End turn</Button>
                    : null
                    }
            </Row>
            </Col>
            <Col className="chatBox">
            <Row className="roomname-change border border-primary">
                <h4>Change room name:</h4>
                <div>Current roomname: {current_roomname.map(el => (<div key={el.id}>{el.roomname}</div>))}</div>
                <InputGroup style={{height: '2vw'}}>
                    <FormControl
                        id="roomname-change"
                        placeholder="Enter room name"
                        aria-label="Enter room name"
                        aria-describedby="basic-addon2"
                        value={settedRoomName}
                        onChange={(event) => setRoomName(event.target.value)}
                    />
                    <Button id="change-button" variant="primary" size="sm" onClick={() => handleUpdate()}>Change</Button>
                    </InputGroup>
            </Row>
            <Row className="border border-primary roomInfo">
            <h4>Connected players:</h4>
            {id_one ? <Link to={`/User/${id_one}`} target="_blank">{usernames.firstplayer}</Link> : <div>{usernames.firstplayer}</div>}
            {id_two ? <Link to={`/User/${id_two}`} target="_blank">{usernames.secondplayer}</Link> : <div>{usernames.secondplayer}</div>}
            </Row>
            <Row className="border border-primary avatarInfo flex justify-content-center">
            <h4>Your person:</h4>
                <Card className="border-danger border-5 mb-1" style={{ width: '7vw' }} id={randomImage}>
                    <Card.Img variant="top" src={`/guess_who/${randomImage}.jpg`} alt="image" />
                </Card>
            <p className="fw-light">Tip: Type "My guess is (number card)" in chat if you want to guess it.</p>
            </Row>
            <Row className="border border-primary chat">
                <Row className="messages">
                    <div id="chat-box">
                    <h4>Chat</h4>
                    </div>
                </Row>
                <Row>
                    <InputGroup style={{height: '2vw'}}>
                    <FormControl
                        id="chat-input"
                        placeholder="Enter message"
                        aria-label="Enter message"
                        aria-describedby="basic-addon2"
                        value={chatMessage}
                        onChange={(event) => setChatMessage(event.target.value)}
                    />
                    <Button id="chat-button" variant="primary" size="sm" onClick={() => handleChatMessage(chatMessage)}>Send message</Button>
                    </InputGroup>
                </Row>
            </Row>
            <Row>
                    <Button className="p-2 buttons" onClick={() => handleDelete()}>Delete room</Button>
                    <Button className="p-2 buttons" onClick={() => handleLeave()}>Leave room</Button>
            </Row>
            </Col>
            </Row>
            </Container>
        </div>
    )
}

const mapStateToProps = (state, props) =>
{
    const id = props.match.params.id
    const detailed = state.roomnames.roomnames.filter(room => room.id === parseInt(id))
    return {
        usernames: state.roomnames.usernames,
        current_roomname: detailed
    }
}

const mapDispatchToProps = {
    DeleteRoom,
    GetUserNames, 
    changeRoomName,
    DeleteUserName,
    hideRoom,
    AddToChatLogs,
    GetRoomnames,
    AddToPlayersLogs,
    GetPlayerID,
    ClearUsernames
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameRoom))