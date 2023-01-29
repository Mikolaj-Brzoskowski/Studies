import {useEffect, useState} from 'react';
import axios from 'axios';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';

const ProductForm = ({create}) => {

      const valSch = yup.object().shape({
        title: yup.string()
          .required("Title is required"),
        price: yup.number()
          .typeError("Title must be a number")
          .min(0, "Minimal number is 0")
          .required("Price is required"),
        image: yup.string().url(),
      })

      return (  
        <Formik
          initialValues={{
            title: '',
            price: 0,
            description: '',
            image: '',
            category: ''
        }}
        validationSchema={valSch}
        onSubmit={async (form, actions) => {
          const response = await axios.post('https://fakestoreapi.com/products', form)
          if (response.status === 200) {
          console.log(response)
          alert('Dodano do listy')
          actions.resetForm()
        }}}
        >
        <Form>
          <label htmlFor="title">Title:</label>
          <Field name="title"
          />
          <ErrorMessage name="title" component="div"/>
          <br/>
          <label htmlFor="price">Price:</label>
          <Field name="price"
          />
          <ErrorMessage name="price" component="div"/>
          <br/>
          <label htmlFor="description">Description:</label>
          <Field name="description"
          /><br/>
          <label htmlFor="image">Image:</label>
          <Field name="image"
          />
           <ErrorMessage name="image" component="div"/>
          <br/>
          <label htmlFor="category">Category:</label>
          <Field name="category"
          /><br/>
    
          <button type="submit">Submit</button>
          </Form>
          </Formik>
      );
}

export default ProductForm;