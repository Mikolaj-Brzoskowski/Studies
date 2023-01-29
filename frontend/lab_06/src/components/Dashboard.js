import {Link} from 'react-router-dom'
import { useEffect } from 'react';
import { getUsersList } from '../actions/UsersActions';
import { connect } from 'react-redux'
import { getProductsList} from '../actions/ProductsActions'

const Dashboard = ({getUsersList, getProductsList}) => {

    useEffect(() => {
        getUsersList();
        getProductsList('none');
    }, []);

    return(
        <div>
            <Link to="/users">Users</Link><br/>
            <Link to="/products">Products</Link>
        </div>
    )
}

const mapDispatchToProps = {
    getUsersList,
    getProductsList
}


export default connect(undefined, mapDispatchToProps)(Dashboard);