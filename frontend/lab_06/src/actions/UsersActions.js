import axios from "axios";

export const USER_LIST_REQUEST = 'USER_LIST_REQUEST';
export const USER_LIST_REQUEST_START = 'USER_LIST_REQUEST_START';
export const USER_LIST_REQUEST_FAILED = 'USER_LIST_REQUEST_FAILED';
export const USER_ADD_ITEM = 'USER_ADD_ITEM';
export const USER_CLEAR_CART = 'USER_CLEAR_CART';

export const usersListRequestAction = (users) => ({
    type: USER_LIST_REQUEST,
    payload: users
})

export const usersListRequestStartAction = ({
    type: USER_LIST_REQUEST_START
});

export const usersListRequestFailAction = (error) => ({
    type: USER_LIST_REQUEST_FAILED,
    payload: error
})

export const addProductsToCart = (products, id) => ({
    type: USER_ADD_ITEM,
    payload: products,
    id: id
})

export const clearCart = (payload) => ({
    type: USER_CLEAR_CART,
    payload: payload
})

export const getUsersList = () => {
    return async dispatch => {
        dispatch(usersListRequestStartAction);
            try{
                const response = await axios.get('https://fakestoreapi.com/users');
                dispatch(usersListRequestAction(response.data));        
            }catch(ex) {
                dispatch(usersListRequestFailAction(ex));
            }
    }
}

