import {Formik, Field, Form} from 'formik'
import {v4 as uuidv4} from 'uuid'
import { connect } from 'react-redux'
import {AddNoteAction} from '../actions/NoteActions'
import { Link } from 'react-router-dom'

const NoteForm = (props) => {

  function onSubmit(values) {
    props.AddNoteAction(values)
  }

  return (
    <div>
        <Link to="/notes"><button>Go to notes list</button></Link>
      <h3>Note Form</h3>
     <Formik
     initialValues={
       {id: uuidv4(),
        name: '',
        date: '',
        done: false}}
      onSubmit={(values) => onSubmit(values)}
      enableReinitialize={true}>
        <Form>
          Name: <Field name="name" label="name"/>
          Date: <Field name="date"/>
          <button type="submit">Submit</button>
        </Form>
     </Formik>
     </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  }
}

const mapDispatchToProps = {
  AddNoteAction
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);
