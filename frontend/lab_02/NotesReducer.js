import {ADD_NOTE, DELETE_NOTE} from './NotesActions.js'

const noteReducer = (state = [] , action) => {
    switch (action.type) {
        case ADD_NOTE: {
            return [...state, action.payload]
        }
        case DELETE_NOTE: {
            return [...state.filter(el => el.id !== action.payload.id)]
        }
        default:
            console.log('default')
            return state; 
    }
}

export default noteReducer;