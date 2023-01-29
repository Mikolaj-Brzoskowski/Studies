import { useKeycloak } from "@react-keycloak/web";
import { Button } from "react-bootstrap";

const LoginButton = () => {

    const { keycloak, initialized } = useKeycloak();

    return (
        <div>
            {!keycloak.authenticated && (
                <Button
                type="button"
                className="text-blue-800"
                onClick={() => keycloak.login()}
                >
                Login to Keycloak
                </Button>
            )}
            
            {!!keycloak.authenticated && (
                <Button
                type="button"
                className="text-blue-800"
                onClick={() => keycloak.logout()}
                >
                Logout from Keycloak({keycloak.tokenParsed.preferred_username})
                </Button>
            )}
        </div>
        
    )
}

export default LoginButton;