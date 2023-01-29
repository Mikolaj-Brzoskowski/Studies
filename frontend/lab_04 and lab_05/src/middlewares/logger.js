const logger = store => next => action => {
    console.log("Dispatching action", action)
    let result = next(action)
    return result
}

export default logger;