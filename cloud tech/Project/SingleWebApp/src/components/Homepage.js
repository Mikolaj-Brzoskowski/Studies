import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";

const Homepage  =  ()  =>  {

    const { keycloak } = useKeycloak();

    const isLoggedIn = keycloak.authenticated;

    return (
        <div>
            <p>Homepage!</p>
            <p><Link to="/events"><Button>Events</Button></Link></p>
            <p>{isLoggedIn ? <p><Link to="/comments"><Button>Comments</Button></Link></p> : null}</p>    
        </div>
    )
}

export default Homepage;