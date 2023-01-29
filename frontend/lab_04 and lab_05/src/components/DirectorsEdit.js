import { Field, Formik, Form } from "formik"
import { connect } from "react-redux"
import { EditDirectorAction } from "../actions/DirectorActions"
import { withRouter } from "react-router"
import { useHistory } from "react-router"
import * as Yup from 'yup'

const EditDirector = ({EditDirectorAction, director}, props) => {

    const history = useHistory()

    const editdirector = async (values) => {
        await EditDirectorAction(values)
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
                    directorId: director.directorId,
                    firstName: director.firstName,
                    lastName: director.lastName,
                    age: director.age,

                }}
                validationSchema={Schema}
                onSubmit={(values) => editdirector(values)}
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

const mapStateToProps = (state, props) => {
    const id = props.match.params.id
    const director = state.directors.filter(el => el.directorId === id)
    return {
        director: director[0],
        directors: state.directors
    }
}

const mapDispatchToProps = {
    EditDirectorAction
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditDirector));