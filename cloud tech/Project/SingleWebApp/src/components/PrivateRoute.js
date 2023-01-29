import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
 const { keycloak } = useKeycloak();
 const nav = useNavigate()

 const isLoggedIn = keycloak.authenticated;

 return isLoggedIn ? children : nav("/acc_den");
};

export default PrivateRoute;