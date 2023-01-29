import { Field, Formik, Form } from "formik"
import { connect } from "react-redux"
import { EditActorAction } from "../actions/ActorActions"
import { withRouter } from "react-router"
import { useHistory } from "react-router"
import * as Yup from 'yup'

const EditActor = ({EditActorAction, actor}, props) => {

    const history = useHistory()

    const editactor = async (values) => {
        await EditActorAction(values)
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
                    actorId: actor.id,
                    firstName: actor.firstName,
                    lastName: actor.lastName,
                    age: actor.age,
                    moviesId: actor.moviesId
                }}
                validationSchema={Schema}
                onSubmit={(values) => editactor(values)}
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
    const actor = state.actors.filter(el => el.id === id)
    return {
        actor: actor[0],
        actors: state.actors
    }
}

const mapDispatchToProps = {
    EditActorAction
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditActor));