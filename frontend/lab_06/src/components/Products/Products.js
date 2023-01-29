import { useEffect } from "react";
import  { getProductsList, deleteProduct } from '../../actions/ProductsActions'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { useState } from "react";

const Products = ({products, loading, getProductsList, deleteProduct}) => {

    const [filter, setFilter] = useState('none');

    useEffect(() => {
        getProductsList(filter);
    }, [filter]);

    return(
        <div>
            <h3>Products list</h3>
            <h2>Filters:</h2>
            <button onClick={() => setFilter('none')}>All</button>
            <button onClick={() => setFilter('electronics')}>Electronics</button>
            <button onClick={() => setFilter('jewelery')}>Jewelery</button>
            <button onClick={() => setFilter(`men's clothing`)}>Men's clothing</button>
            <button onClick={() => setFilter(`women's clothing`)}>Women's clothing</button>
            <h2>Sorting:</h2>
            <button onClick={() => getProductsList('none', 'asc')}>Ascending</button>
            <button onClick={() => getProductsList('none', 'desc')}>Descending</button>
            <h2>List:</h2>
            {loading ?
                <div>Trwa ładowanie</div>
                :
                products.map(product => {
                    return (
                    <div>
                        {product.title}
                        <Link to={`/products/${product.id}`}><button>Details</button></Link>
                       <button onClick={() => deleteProduct(product.id)}>Delete</button>
                    </div>)})
            }
            <Link to='/products/add'><button>Add</button></Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        loading: state.products.loading
    }
}

const mapDispatchToProps = {
    getProductsList,
    deleteProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);