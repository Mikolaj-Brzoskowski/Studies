import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import Cookies from 'universal-cookie'
import * as Yup from 'yup';
import { Formik } from "formik"
import { LoginPlayer, SetPlayerID } from '../actions/MainActions'

const Login = ({LoginPlayer, SetPlayerID}) => {

    useEffect(() => {
        
    }, [])

    const cookies = new Cookies();
    const history = useHistory()
    const [wrongPassword, setWrongPassword] = useState(false)
    const [wrongUsername, setWrongUsername] = useState(false)
    
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Required'),
        password: Yup.string()
        .required('No password provided.') 
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    });

    const handleSubmit = async (values) => {
        setWrongPassword(false);
        setWrongUsername(false);
        const response = await LoginPlayer(values)
        if (response === 'Wrong password'){
            setWrongPassword(true)
        }
        else if (response === 'User does not exist'){
            setWrongUsername(true)
        }
        else if (response === 'Success'){
            SetPlayerID(values.username)
            cookies.set('username', values.username)
            cookies.set('logged', true)
            history.push("/")
        }
        
    }

    return(
        <div>
            <h1>Log In!</h1>
            <Formik
                initialValues = {{
                    username: '',
                    password: ''
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
                        {wrongUsername ? (<div className="alert alert-danger" role="alert">Wrong username</div>) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" value={`${values.password}`} name="password" onChange={handleChange}/>
                        {errors.password && touched.password ? (<div className="alert alert-danger" role="alert">{errors.password}</div>) : null}
                        {wrongPassword ? (<div className="alert alert-danger" role="alert">Wrong password</div>) : null}
                    </Form.Group>
                    <Button variant="primary" type="submit">Login</Button>
                </Form>
            </div>)}
            </Formik>
            <Button className="m-3" variant="primary" size="md" onClick={() => history.push("/Login/Register")}>Register</Button>
        </div>
    )
}

const mapDispatchToProps = {
    LoginPlayer,
    SetPlayerID
}

export default connect(undefined, mapDispatchToProps)(Login) 