import { Field, Formik, Form } from "formik"
import {v4 as uuidv4} from 'uuid'
import { connect } from "react-redux"
import { AddMovieAction } from "../actions/MovieActions"
import {useHistory} from "react-router"
import * as Yup from 'yup'

const AddMovie = ({AddMovieAction, movies}, props) => {

    const history = useHistory()

    const addmovie = (values) => {
        AddMovieAction(values)
        history.push("/movies")
    }

    const Schema = Yup.object().shape({
        title: Yup.string()
        .max(30, "Too long")
        .required("Required"),
        productionYear: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(4, 'Must be exactly 4 digits')
        .max(4, 'Must be exactly 4 digits')
        .required("Required")
    })

    return(
        <div>
            <Formik
                initialValues={{
                    movieId: uuidv4(),
                    title: '',
                    productionYear: '1000',
                    actorsId: []
                }}
                validationSchema={Schema}
                onSubmit={(values) => addmovie(values)}
                enableReinitialize={true}
                >
                <Form>
                    Title:  <Field name="title"/>
                    <br/>
                    Production Year:    <Field name="productionYear"/>
                    <br/>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
}

const mapDispatchToProps = {
    AddMovieAction
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMovie)