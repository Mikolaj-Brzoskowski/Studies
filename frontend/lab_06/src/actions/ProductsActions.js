import axios from "axios";

export const PRODUCT_CREATE = 'PRODUCT_CREATE';
export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST';
export const PRODUCT_LIST_REQUEST_START = 'PRODUCT_LIST_REQUEST_START';
export const PRODUCT_LIST_REQUEST_FAILED = 'PRODUCT_LIST_REQUEST_FAILED';
export const PRODUCT_DELETE = 'PRODUCT_DELETE';

export const createProductAction = (newProduct) => ({
    type: PRODUCT_CREATE,
    payload: newProduct
});

export const productsListRequestAction = (products) => ({
    type: PRODUCT_LIST_REQUEST,
    payload: products
})

export const productsStartAction = ({
    type: PRODUCT_LIST_REQUEST_START
});

export const productsFailAction = (error) => ({
    type: PRODUCT_LIST_REQUEST_FAILED,
    payload: error
})

export const deleteProductAction = (id) => ({
    type: PRODUCT_DELETE,
    payload: id
});


export const getProductsList = (filter, sort = 'asc') => {
    return async dispatch => {
        dispatch(productsStartAction);
            try{
                if (filter === 'none'){
                    const response = await axios.get(`https://fakestoreapi.com/products?sort=${sort}`);
                    dispatch(productsListRequestAction(response.data));  
                }
                else {
                    const response = await axios.get(`https://fakestoreapi.com/products/category/${filter}`);
                    dispatch(productsListRequestAction(response.data));
                }        
            }catch(ex) {
                dispatch(productsFailAction(ex));
            }
    }
}

export const addProduct = (product) => {
    return async dispatch => {
        dispatch(productsStartAction);
            try{
                const response = await axios.post(`https://fakestoreapi.com/products`, product);
                if (response.status === 200) {
                    dispatch(createProductAction(response.data));  
                }
            }catch(ex) {
                dispatch(productsFailAction(ex));
            }
    }
}

export const deleteProduct = (id) => {
    return async dispatch => {
        dispatch(productsStartAction);
            try{
                await axios.delete(`https://fakestoreapi.com/products/${id}`);
                dispatch(deleteProductAction(id));
            }catch(ex) {
                dispatch(productsFailAction(ex));
            }
    }
}