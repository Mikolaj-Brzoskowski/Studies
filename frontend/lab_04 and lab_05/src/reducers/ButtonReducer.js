import { INCREMENT_BUTTON, COUNTDOWN_BUTTON } from '../actions/ButtonActions'

export const ButtonReducer = (state = 0, action) => {
    switch(action.type){
        case INCREMENT_BUTTON:
            const newState = state + 1
            return newState
        case COUNTDOWN_BUTTON:
            const newState_2 = state - 1
            return newState_2
        default:
            return state
    }
}