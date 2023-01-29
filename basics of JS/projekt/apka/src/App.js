import './App.scss';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import Home from './Home.js'
import Movie from './Movie.js'
import Movies from './Movies.js'
import Form from './Form'

function App() {
  return (
    <BrowserRouter>
    <main>
      <Navbar />
      <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/movies">
        <Movies />
      </Route>
      <Route exact path="/movie/:id">
        <Movie />
      </Route>
      <Route exact path="/movies/edit/:id?" >
        <Form />
      </Route>
      </Switch>
    </main>
   </BrowserRouter>
  );
}

export default App;

function Navbar() {
  return(
  <div className="navbar">
    <div id="logo">
    <img src="/clip.png" alt="Logo"/>Movi.deo</div>
    <Link to="/">Home</Link>
    <Link to="/movies">Movies</Link>
  </div>
  )
}