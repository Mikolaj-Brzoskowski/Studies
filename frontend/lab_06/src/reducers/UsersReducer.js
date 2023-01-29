import { USER_LIST_REQUEST, USER_LIST_REQUEST_FAILED, USER_LIST_REQUEST_START, USER_ADD_ITEM, USER_CLEAR_CART } from "../actions/UsersActions";

const initState = {
    users: [],
    loading: false,
    error: ''
}

const usersReducer = (state = initState, action) => {
    switch(action.type) {
        case USER_LIST_REQUEST_START: 
            return { ...state, loading: true }
        case USER_LIST_REQUEST_FAILED:
            return { ...state, loading: false, error: action.payload }
        case USER_LIST_REQUEST:
            return {...state, users: [...action.payload.map(user => ({ ...user, koszyk: []}))], loading: false };
        case USER_ADD_ITEM:
            const edit_tab = [...state.users]
            const edit_index = edit_tab.findIndex(el => el.id == action.id)
            const user = edit_tab[edit_index]
            user.koszyk = action.payload.reduce((acc, item) =>
            {
                let el = acc.filter(el => el.title == item.title)[0]
                if (el !== undefined) {
                    el.quantity += 1
                    return acc
                }
                else{
                    item = {...item, quantity: 1}
                    return [...acc, item]
                } 
            }, user.koszyk)
            edit_tab[edit_index] = user
            return {...state, users: [...edit_tab]}
        case USER_CLEAR_CART:
            const clear_tab = [...state.users]
            const clear_index = clear_tab.findIndex(el => el.id === action.payload)
            clear_tab[clear_index] = {...clear_tab[clear_index], koszyk: []}
            return {...state, users: [...clear_tab]}
        default:
            return state;
    }
}

export default usersReducer;