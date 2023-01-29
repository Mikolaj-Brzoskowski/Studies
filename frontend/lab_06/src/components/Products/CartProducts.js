import { connect } from 'react-redux';
import { addProductsToCart } from '../../actions/UsersActions';
import {useParams} from 'react-router-dom'
import { getProductsList } from '../../actions/ProductsActions';
import { useEffect } from 'react'
import { useHistory } from 'react-router';

const CartProducts = ({products, getProductsList, addProductsToCart}) => {

    const history = useHistory()

    const { id } = useParams()

    useEffect(() => {
        getProductsList('none');
    }, []);

    const handleCheckbox = async () => {
        const form = document.getElementById("cart");
        const inputs = form.getElementsByTagName("input");
        let tab = []
        for (let i = 0; i < inputs.length; i++){
            if (inputs[i].checked){
                const item = products.filter(product => product.id == inputs[i].value)[0]
                tab.push(item);
            }
        }
        await addProductsToCart(tab, id)
        history.push(`/users/${id}`)
    }

    return(
        <div id="cart">
            <h2>Add products to cart:</h2>
            {products.map(product => {
                    return (
                    <div>
                        {product.title}
                        <input type="checkbox" value={product.id}/>
                    </div>)})
            }
            <button onClick={() => handleCheckbox()}>Add to cart</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products
    }
}

const mapDispatchToProps = {
    addProductsToCart,
    getProductsList
}

export default connect(mapStateToProps, mapDispatchToProps)(CartProducts);