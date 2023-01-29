import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from 'react-router'

const PrivateRoute = ({ children }) => {
 const { keycloak } = useKeycloak();

 const isLoggedIn = keycloak.authenticated;

 return isLoggedIn ? children : <h1>Access Denied!</h1>;
};

export default PrivateRoute;