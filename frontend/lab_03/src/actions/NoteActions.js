export const NOTE_ADD = 'NOTE_ADD'
export const NOTE_DEL = 'NOTE_DELETE'
export const NOTE_EDIT = 'NOTE_EDIT'
export const NOTE_DONE ='NOTE_DONE'

export const AddNoteAction = (payload) => ({
    type: NOTE_ADD,
    payload
})

export const DeleteNoteAction = (payload) => ({
    type: NOTE_DEL,
    payload
})

export const EditNoteAction = (payload) => ({
    type: NOTE_EDIT,
    payload
})

export const DoneNoteAction = (payload) => ({
    type: NOTE_DONE,
    payload
})