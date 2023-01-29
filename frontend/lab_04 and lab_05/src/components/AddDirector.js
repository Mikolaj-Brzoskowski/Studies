import { Field, Formik, Form } from "formik"
import {v4 as uuidv4} from 'uuid'
import { connect } from "react-redux"
import { AddDirectorAction } from "../actions/DirectorActions"
import { useHistory } from "react-router"
import * as Yup from 'yup'

const AddDirector = ({AddDirectorAction}, props) => {

    const history = useHistory()

    const addmovie = (values) => {
        AddDirectorAction(values)
        history.push("/directors")
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
                    directorId: uuidv4(),
                    firstName: '',
                    lastName: '',
                    age: '20',

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
        directors: state.directors
    }
}

const mapDispatchToProps = {
    AddDirectorAction
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDirector)