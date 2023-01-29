export const ADD_MOVIE = 'ADD_MOVIE'
export const DEL_MOVIE = 'DEL_MOVIE'
export const ADD_ACTOR_MOVIE = 'ADD_ACTOR_MOVIE'
export const DEL_ACTOR_MOVIE = 'DEL_ACTOR_MOVIE'

export const AddMovieAction = (payload) => ({
    type: ADD_MOVIE,
    payload
})

export const DeleteMovieAction = (payload) => ({
    type: DEL_MOVIE,
    payload
})

export const AddActorToMovieAction = (payload) => ({
    type: ADD_ACTOR_MOVIE,
    payload
})

export const DeleteActorFromMovieAction = (payload) => ({
    type: DEL_ACTOR_MOVIE,
    payload
})