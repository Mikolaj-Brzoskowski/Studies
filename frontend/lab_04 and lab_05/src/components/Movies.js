import { connect } from "react-redux"
import { DeleteMovieAction } from "../actions/MovieActions"
import { Link } from 'react-router-dom'

const MoviesList = ({movies, DeleteMovieAction}, props) => {
    return(
        <div>
            {movies.map(movie =>(
                <div>
                Title: {movie.title}
                <button onClick={() => DeleteMovieAction(movie)}>Delete</button>
                <Link to={`/movies/${movie.movieId}`}><button>Details</button></Link>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
}

const mapDispatchToProps = {
    DeleteMovieAction
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList)