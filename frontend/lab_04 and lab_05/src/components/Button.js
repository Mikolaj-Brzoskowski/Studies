import {IncrementAction, CountdownAction, CountdownStop} from "../actions/ButtonActions"
import { connect } from 'react-redux'

const Button = ({IncrementAction, increment_number, CountdownAction, CountdownStop}) => {

    return (
        <div>
            <button onClick={() => IncrementAction()}>Button</button>
            <p>Licznik: {increment_number}</p>
            <button onClick={() => CountdownAction()}>Odliczaj</button>
            <button onClick={() => CountdownStop()}>Stop</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        increment_number: state.button
    }
}

const mapDispatchToProps = {
    IncrementAction,
    CountdownAction,
    CountdownStop
}

export default connect(mapStateToProps,mapDispatchToProps)(Button);