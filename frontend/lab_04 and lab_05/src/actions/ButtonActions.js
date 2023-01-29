export const INCREMENT_BUTTON = 'INCREMENT_BUTTON'
export const COUNTDOWN_BUTTON = 'COUNTDOWN_BUTTON'
export const COUNTDOWN_STOP = 'COUNTDOWN_STOP'

export const IncrementAction = () => ({
    type: INCREMENT_BUTTON
})

export const CountdownAction = () => ({
    type: COUNTDOWN_BUTTON
})

export const CountdownStop = () => ({
    type: COUNTDOWN_STOP
})