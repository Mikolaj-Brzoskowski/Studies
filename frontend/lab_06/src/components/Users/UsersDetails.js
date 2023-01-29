
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { clearCart } from '../../actions/UsersActions'

const UsersDetails = ({user, loading, clearCart}) => {

    return (
        <div>
            <h3>Users list</h3>
            {loading ?
                <div>Trwa ładowanie</div>
                :
                <div>
                    User email: {user.email}<br/>
                    Username: {user.username}<br/>
                    User password: {user.password}<br/>
                    User name: {user.name.firstname} {user.name.lastname}<br/>
                    User city: {user.address.city}<br/>
                    User phone: {user.phone}
                    <h2>Koszyk:</h2>
                        <ul>
                            {user.koszyk.map(item =>{
                            return (
                            <li><div>{item.title}   Ilość:{item.quantity}</div></li>
                        )
                        })}
                        </ul>
                    <Link to={`/users/${user.id}/cart`} ><button>Dodaj do koszyka</button></Link>
                    <button onClick={() => clearCart(user.id)}>Wyczyść koszyk</button>
                </div>}
        </div>
        )
}

const mapStateToProps = (state, props) => {
    const paramId = props.match.params.id
    const detailed = state.users.users.filter(el => el.id == paramId)
    return {
        user: detailed[0],
        loading: state.loading
    }
}

const mapDispatchToProps = {
    clearCart
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersDetails))
