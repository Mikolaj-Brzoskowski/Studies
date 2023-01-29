export const TODO_ADD = 'TODO_ADD'
export const TODO_DEL = 'TODO_DELETE'
export const TODO_EDIT = 'TODO_EDIT'
export const TODO_DONE ='TODO_DONE'

export const AddTodoAction = (payload) => ({
    type: TODO_ADD,
    payload
})

export const DeleteTodoAction = (payload) => ({
    type: TODO_DEL,
    payload
})

export const EditTodoAction = (payload) => ({
    type: TODO_EDIT,
    payload
})

export const DoneTodoAction = (payload) => ({
    type: TODO_DONE,
    payload
})