import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'

function Form() {
    const {id} = useParams();
    const [movie, setMovie] = useState([])

    useEffect( () => {
        if (id !== undefined){
        axios.get(`http://localhost:3000/movie/${id}`).then( (answer) => { 
        setMovie(answer.data)
    })}
    }, [id])

    function printInfo(){
        if (id !== undefined){
            return (<h2>Edytujesz film o tytule: {movie.title}</h2>)
        }
        else return(<h2>Dodajesz nowy film</h2>)
    }

    function placeholder(type){
        if (id !== undefined){
            return (movie[type])
        }

    }

  const formik = useFormik({
    initialValues: {
    "title": "",
    "director": "",
    "genre": "",
    "year": undefined, // wartość między 1000 a rokiem 2025
    "description": "",
    "image_url": null
    },
    onSubmit: values => {
        console.log(values)
      if (id !== undefined){
          axios.put(`http://localhost:3000/movie/${id}`, values).then( (answer) => {
          if (answer.status === 200) {
          console.log("Success!")
          window.location.reload()
          }
        }).catch(error => {console.log(error);
                        alert("Błąd! Podany tytuł istnieje już w bazie!");})
      }
      else {
        axios.post(`http://localhost:3000/movie`, values).then( (answer) => {
            if (answer.status === 200) {
            console.log("Success!")
            window.location.reload()
            }
          }).catch(error => {console.log(error);
                            alert("Błąd! Podany tytuł istnieje już w bazie!");})
      }
    }
  });
  return (
    <div id="form">
    {printInfo()}
    <form onSubmit={formik.handleSubmit}>
        <label htmlFor="title">Tytuł:</label>
        <input
            id="title"
            name="title"
            type="text"
            placeholder={placeholder("title")}
            onChange={formik.handleChange}
            value={formik.values["title"]}
            required
        /><br/>

        <label htmlFor="director">Reżyser:</label>
        <input
            id="director"
            name="director"
            type="text"
            placeholder={placeholder("director")}
            onChange={formik.handleChange}
            value={formik.values["director"]}
            required
        /><br/>

        <label htmlFor="genre">Gatunek:</label>
        <input
            id="genre"
            name="genre"
            type="text"
            maxLength="50"
            placeholder={placeholder("genre")}
            onChange={formik.handleChange}
            value={formik.values["genre"]}
            required
        /><br/>

        <label htmlFor="year">Rok produkcji:</label>
            <input
                id="year"
                name="year"
                type="number"
                min="1000"
                max="2030"
                placeholder={placeholder("year")}
                onChange={formik.handleChange}
                value={formik.values["year"]}
                required
            /><br/>

        <label htmlFor="description">Opis:</label>
            <input
                id="description"
                name="description"
                type="text"
                placeholder={placeholder("description")}
                onChange={formik.handleChange}
                value={formik.values["description"]}
                required
            /><br/>

        <label htmlFor="image_url">Image URL:</label>
            <input
                id="image_url"
                name="image_url"
                type="url"
                placeholder={placeholder("image_url")}
                onChange={formik.handleChange}
                value={formik.values["image_url"]}
            /><br/>

      <button type="submit">Wyślij</button>
    </form>
    </div>
  );

};

export default Form;