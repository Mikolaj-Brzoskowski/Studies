
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

const ActorDetails = ({actor, movies}, props) => {
    return (
        <div>
            {actor.map((actor) => (
                <div>
                    Id: {actor.actorId}
                    <br/>
                    Name: {actor.firstName}
                    <br/>
                    Surname: {actor.lastName}
                    <br/>
                    Age: {actor.age}
                    <br/>
                    Movies: {actor.moviesId.map(id => movies.filter(el => el.movieId === id).map(movie =>
                        <div>{movie.title}</div>))}
                    <br/>
                    <Link to={`/actors/${actor.actorId}/edit`}><button>Edit</button></Link>
                </div>
            ))}
            
        </div>)
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id
    const detailed = state.actors.filter(el => el.actorId === id)
    return {
        actor: detailed,
        movies: state.movies
    }
}

export default withRouter(connect(mapStateToProps, undefined)(ActorDetails))