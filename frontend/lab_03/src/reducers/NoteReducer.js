import { NOTE_ADD, NOTE_DEL, NOTE_DONE, NOTE_EDIT } from "../actions/NoteActions";

export const NoteReducer = (state = [], action) => {
    switch(action.type){
        case NOTE_ADD:
            return [...state, action.payload];
        case NOTE_DEL:
            return [...state.filter(todo => todo.id !== action.payload.id)];    
        case NOTE_EDIT:
            const edit_array = [...state]
            const edit_index = edit_array.findIndex(todo => todo.id === action.payload.id)
            edit_array[edit_index] = {...action.payload}
            return [...edit_array];
        case NOTE_DONE:
            const array = [...state]
            const index = array.findIndex(todo => todo.id === action.payload.id)
            array[index] = {...action.payload, done: !action.payload.done}
            return [...array];
        default:
            return state
    }
}