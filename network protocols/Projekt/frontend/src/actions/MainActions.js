import axios from 'axios';

export const GET_ROOMNAMES = 'GET_ROOMNAMES'
export const SEND_ROOMNAME = 'SEND_ROOMNAME'
export const FAILED = 'FAILED'
export const SET_ROOM_ID = 'SET_ROOM_ID'
export const GET_USERNAMES = 'GET_USERNAMES'
export const GET_USERNAME_ID = 'GET_USERNAME_ID'
export const LOG_IN_USER = 'LOG_IN_USER'
export const LOG_OUT_USER = 'LOG_OUT_USER'
export const GET_COMMENTS = 'GET_COMMENTS'
export const CLEAR_USERNAMES = 'CLEAR_USERNAMES'

export const GetRoomNamesAction = (payload) => ({
    type: GET_ROOMNAMES,
    payload
})

export const FailAction = (payload) => ({
    type: FAILED,
    payload
})

export const SetRoomIDAction = payload => ({
    type: SET_ROOM_ID,
    payload
})

export const GetUserNamesAction = (payload) => ({
    type: GET_USERNAMES,
    payload
})

export const GetUserNameIDAction = (id) => ({
    type: GET_USERNAME_ID,
    id
})

export const LoginPlayerAction = (username) => ({
    type: LOG_IN_USER,
    username
})

export const LogoutPlayerAction = () => ({
    type: LOG_OUT_USER
})

export const GetCommentsAction = (payload) => ({
    type: GET_COMMENTS,
    payload
})

export const ClearUsernamesAction = () => ({
    type: CLEAR_USERNAMES
})

export const GetRoomnames = () => {
    return async dispatch =>{
        try {
            const response = await axios.get('http://localhost:5000/roomnames')
            dispatch(GetRoomNamesAction(response.data))
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const CreateRoom = (values) => {
    return async dispatch =>{
        try {
            const payload = await axios.post('http://localhost:5000/roomnames', values)
            dispatch(SetRoomIDAction(payload))
            const response = await axios.get('http://localhost:5000/roomnames')
            dispatch(GetRoomNamesAction(response.data))
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const changeRoomName = (values, id) => {
    return async dispatch =>{
        try {
            await axios.patch(`http://localhost:5000/roomnames/${id}`, values)
            const response = await axios.get('http://localhost:5000/roomnames')
            dispatch(GetRoomNamesAction(response.data))
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const DeleteRoom = (id) => {
    return async dispatch =>{
        try {
            await axios.delete(`http://localhost:5000/roomnames/${id}`)
            const response = await axios.get('http://localhost:5000/roomnames')
            dispatch(GetRoomNamesAction(response.data))
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const GetUserNames = (id, player) => {
    return async dispatch =>{
        try {
            await axios.post(`http://localhost:5000/usernames/${id}`, player)
            const response = await axios.get(`http://localhost:5000/usernames/${id}`)
            dispatch(GetUserNamesAction(response.data))
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const DeleteUserName = (id, values) => {
    return async dispatch =>{
        try {
            await axios.patch(`http://localhost:5000/usernames/${id}`, values)
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const hideRoom = (id, bool) => {
    return async dispatch =>{
        try {
            await axios.patch(`http://localhost:5000/roomnames/${id}/hidden/${bool}`)
        }catch(ex){
            dispatch(FailAction(ex))
        }
    } 
}

 export const AddToChatLogs = (log) => {
    return async dispatch =>{
        try {
            await axios.post(`http://localhost:5000/logs/chat`, log)
        }catch(ex){
            dispatch(FailAction(ex))
        }
    } 
}

export const AddToPlayersLogs = (log) => {
    return async dispatch =>{
        try {
            await axios.post(`http://localhost:5000/logs/players`, log)
        }catch(ex){
            dispatch(FailAction(ex))
        }
    } 
}

export const UpdatePlayer = (username, id) => {
    return async dispatch =>{
        try {
            await axios.patch(`http://localhost:5000/players/${id}`, username)
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const SetPlayerID = (username) => {
    return async dispatch =>{
        try {
            const response = await axios.get(`http://localhost:5000/players/username/${username}`)
            dispatch(GetUserNameIDAction(response.data[0].id))
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const GetPlayerID = (username) => {
    return async dispatch =>{
        try {
            const response = await axios.get(`http://localhost:5000/players/username/${username}`)
            if (response.data[0]) {
                return (response.data[0].id)
            }
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const GetPlayerUsername = (id) => {
    return async dispatch =>{
        try {
            const response = await axios.get(`http://localhost:5000/players/id/${id}`)
            return (response.data[0].username)
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const Registration = (values) => {
    return async dispatch =>{
        try {
            const response = await axios.post(`http://localhost:5000/players`, values)
            if (response.data === 'User already exists'){
                return true
            }
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const LoginPlayer = (values) => {
    return async dispatch =>{
        try {
            const response = await axios.get(`http://localhost:5000/login`, {params: values})
            if (response.data === 'User logged'){
               dispatch(LoginPlayerAction(values.username))
               return 'Success'
            }
            else return response.data
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const LogoutPlayer = () => {
    return async dispatch =>{
        try {
            dispatch(LogoutPlayerAction())
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const getComments = (id) => {
    return async dispatch =>{
        try {
            const response = await axios.get(`http://localhost:5000/comments/${id}`)
            dispatch(GetCommentsAction(response))
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const postComment = (values, id) => {
    return async dispatch =>{
        try {
            await axios.post(`http://localhost:5000/comments/${id}`, values)
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const deleteComment = (id) => {
    return async dispatch =>{
        try {
            await axios.delete(`http://localhost:5000/comments/${id}`)
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
} 

export const editComment = (values, id) => {
    return async dispatch =>{
        try {
            await axios.patch(`http://localhost:5000/comments/${id}`, values)
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const ClearUsernames = () => {
    return async dispatch =>{
        try {
            dispatch(ClearUsernamesAction())
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
}

export const deleteUser = (id) => {
    return async dispatch =>{
        try {
            await axios.delete(`http://localhost:5000/players/${id}`)
        }catch(ex){
            dispatch(FailAction(ex))
        }
    }
} 

