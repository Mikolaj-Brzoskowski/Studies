import { withRouter } from "react-router"
import { connect } from "react-redux"

const ProductsDetails = ({product, loading, users}) => {

    const getOccurences = (id) => {
        let occurences = 0
            for (const user in users){
                for (const item in users[user].koszyk){
                    if (users[user].koszyk[item].id === id){
                        occurences += 1
                    }
                }
            }
        return occurences
    }

    return (
        <div>
            <h3>Products list</h3>
            {loading ?
                <div>Trwa ładowanie</div>
                :
                <div>
                    Product title: {product.title}<br/>
                    Product price: {product.price}<br/>
                    Product category: {product.category}<br/>
                    Product description: {product.description}<br/>
                    Product image: <br/><img src={product.image} width="15%" height="15%" alt={product.title}></img><br/>
                    Product occurences: {getOccurences(product.id)}
                </div>}
        </div>
        )
}

const mapStateToProps = (state, props) => {
    const paramId = props.match.params.id
    const detailed = state.products.products.filter(el => el.id == paramId)
    return {
        product: detailed[0],
        loading: state.loading,
        users: state.users.users
    }
}

export default withRouter(connect(mapStateToProps, undefined)(ProductsDetails))
