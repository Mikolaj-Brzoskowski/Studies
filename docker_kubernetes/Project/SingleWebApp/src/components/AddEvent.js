import { Button, Form } from 'react-bootstrap'
import {Formik} from "formik"
import * as Yup from "yup"
import axios from "axios"

const AddEvent = () => {

    const validationSchema = Yup.object().shape({
        event: Yup.string().min(3, "*Event names must have at least 3 characters").required("*Event name is required"),
      });

      return (
    <div>
        <div className="AddEvent">
        <h1>Add Event</h1>
        <Formik initialValues={{ event: ""}}
         validationSchema={validationSchema}
         onSubmit={(values, {setSubmitting, resetForm}) => {
            setSubmitting(true);
            axios.post('/backend/unprotectedData', values)
            .then((response) => {
                if(response.status === 200) {
                    resetForm();
                    setSubmitting(false);
                } 
            })
            .catch((error) => {
                console.error(error)
            })
         }}>
        { ({values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting }) => (
            <div>
            <Form.Group controlId="formName">
            <Form.Label>Event Name: </Form.Label>
            <Form.Control
                type="text"
                name="event"
                placeholder="Event Name"
                onChange={handleChange}
                value={values.event}
                />
                {touched.event && errors.event ? (
                    <div className="error-message">{errors.event}</div>
                  ): null}
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>Submit</Button>
            </div>
          )}
        </Formik>
    </div>
    </div>
    )
}

export default AddEvent;