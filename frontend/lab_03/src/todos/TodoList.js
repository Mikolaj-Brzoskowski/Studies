import { connect } from "react-redux";
import { DeleteTodoAction, DoneTodoAction } from "../actions/TodoActions";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const TodosList = ({ todos, DeleteTodoAction, DoneTodoAction } ,props) => {

    useEffect(() => {
        console.log(todos);
    }, [todos])

    return (
        <div>
            <h2>Todos:</h2>
            {todos.map(todo => (<div>Name: {todo.name}   
                                    Date: {todo.date} 
                                    <button onClick={() => DeleteTodoAction(todo)}>Usuń</button>
                                    <label>Done:<input type="checkbox" onChange={() => DoneTodoAction(todo)}/></label> 
                                    <Link to={`/todos/${todo.id}`}><button>Szczegóły</button></Link>
                                    </div> ))}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    };
}

const mapDispatchToProps = {
    DeleteTodoAction,
    DoneTodoAction
}


export default connect(mapStateToProps, mapDispatchToProps)(TodosList);