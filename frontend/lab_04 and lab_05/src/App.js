import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import MoviesList from './components/Movies';
import AddMovie from './components/AddMovie';
import MovieDetails from './components/MovieDetails';
import DirectorsList from './components/Directors';
import AddDirector from './components/AddDirector';
import DirectorsDetails from './components/DirectorsDetails';
import DirectorsEdit from './components/DirectorsEdit';
import Navbar from './components/Navbar';
import ActorsList from './components/ActorsList';
import AddActor from './components/AddActor';
import ActorsDetails from './components/ActorsDetails';
import ActorEdit from './components/ActorEdit';
import Button from './components/Button';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Switch>
          <Route exact path="/" >
            <Dashboard/>
          </Route>
          <Route exact path="/movies">
            <MoviesList/>
          </Route>
          <Route exact path="/movies/add">
            <AddMovie/>
          </Route>
          <Route exact path="/movies/:id">
            <MovieDetails/>
          </Route>
          <Route exact path="/directors">
            <DirectorsList/>
          </Route>
          <Route exact path="/directors/add">
            <AddDirector/>
          </Route>
          <Route exact path="/directors/:id">
            <DirectorsDetails/>
          </Route>
          <Route exact path="/directors/:id/edit">
            <DirectorsEdit/>
          </Route>
          <Route exact path="/actors">
            <ActorsList/>
          </Route>
          <Route exact path="/actors/add">
            <AddActor/>
          </Route>
          <Route exact path="/actors/:id">
            <ActorsDetails/>
          </Route>
          <Route exact path="/actors/:id/edit">
            <ActorEdit/>
          </Route>
          <Route exact path="/button">
            <Button/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
