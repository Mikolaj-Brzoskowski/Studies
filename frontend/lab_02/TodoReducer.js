import {ADD_TODO, DELETE_TODO, UPDATE_TODO, FINISH_TODO} from './TodoActions.js'

const todosReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.payload]
        case DELETE_TODO:
            return [...state.filter(el => el.id !== action.payload.id)]
        case UPDATE_TODO: {
            const elementsIndex = state.findIndex(el => el.id == action.payload.id)
            let newArray = [...state]
            newArray[elementsIndex] = action.payload
            return [...newArray]
        }
        case FINISH_TODO: {
            const elementsIndex = state.findIndex(el => el.id == action.payload.id)
            state[elementsIndex] = {...state[elementsIndex], done: true}
            return state;
        }
        default:
            console.log('default')
            return state; 
    }
}

export default todosReducer;