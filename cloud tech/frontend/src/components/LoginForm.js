import {Formik} from "formik"
import * as Yup from "yup"
import { Form, Button }  from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { Buffer } from 'buffer'


const LoginForm = () => {

    const navigate =  useNavigate()

    const validationSchema = Yup.object().shape({
        login: Yup.string().required('Required'),
        pass: Yup.string().required('Required')
    })

    const handleSubmit = (values) => {

        const username = values.login
        const password = values.pass

        const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

        navigate(
            '/get',
            {state: {token: token}}
        )
    }

    return (
        <div className="LoginForm"> 
            <Formik
            initialValues={{
                login: '',
                pass: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
            >
                {({handleSubmit, handleChange, errors, touched, values}) => (
                    <Form onSubmit={handleSubmit}>
                        <h1>Login Form</h1>
                        <Form.Group className="mb-3">
                            <Form.Label>Login</Form.Label>
                            <Form.Control type="text" value={`${values.login}`} name="login" onChange={handleChange}></Form.Control>
                            {errors.login && touched.login ? (<div className="alert alert-danger" role="alert">{errors.login}</div>) : null}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={`${values.pass}`} name="pass" onChange={handleChange}></Form.Control>
                            {errors.pass && touched.pass ? (<div className="alert alert-danger" role="alert">{errors.pass}</div>) : null}
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

export default LoginForm;