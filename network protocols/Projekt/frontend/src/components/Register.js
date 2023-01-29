import { connect } from 'react-redux'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import * as Yup from 'yup';
import { Formik } from "formik"
import { Registration } from '../actions/MainActions'

const Register = ({Registration}) => {

    const history = useHistory()
    const [userExists, setUserExists] = useState(false)
    
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Required'),
        password: Yup.string()
        .required('No password provided.') 
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password must contain Latin letters.'),
        confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords don't match!")
        .required('Required')
    });

    const handleSubmit = async (values) => {
        const response = await Registration(values);
        if (response) {
            setUserExists(true)
        }
        else{
            setUserExists(false)
            history.push("/Login") 
        }
    }

    return(
        <div>
            <h1>Register!</h1>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    confirm_password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => handleSubmit(values)}
                >
                {({
                handleSubmit,
                handleChange,
                errors,
                touched,
                values
        }) => (
            <div className="login-form">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter your username" value={`${values.username}`} name="username" onChange={handleChange}/>
                        {errors.username && touched.username ? (<div className="alert alert-danger" role="alert">{errors.username}</div>) : null}
                        {userExists ? (<div className="alert alert-danger" role="alert">User already exists</div>) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" value={`${values.password}`} name="password" onChange={handleChange}/>
                        {errors.password && touched.password ? (<div className="alert alert-danger" role="alert">{errors.password}</div>) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm password" value={`${values.confirm_password}`} name="confirm_password" onChange={handleChange}/>
                        {errors.confirm_password && touched.confirm_password ? (<div className="alert alert-danger" role="alert">{errors.confirm_password}</div>) : null}
                    </Form.Group>
                    <Button variant="primary" type="submit">Register</Button>
                </Form>
            </div>)}
            </Formik>
        </div>
    )
}

const mapDispatchToProps = {
    Registration
}

export default connect(undefined, mapDispatchToProps)(Register) 