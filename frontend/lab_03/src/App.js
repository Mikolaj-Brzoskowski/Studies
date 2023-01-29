import TodoForm from './todos/TodoForm';
import TodoList from './todos/TodoList';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import TodoDetails from './todos/TodoDetails'
import NoteList from './todos/NoteList';
import NoteForm from './todos/NoteForm';
import NoteDetails from './todos/NoteDetails';

function App() {
  return (
    <BrowserRouter>
    <main>
    <Switch>
      <Redirect exact from="/" to="/todos"/>
      <Route exact path="/todos">
      <TodoForm/>
      <TodoList/>
      </Route>
      <Route exact path="/todos/:id">
        <TodoDetails/>
      </Route>
      <Route exact path="/notes">
        <NoteList/>
      </Route>
      <Route exact path="/notes/form">
        <NoteForm/>
      </Route>
      <Route exact path="/notes/:id">
        <NoteDetails/>
      </Route>
    </Switch>
    </main>
    </BrowserRouter>
    )
}

export default App;