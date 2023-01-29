import { ListGroup, Button, FormControl, InputGroup, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { GetRoomnames, CreateRoom, LogoutPlayer } from '../actions/MainActions'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'universal-cookie'

const Main = ({GetRoomnames, rooms, CreateRoom, usernameID, logged, LogoutPlayer}) => {

    const [roomname, setRoomname] = useState('')
    const [roomID, setRoomID] = useState()
    const [dropdownTitle, setTitle] = useState('Pick your room')
    const [query, setQuery] = useState('')
    const cookies = new Cookies();
    const history = useHistory()    

    const handleSelect=(e)=>{
        setTitle(e)
    }

    const handleCreatingRoom = async (e) => {
        if (roomname !== ""){
            await CreateRoom({roomname}); 
            setRoomname("")
        }
    }

    const handleLink = () => {
        if (cookies.get('username') == null) {
            alert("Please enter a username")
        }
        else {
            history.push(`/Room/${roomID}`)
        }
    }

    const handleUsernameChange = (event) => {
        cookies.set('username', event.target.value, {path: '/'})
    }

    useEffect(() => {
        if (cookies.get('today-wins') === undefined) {
            cookies.set('today-wins', 0, {path: '/', expires: new Date(Date.now() + (3600 * 1000 * 24))})
        }
        GetRoomnames()  
    }, [])

    return(
        <div>
            {logged 
            ? 
            <div>
                <Button className="m-3" variant="primary" size="md" onClick={() => {LogoutPlayer(); cookies.set('logged', false); cookies.remove('username')}}>Log out</Button>
                <Button className="m-3" variant="primary" size="md" onClick={() => history.push(`/User/${usernameID}`)}>User page</Button>
            </div>
            : <Button className="m-3" variant="primary" size="md" onClick={() => history.push("/Login")}>Log in</Button>}
            <h1>Guess Who!</h1>
            <p>Welcome!</p>
            <div className="main-page">
            {logged ? null : (
            <div>
             <h3>Enter your username!</h3>
             <FormControl
                 id="enter-username"
                 placeholder="Enter your username"
                 aria-label="Enter your username"
                 aria-describedby="basic-addon2"
                 onChange={(event) => handleUsernameChange(event)}
                 className="w-2"
             />
             </div>)}
            <div className="roomSelector m-5">
            <h3>Room selection here!</h3>
                <p><Form.Control type="text" placeholder={'Search for you room'} onChange={(event) => setQuery(event.target.value)}/></p>
                <ListGroup className="m-3" id="dropdown-basic-button" title={dropdownTitle} onSelect={handleSelect}>
                    {rooms.filter(el => {
                if (query === '') {
                  return el;
                } else if (el.roomname.toLowerCase().includes(query.toLowerCase())) {
                  return el;
                }
              }).map(room => room.hidden ? null : <ListGroup.Item key={`${room.id}`} eventKey={`${room.roomname}`} onClick={() =>setRoomID(room.id)}>{room.roomname}</ListGroup.Item> )}
                </ListGroup>
                <p className="fw-light">Tip: If you don't see your room try to  refresh the page.</p>
                <h4 className="m-3">You can also create your room:</h4>
                <div className="m-3">
                    <InputGroup className="mb-3">
                        <FormControl
                            id="create-room-form"
                            placeholder="Insert room name"
                            aria-label="Insert room name"
                            aria-describedby="basic-addon2"
                            value={roomname}
                            onChange={(event) => setRoomname(event.target.value)}
                        />
                    <Button variant="primary" size="lg" onClick={(e) => handleCreatingRoom(e)}>Create room</Button>
                    </InputGroup>
                </div>
                <Button className="m-3" variant="primary" size="lg" onClick={() => handleLink()}>Join room</Button>
                </div>
                <p>Today you won: {cookies.get('today-wins')} games</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>
{
    return {
        rooms: state.roomnames.roomnames,
        storeRoomID: state.roomnames.roomID,
        usernameID: state.roomnames.usernameID,
        logged: state.roomnames.logged
    }
}

const mapDispatchToProps = {
    GetRoomnames,
    CreateRoom,
    LogoutPlayer
}

export default connect(mapStateToProps, mapDispatchToProps)(Main) 