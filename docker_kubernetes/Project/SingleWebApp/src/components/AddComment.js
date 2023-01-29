import { Button, Form } from 'react-bootstrap'
import {Formik} from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useEffect, useState } from "react"

const AddComment = () => {

  const [events, setevents] = useState([])
    
    useEffect(() => {
        axios.get('/backend/unprotectedData')
        .then((response) => {
            setevents(response.data.events)
        })
        .catch((error) => {
            console.error(error)
        })
    }, []);


    const validationSchema = Yup.object().shape({
        comment: Yup.string().min(10, "*Comments must have at least 10 characters").required("*Comment is required"),
        event: Yup.string().required("Event name is required"),
      });

      return (
    <div>
        <div className="AddEvent">
        <h1>Add Comment</h1>
        <Formik initialValues={{ comment: "", event: ""}}
         validationSchema={validationSchema}
         onSubmit={(values, {setSubmitting, resetForm}) => {
            setSubmitting(true);
            axios.post('/backend/protectedData', values)
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
            <Form.Group controlId="event">
            <Form.Label>Select event: </Form.Label>
            <Form.Select
            name="event"
            onChange={handleChange}
            value={values.event}
            >
            <option>Select event</option>
              {events.map((event) => (
                <option value={event} key={event}>{event}</option>
              ))}
            </Form.Select>
            </Form.Group>
            <Form.Group>
            <Form.Label>Comment: </Form.Label>
            <Form.Control
                type="text"
                name="comment"
                placeholder="Comment"
                onChange={handleChange}
                value={values.comment}
                />
                {touched.comment && errors.comment ? (
                    <div className="error-message">{errors.comment}</div>
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

export default AddComment;