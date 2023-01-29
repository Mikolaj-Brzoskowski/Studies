import { ADD_ACTOR, DEL_ACTOR, EDIT_ACTOR, ADD_MOVIE_ACTOR} from "../actions/ActorActions"

export const ActorsReducer = (state = [], action) => {
    switch(action.type){
        case ADD_ACTOR:
            return [...state, action.payload]
        case DEL_ACTOR:
            return [...state.filter(el => el.actorId !== action.payload.actorId)]
        case EDIT_ACTOR:
            const edit_tab = [...state]
            const edit_index = edit_tab.findIndex(el => el.actorId === action.payload.actorId)
            edit_tab[edit_index] = {...action.payload}
            return [...edit_tab]
        case ADD_MOVIE_ACTOR:
            const add_tab = [...state]
            const add_index = add_tab.findIndex(el => el.actorId === action.payload.actorId)
            add_tab[add_index] = {...add_tab[add_index], 
                moviesId: add_tab[add_index].moviesId.includes(action.payload.movieId) ? [...add_tab[add_index].moviesId] : [...add_tab[add_index].moviesId, action.payload.movieId]}
            return [...add_tab]
        default:
            return state
    }
}