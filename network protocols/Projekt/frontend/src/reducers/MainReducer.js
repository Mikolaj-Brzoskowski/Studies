import { GET_ROOMNAMES, FAILED, SET_ROOM_ID, GET_USERNAMES, GET_USERNAME_ID, LOG_IN_USER, LOG_OUT_USER, GET_COMMENTS, CLEAR_USERNAMES } from '../actions/MainActions'

const initState = {
    roomnames: [],
    roomID: 0,
    error: '',
    usernames: {},
    logged: false,
    usernameID: 0,
    username: '',
    comments: []
}

export const MainReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_ROOMNAMES:
            return {...state, roomnames: [...action.payload]}
        case SET_ROOM_ID: 
            return {...state, roomID: action.payload.data[0].id}
        case FAILED: 
            return {...state, error: action.payload}
        case GET_USERNAMES:
            if (action.payload[0] === undefined) {
                return {...state, usernames: {}}
            }
            else return {...state, usernames: action.payload[0]}
        case GET_USERNAME_ID: 
            return {...state, usernameID: action.id}
        case LOG_IN_USER:
            return {...state, logged: true, username: action.username}
        case LOG_OUT_USER:
            return {...state, logged: false, username: '', usernameID: 0}
        case GET_COMMENTS:
            return {...state, comments: [...action.payload.data]}
        case CLEAR_USERNAMES:
            return {...state, usernames: {}}
        default:
            return state
    }
}