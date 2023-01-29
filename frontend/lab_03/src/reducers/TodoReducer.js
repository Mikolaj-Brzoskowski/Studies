import { TODO_ADD, TODO_DEL, TODO_DONE, TODO_EDIT } from "../actions/TodoActions";

export const TodoReducer = (state = [], action) => {
    switch(action.type){
        case TODO_ADD:
            return [...state, action.payload];
        case TODO_DEL:
            return [...state.filter(todo => todo.id !== action.payload.id)];    
        case TODO_EDIT:
            const edit_array = [...state]
            const edit_index = edit_array.findIndex(todo => todo.id === action.payload.id)
            edit_array[edit_index] = {...action.payload}
            return [...edit_array];
        case TODO_DONE:
            const array = [...state]
            const index = array.findIndex(todo => todo.id === action.payload.id)
            array[index] = {...action.payload, done: !action.payload.done}
            return [...array];
        default:
            return state
    }
}