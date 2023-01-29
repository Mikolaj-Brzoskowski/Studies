import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_REQUEST_FAILED, PRODUCT_LIST_REQUEST_START, PRODUCT_CREATE, PRODUCT_DELETE } from "../actions/ProductsActions";

const initState = {
    products: [],
    loading: false,
    error: ''
}

const productsReducer = (state = initState, action) => {
    switch(action.type) {
        case PRODUCT_LIST_REQUEST_START: 
            return { ...state, loading: true }
        case PRODUCT_LIST_REQUEST_FAILED:
            return { ...state, loading: false, error: action.payload }
        case PRODUCT_LIST_REQUEST:
            return {...state, products: [...action.payload], loading: false };
        case PRODUCT_CREATE:
            return { ...state, products: [...state.products, action.payload], loading: false };
        case PRODUCT_DELETE:
            return {...state, products: [...state.products.filter(el => el.id !== action.payload)], loading: false };
        default:
            return state;
    }
}

export default productsReducer;