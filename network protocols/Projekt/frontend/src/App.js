import './App.css'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Main from './components/Main'
import GameRoom from './components/GameRoom';
import Login from './components/Login'
import Register from './components/Register'
import User from './components/User'
import Checker from './components/Checker';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Checker/>
        <Switch>
          <Route exact path="/" component={Main} />
          <Redirect exact from="/Room/undefined" to="/"/>
          <Route exact path="/Room/:id" component={GameRoom} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Login/Register" component={Register} />
          <Route exact path="/User/:id" component={User} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
