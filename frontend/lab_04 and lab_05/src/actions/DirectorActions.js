export const ADD_DIRECTOR = 'ADD_DIRECTOR'
export const DEL_DIRECTOR = 'DEL_DIRECTOR'
export const EDIT_DIRECTOR = 'EDIT_DIRECTOR'

export const AddDirectorAction = (payload) => ({
    type: ADD_DIRECTOR,
    payload
})

export const DeleteDirectorAction = (payload) => ({
    type: DEL_DIRECTOR,
    payload
})

export const EditDirectorAction = (payload) => ({
    type: EDIT_DIRECTOR,
    payload
})