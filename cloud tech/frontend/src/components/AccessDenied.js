import { Link } from 'react-router-dom'

const AccessDenied = () => {

    return (
        <div className="AccessDenied">
            <h1>Access Denied!</h1>
            <Link to="/">Return to login page.</Link>
        </div>
    )

}

export default AccessDenied;