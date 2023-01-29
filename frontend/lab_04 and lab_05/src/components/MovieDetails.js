import { withRouter } from "react-router"
import { connect } from "react-redux"
import {Formik, Field, Form} from 'formik'
import { AddActorToMovieAction, DeleteActorFromMovieAction } from "../actions/MovieActions"
import{ AddMovieToActorAction} from "../actions/ActorActions"

const MovieDetails = ( {movie, actors, movies, AddMovieToActorAction, AddActorToMovieAction, DeleteActorFromMovieAction}, props) => {

    const editmovie = async (values) => {
        if (values.actorId !== "" & values.actorId !== undefined) {
            console.log(values)
        await AddActorToMovieAction(values)
        await AddMovieToActorAction(values)
        }
    }

    const deletemovie = async (values) => {
        await DeleteActorFromMovieAction(values)
    }

    return (
        <div>
                Id: {movie.movieId}
                <br/>
                Title: {movie.title}
                <br/>
                Year: {movie.productionYear}
                <br/>
                Actors: {movie.actorsId.map(id => actors.filter(el => el.actorId === id).map(actor => 
                    <div>
                        {actor.firstName} {actor.lastName}
                        <button onClick={() => deletemovie({movieId: movie.movieId, actorId: actor.actorId})}>Delete</button>
                    </div>))}
                <br/>
            <Formik
            initialValues={{
                movieId: movie.movieId,
                actorId: ''
            }}
                onSubmit={(values)=> editmovie(values)}
                enableReinitialize={true}>
                    <Form>
                        <Field component="select" name="actorId">
                            <option value="">Wybierz aktora</option>
                            {actors.map(actor => 
                                <option value={actor.actorId}>{actor.firstName} {actor.lastName}</option>
                                )}
                        </Field>
                        <button type="submit">Submit</button>
                    </Form>
            </Formik>
        </div>)
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id
    const detailed = state.movies.filter(el => el.movieId === id)
    return {
        movies: state.movies,
        movie: detailed[0],
        actors: state.actors
    }
}

const mapDispatchToProps = {
    AddActorToMovieAction,
    AddMovieToActorAction,
    DeleteActorFromMovieAction,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieDetails));