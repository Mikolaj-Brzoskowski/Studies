import { useNavigate, useLocation } from "react-router-dom";
import {Formik} from "formik"
import * as Yup from "yup"
import { Form, Button }  from "react-bootstrap"
import axios from 'axios'

const DataAdder = () => {

    const {state} = useLocation();
    const {token} = state;
    const navigate =  useNavigate()

    const validationSchema = Yup.object().shape({
        message: Yup.string().required('Required')
    })

    const handleSubmit = (values) => {
        axios.post('http://localhost:5000/data', 
        {
            message: values.message
        },
        {
            headers: {
            'Authorization': `Basic ${token}`
            }
        })
        .then((res) => {
            if (res.status === 200 ) {
                console.log("Message sent")
                navigate(
                    '/get',
                    {state: {token: token}}
                )
            }
        })
        .catch((error) => {
        console.error(error)
        navigate('/acc_den')
        })

    }


    return (
        <div className="DataAdder">  
            <Formik
            initialValues={{
                message: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
            >
                {({handleSubmit, handleChange, errors, touched, values}) => (
                    <Form onSubmit={handleSubmit}>
                        <h1>Add Message</h1>
                        <Form.Group className="mb-3">
                            <Form.Label>Message</Form.Label>
                            <Form.Control type="text" value={`${values.message}`} name="message" onChange={handleChange}></Form.Control>
                            {errors.message && touched.message ? (<div className="alert alert-danger" role="alert">{errors.message}</div>) : null}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default DataAdder;