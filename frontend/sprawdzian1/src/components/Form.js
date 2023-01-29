import { Field, Formik, Form } from "formik"
import { connect } from "react-redux"
import { useHistory, useParams } from "react-router"
import {addItem} from '../actions/actions'

const FormItem = ({addItem, detailed}, props) => {

    const history = useHistory()
    const { id } = useParams()

    const handleSubmit = (values) => {
        addItem(values, id)
        history.push("/items")
    }

    return(
        <div>
            <Formik
                initialValues={{
                    genre: '',
                    playlists: [],
                    like: '',
                    name: '',
                    description: '', 
                }}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}
                >
                <Form>
                <label>
                    <Field type="radio" name="like" value="Yes" />
                    Yes
                </label>
                <label>
                    <Field type="radio" name="like" value="No" />
                    No
                </label><br/>
                <label>
                    <Field type="checkbox" name="playlists" value="Favourites" />
                    Favourites
                </label>
                <label>
                    <Field type="checkbox" name="playlists" value="Gaming" />
                    Gaming
                </label>
                <label>
                    <Field type="checkbox" name="playlists" value="Sadness" />
                    Sadness
                </label><br/>
                    Name:<Field name="name"/>
                    <br/>
                    Description:<Field name="description"/>
                    <br/>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id
    const detailed = state.items.filter(item => item.id == id)[0]
    return {
        item: detailed
    }
}

const mapDispatchToProps = {
    addItem
}

export default connect(mapStateToProps, mapDispatchToProps)(FormItem)