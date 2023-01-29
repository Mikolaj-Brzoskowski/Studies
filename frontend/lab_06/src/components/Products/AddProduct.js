import { Field, Formik, Form } from "formik"
import { connect } from "react-redux"
import { addProduct } from "../../actions/ProductsActions"
import { useHistory } from "react-router"
import {v4 as uuidv4} from 'uuid'

const AddProduct = ({addProduct, products}, props) => {

    const history = useHistory()

    const handleSubmit = (values) => {
        addProduct(values)
        history.push("/products")
    }

    return(
        <div>
            <Formik
                initialValues={{
                    id: uuidv4,
                    title: '',
                    price: 0,
                    description: '',
                    image: '',
                    category: ''
                }}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}
                >
                <Form>
                    Title:<Field name="title"/>
                    <br/>
                    Price:<Field name="price"/>
                    <br/>
                    Description:<Field name="description"/>
                    <br/>
                    Image:<Field name="image"/>
                    <br/>
                    Category:<Field name="category"/>
                    <br/>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products
    }
}

const mapDispatchToProps = {
    addProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)