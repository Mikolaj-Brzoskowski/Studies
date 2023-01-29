import {useEffect, useState} from 'react'
import axios from 'axios'
import {Link, useHistory, useParams} from 'react-router-dom'

function Movie() {
    const {id} = useParams();
    const [movie, setMovie] = useState([])
    const history = useHistory();

    useEffect( () => {
        axios.get(`http://localhost:3000/movie/${id}`).then( (answer) => { 
        setMovie(answer.data)
      })
      }, [id])

    function handleDelete(){
        axios.delete(`http://localhost:3000/movie/${id}`).then( (answer) => {
          if (answer.status === 200) console.log("Success!");
        }).catch(error => console.log(error))
        history.push('/movies')
        window.location.reload()
    }

    function displayStars(rating){
      const stars = [];
      for (let i = 1; i <= Math.round(rating); i++) {
          stars.push(<img src="/star.png" alt="gwiazdka" id="star" key={`star${i}`}/>);
      }
      return (
          stars
      )
    }

    function sendResult(number){
      const rateStart = document.getElementsByName("rating")
      for (let i=0; i < rateStart.length; i++){
        rateStart[i].disabled = true
      }
      axios.patch(`http://localhost:3000/movie/${id}/rate?score=${number}`).then( (answer) =>{
        if (answer.status === 200) console.log("Rating sent")
      }).catch(error => console.log(error))
    }
    
    return(
        <div id="movie">
            <Link to="/movies"><img src="/left-arrow.png" alt='left arrow' id="arrow"></img></Link>
            <h1>{movie.title}</h1>
            <p><img src={movie.image_url} alt="thumbnail" id="thumbnail"/></p>
            <h3>Opis:</h3>
            <p>{movie.description}</p>
            <h3>Reżyser:</h3>
            <p>{movie.director}</p>
            <h3>Gatunek:</h3>
            <p>{movie.genre}</p>
            <h3>Rok produkcji:</h3>
            <p>{movie.year}</p>
            <h3>Ocena:</h3>
            <p>{displayStars(movie.rating)}</p>
            <h3>Twoja ocena:
              <div className="star-rating">   
                <input type="radio" name="rating" id="rating-5" onClick={() => sendResult(5)}/>
                <label htmlFor="rating-5"></label>
                <input type="radio" name="rating" id="rating-4" onClick={() => sendResult(4)}/>
                <label htmlFor="rating-4"></label>
                <input type="radio" name="rating" id="rating-3" onClick={() => sendResult(3)}/>
                <label htmlFor="rating-3"></label>
                <input type="radio" name="rating" id="rating-2" onClick={() => sendResult(2)}/>
                <label htmlFor="rating-2"></label>
                <input type="radio" name="rating" id="rating-1" onClick={() => sendResult(1)}/>
                <label htmlFor="rating-1"></label>
              </div>
            </h3>
            <Link to={`/movies/edit/${id}`}><button>Edytuj film</button></Link>
            <button onClick={handleDelete}>Usuń film</button>
        </div>
        )
}

export default Movie;