export const ADD_ACTOR = 'ADD_ACTOR'
export const DEL_ACTOR = 'DEL_ACTOR'
export const EDIT_ACTOR = 'EDIT_ACTOR'
export const ADD_MOVIE_ACTOR = 'ADD_MOVIE_ACTOR'

export const AddActorAction = (payload) => ({
    type: ADD_ACTOR,
    payload
})

export const DeleteActorAction = (payload) => ({
    type: DEL_ACTOR,
    payload
})

export const EditActorAction = (payload) => ({
    type: EDIT_ACTOR,
    payload
})

export const AddMovieToActorAction = (payload) => ({
    type: ADD_MOVIE_ACTOR,
    payload
})