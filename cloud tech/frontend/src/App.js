import './App.css';
import {Route, Routes} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import DataGetter from './components/DataGetter'
import DataAdder from './components/DataAdder'
import AccessDenied from './components/AccessDenied'
import Homepage from './components/Homepage'
import SecuredPage from './components/keycloak/SecuredPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./components/keycloak/Keycloak.js"
import PrivateRoute from './components/keycloak/PrivateRoute';
import React from 'react';

function App() {
  return (
    <div className="App">
      <ReactKeycloakProvider authClient={keycloak} initOptions={{"checkLoginIframe": false}}>
        <React.StrictMode>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/login' element={<LoginForm/>} />
          <Route path='/secured' element={
            <PrivateRoute>
              <SecuredPage/>
            </PrivateRoute>                                } />
          <Route path='/get' element={<DataGetter/>} />
          <Route path='/add' element={<DataAdder/>} />
          <Route path='/acc_den' element={<AccessDenied/>} />
        </Routes>
        </React.StrictMode>
      </ReactKeycloakProvider>
      </div>  
  )
}

export default App;