import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const AccessDenied = () => {

    return (
        <div className="AccessDenied">
            <h1>Access Denied!</h1>
            <Link to="/"><Button>Return to home page.</Button></Link>
        </div>
    )

}

export default AccessDenied;