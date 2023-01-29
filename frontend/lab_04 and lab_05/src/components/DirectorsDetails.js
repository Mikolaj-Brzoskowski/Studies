import { withRouter } from "react-router"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

const DirectorDetails = ({director}, props) => {
    return (
        <div>
            {director.map((director) => (
                <div>
                    Id: {director.directorId}
                    <br/>
                    Name: {director.firstName}
                    <br/>
                    Surname: {director.lastName}
                    <br/>
                    Age: {director.age}
                    <br/>
                    <Link to={`/directors/${director.directorId}/edit`}><button>Edit</button></Link>
                </div>
            ))}
            
        </div>)
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id
    const detailed = state.directors.filter(el => el.directorId === id)
    return {
        director: detailed
    }
}

export default withRouter(connect(mapStateToProps, undefined)(DirectorDetails))