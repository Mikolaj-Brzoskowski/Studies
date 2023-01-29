import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useKeycloak} from "@react-keycloak/web";
import {useEffect, useState} from "react"
import axios from "axios"

const UnsecuredPage  =  () =>  {

    const [events, setevents] = useState([])
    
    useEffect(() => {
        axios.get('/backend/unprotectedData')
        .then((response) => {
            setevents(response.data.events)
        })
        .catch((error) => {
            console.error(error)
        })
    }, []);

    const { keycloak } = useKeycloak();

    const isLoggedIn = keycloak.authenticated;

    return  (
        <div>
            <h1 className="text-black text-4xl">Events</h1>
            {events.map(event =>
                <p key={event}>{event}</p>)}
            {isLoggedIn ? <p><Link to="/comments"><Button>Comments</Button></Link></p> : null}
            <Link to="/add_event"><Button>Add event</Button></Link>
        </div>
    )
}

export default UnsecuredPage;