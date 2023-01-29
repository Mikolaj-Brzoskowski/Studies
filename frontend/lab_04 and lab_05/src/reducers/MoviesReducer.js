import { ADD_MOVIE, DEL_MOVIE, ADD_ACTOR_MOVIE, DEL_ACTOR_MOVIE } from "../actions/MovieActions"

export const MoviesReducer = (state = [], action) => {
    switch(action.type){
        case ADD_MOVIE:
            return [...state, action.payload]
        case DEL_MOVIE:
            return [...state.filter(el => el.movieId !== action.payload.movieId)]
        case ADD_ACTOR_MOVIE:
            const tab = [...state]
            const index = tab.findIndex(el => el.movieId === action.payload.movieId)
            tab[index] = {...tab[index], 
                actorsId: tab[index].actorsId.includes(action.payload.actorId) ? [...tab[index].actorsId] : [...tab[index].actorsId, action.payload.actorId]}
            return [...tab]
        case DEL_ACTOR_MOVIE:
            console.log('działa')
            return [...state.movies.filter(el => el.movieId === action.payload.movieId).actorsId.filter(el => el !== action.payload.actorId)]
        default:
            return state
    }
}