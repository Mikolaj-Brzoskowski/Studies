import {INCREMENT_BUTTON, COUNTDOWN_BUTTON, CountdownAction, COUNTDOWN_STOP} from '../actions/ButtonActions'
let interval

const incrementer = store => next => action => {
    switch (action.type) {
        case INCREMENT_BUTTON:
            alert("Wcisnąłeś guzik")
            break
        case COUNTDOWN_BUTTON:
            interval = setInterval( function(){store.dispatch(CountdownAction())}, 1000)
            break
        case COUNTDOWN_STOP:
            clearInterval(interval)
            break
        default:
            // do nothing
    }
    const result = next(action)
    return result
}

export default incrementer;