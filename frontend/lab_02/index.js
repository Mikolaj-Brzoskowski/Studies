import Redux from 'redux'
import todosReducer from './TodoReducer.js'
import noteReducer from './NotesReducer.js'
import {ADD_NOTE, DELETE_NOTE} from './NotesActions.js'
import {ADD_TODO, DELETE_TODO, UPDATE_TODO, FINISH_TODO} from './TodoActions.js'

const mainReducer = Redux.combineReducers({todosReducer, noteReducer})

let store = Redux.createStore(mainReducer)

store.subscribe(() => console.log(store.getState()));

function TODO(id, title) {
    return {
        id: id,
        title: title,
        done: false
    }
}

function NOTE(id, content){
    return {
        id: id,
        content: content
    }
}

store.dispatch({ type: ADD_TODO, payload: TODO(1, 'Harry Potter')});
store.dispatch({ type: ADD_TODO, payload: TODO(2, 'Harry Potter 2') });
store.dispatch({ type: ADD_NOTE, payload: NOTE(1, 'Change id==1 to Star Wars') });
store.dispatch({ type: ADD_NOTE, payload: NOTE(2, 'Delete note of id==1') });
store.dispatch({ type: UPDATE_TODO, payload: TODO(1, 'Star Wars') });
store.dispatch({type: DELETE_NOTE, payload: {id: 1}})
store.dispatch({ type: ADD_TODO, payload: TODO(3, 'Harry Potter 3') });
store.dispatch({ type: FINISH_TODO, payload: TODO(1, 'Star Wars') });
store.dispatch({type: DELETE_TODO, payload: {id: 3}})
store.dispatch({ type: ADD_TODO, payload: TODO(4, 'Harry Potter 4') });