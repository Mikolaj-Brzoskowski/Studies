import { Button } from "react-bootstrap";
import { Link } from "react-router-dom"
import LoginButton from './keycloak/LoginButton';

const Homepage = () => {
    return(
        <div>
            <LoginButton/>
            <Link to="/login">
                <Button>
                Login to backend with BaseAuth
                </Button>
            </Link>
        </div>
    )
}

export default Homepage;