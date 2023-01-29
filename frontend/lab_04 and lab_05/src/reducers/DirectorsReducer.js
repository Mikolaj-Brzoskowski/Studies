import { ADD_DIRECTOR, DEL_DIRECTOR, EDIT_DIRECTOR} from "../actions/DirectorActions"

export const DirectorsReducer = (state = [], action) => {
    switch(action.type){
        case ADD_DIRECTOR:
            return [...state, action.payload]
        case DEL_DIRECTOR:
            return [...state.filter(el => el.directorId !== action.payload.directorId)]
        case EDIT_DIRECTOR:
            const tab = [...state]
            const index = tab.findIndex(el => el.directorId === action.payload.directorId)
            tab[index] = {...action.payload}
            return [...tab]
        default:
            return state
    }
}