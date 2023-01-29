import { connect } from "react-redux"
import { DeleteActorAction } from "../actions/ActorActions"
import {Link} from "react-router-dom"

const ActorsList = ({actors, DeleteActorAction}, props) => {
    return(
        <div>
            {actors.map(actor =>(
                <div>
                Name: {actor.firstName} {actor.lastName}
                <button onClick={() => DeleteActorAction(actor)}>Delete</button>
                <Link to={`actors/${actor.actorId}`}> <button>Details</button></Link>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        actors: state.actors
    }
}

const mapDispatchToProps = {
    DeleteActorAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ActorsList)