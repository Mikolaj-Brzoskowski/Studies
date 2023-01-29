import { Field, Formik, Form } from "formik"
import {v4 as uuidv4} from 'uuid'
import { connect } from "react-redux"
import { AddActorAction } from "../actions/ActorActions"
import { useHistory } from "react-router"
import * as Yup from 'yup'

const AddActor = ({AddActorAction}, props) => {

    const history = useHistory()

    const addmovie = (values) => {
        AddActorAction(values)
        history.push("/actors")
    }

    const Schema = Yup.object().shape({
        firstName: Yup.string()
        .max(30, "Too long")
        .required("Required"),
        lastName: Yup.string()
        .max(30, "Too long")
        .required("Required"),
        age: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .max(2, 'Must be exactly 4 digits')
        .required("Required")
    })

    return(
        <div>
            <Formik
                initialValues={{
                    actorId: uuidv4(),
                    firstName: '',
                    lastName: '',
                    age: '20',
                    moviesId: []
                }}
                validationSchema={Schema}
                onSubmit={(values) => addmovie(values)}
                enableReinitialize={true}
                >
                <Form>
                    First Name:  <Field name="firstName"/>
                    <br/>
                    Last Name:    <Field name="lastName"/>
                    <br/>
                    Age:    <Field name="age"/>
                    <br/>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        actors: state.actors
    }
}

const mapDispatchToProps = {
    AddActorAction
}

export default connect(mapStateToProps, mapDispatchToProps)(AddActor)