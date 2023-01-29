import { connect } from "react-redux";
import { DeleteNoteAction, DoneNoteAction } from "../actions/NoteActions";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotesList = ({ notes, DeleteNoteAction, DoneNoteAction } ,props) => {

    useEffect(() => {
        console.log(notes);
    }, [notes])

    return (
        <div>
            <h2>Notes:</h2>
            {notes.map(todo => (<div>Name: {todo.name}   
                                    Date: {todo.date} 
                                    <button onClick={() => DeleteNoteAction(todo)}>Usuń</button>
                                    <label>Done:<input type="checkbox" onChange={() => DoneNoteAction(todo)}/></label> 
                                    <Link to={`/notes/${todo.id}`}><button>Szczegóły</button></Link>
                                    </div> ))}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        notes: state.notes
    };
}

const mapDispatchToProps = {
    DeleteNoteAction,
    DoneNoteAction
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);