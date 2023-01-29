import { connect } from "react-redux";
import { withRouter } from "react-router";

const TodoDetails = ({detailed} ,props) => {

    return (
        <div>
            {detailed.map(item => (<div>
                Id: {item.id}
                Name: {item.name}
                Date: {item.date}
                Done: {item.done.toString()}
            </div>))}
        </div>
    )
};

const mapStateToProps = (state, props) => {
    const id = props.match.params.id
    const detailed = state.todos.filter(el => el.id === id)
    console.log(detailed)
    return {
        detailed: detailed
    }
}


export default withRouter(connect(mapStateToProps, undefined)(TodoDetails));