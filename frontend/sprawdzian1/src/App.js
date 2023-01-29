import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Main from './components/Main';
import Details from './components/Details';
import FormItem from './components/Form';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Switch>
      <Redirect from="/" to="/items" exact/>
      <Route exact path="/items" component={Main}/>
      <Route exact path="/items/:id" component={Details}/>
      <Route exact path="/items/:id/form" component={FormItem}/>
    </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;