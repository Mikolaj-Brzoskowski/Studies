import {Formik, Field, Form} from 'formik'
import {v4 as uuidv4} from 'uuid'
import { connect } from 'react-redux'
import {AddTodoAction} from '../actions/TodoActions'
import { useEffect } from 'react'

const TodoForm = (props) => {

  function onSubmit(values) {
    props.AddTodoAction(values)
  }

  return (
    <div>
      <h3>Todo Form</h3>
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
    todos: state.todos
  }
}

const mapDispatchToProps = {
  AddTodoAction
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
