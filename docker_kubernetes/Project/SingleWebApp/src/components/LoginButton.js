import { useKeycloak } from "@react-keycloak/web";
import Button from 'react-bootstrap/Button';

const LoginButton = () => {

    const { keycloak } = useKeycloak();

    return (
        <div>
            <p>
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
                    Logout from {keycloak.tokenParsed.preferred_username}
                    </Button>
                )}
            </p>
        </div>
        
    )
}

export default LoginButton;