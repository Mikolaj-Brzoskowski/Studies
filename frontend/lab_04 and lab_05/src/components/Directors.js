import { connect } from "react-redux"
import { DeleteDirectorAction } from "../actions/DirectorActions"
import {Link} from "react-router-dom"

const DirectorsList = ({directors, DeleteDirectorAction}, props) => {
    return(
        <div>
            {directors.map(director =>(
                <div>
                Name: {director.firstName} {director.lastName}
                <button onClick={() => DeleteDirectorAction(director)}>Delete</button>
                <Link to={`directors/${director.directorId}`}> <button>Details</button></Link>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        directors: state.directors
    }
}

const mapDispatchToProps = {
    DeleteDirectorAction
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectorsList)