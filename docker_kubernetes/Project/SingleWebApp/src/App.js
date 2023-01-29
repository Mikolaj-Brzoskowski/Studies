import Keycloak from './components/Keycloak'
import Homepage from './components/Homepage'
import SecuredPage from './components/SecuredPage'
import AccessDenied from './components/AccessDenied'
import UnsecuredPage from './components/UnsecuredPage'
import LoginButton from './components/LoginButton'
import AddEvent from './components/AddEvent'
import AddComment from './components/AddComment'
import { ReactKeycloakProvider } from "@react-keycloak/web";
import {Routes, Route} from 'react-router-dom' 
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import React from 'react'

function App() {
  return (
    <div className="App">
      <ReactKeycloakProvider authClient={Keycloak} initOptions={{"checkLoginIframe": false}}>
        <React.StrictMode>
        <LoginButton/>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/events' element={<UnsecuredPage/>} />
          <Route path='/add_event' element={<AddEvent/>} />
          <Route path='/add_comment' element={
            <PrivateRoute>
              <AddComment/>
            </PrivateRoute> } />
          <Route path='/comments' element={
            <PrivateRoute>
              <SecuredPage/>
            </PrivateRoute>                                } />
          <Route path='/acc_den' element={<AccessDenied/>} />
        </Routes>
        </React.StrictMode>
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;
