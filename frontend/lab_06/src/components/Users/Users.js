import { useEffect } from "react";
import  { getUsersList } from '../../actions/UsersActions'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

const Users = ({users, loading, getUsersList}) => {

    useEffect(() => {
        if (users.length === 0) {
            getUsersList();
        }  
    }, []);

    return (
        <div>
            <h3>Users list</h3>
            {loading ?
                <div>Trwa ładowanie</div>
                :
                users.map(user => {
                    return (
                    <div>
                        {user.name.firstname}
                        <Link to={`/users/${user.id}`}><button>Details</button></Link>
                    </div>)})
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users.users,
        loading: state.users.loading
    }
}

const mapDispatchToProps = {
    getUsersList
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);