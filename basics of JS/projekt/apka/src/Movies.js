import {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

function Movies() {

    const [movies, setMovies] = useState([])
    const [sortedField, setSortedField] = useState(null);
    const [order, setOrder] = useState('');

    useEffect( () => {
        axios.get('http://localhost:3000/movies').then( (answer) => { 
        setMovies(answer.data)
      })
      }, [])

    if (sortedField !== null) {
        if (order === 'rosnąco') {
            console.log('rosnąco')
            movies.sort((a, b) => {
            if (a[sortedField] < b[sortedField]) {
                return -1;
            }
            if (a[sortedField] > b[sortedField]) {
                return 1;
            }
            return 0;
            });
        }
        if (order === 'malejąco') {
            console.log('malejąco')
            movies.sort((a, b) => {
            if (a[sortedField] > b[sortedField]) {
                return -1;
            }
            if (a[sortedField] < b[sortedField]) {
                return 1;
            }
            return 0;
            });
        }
    }

    function changeOrder(arg){
        setSortedField(arg);
        if (order === '') setOrder('rosnąco')
        if (order === 'rosnąco') setOrder('malejąco')
        if (order === 'malejąco') setOrder('rosnąco')
    }
        
    function displayStars(rating){
        const stars = [];
        for (let i = 1; i <= Math.round(rating); i++) {
            stars.push(<img src="/star.png" alt="gwiazdka" id="star"/>);
        }
        return (
            stars
        )
    }
    
    const [currentPage, setCurrentPage] = useState(1);
    const [dataCount] = useState(3)
    const [pageLimit] = useState(4)
    const [checkedBoxes, setCheckedBoxes] = useState([])
  
    function goToNextPage() {
        if (currentPage !== Math.ceil(movies.length / dataCount)) setCurrentPage(currentPage+1)
    }
  
    function goToPreviousPage() {
        if (currentPage !== 1) setCurrentPage(currentPage-1)
    }
  
    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }
  
    function getPaginatedData() {
        const startIndex = currentPage * dataCount - dataCount;
        const endIndex = startIndex + dataCount;
        return movies.slice(startIndex, endIndex);
    };
    
  
    function getPaginationGroup() {
        if (Math.ceil(movies.length / dataCount) < pageLimit) {
            const start = 0
            return new Array(Math.ceil(movies.length / dataCount)).fill().map((_, idx) => start + idx + 1);
        }
        else if (currentPage + pageLimit - 1 > Math.ceil(movies.length / dataCount) ){
            const start = Math.ceil(movies.length / dataCount) - pageLimit
            return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
        }
        else{
            if (currentPage === 1) {
                const start = 0
                return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
            }
            else {
                const start = (currentPage - 2)
                return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
            }
            
        }
        
    };

    function handleCheck(key) {
        const checkbox = document.getElementById(key)
        if (checkbox.defaultChecked === false) {
            checkbox.defaultChecked = true
            setCheckedBoxes([...checkedBoxes, key.substr(9,2)])
            
        }
        else {
            checkbox.defaultChecked = false
            setCheckedBoxes(checkedBoxes.filter( x => x !== key.substr(9,2)))
        }
    }

    function handleDelete(){
        for (let i=0; i < checkedBoxes.length; i++){
            axios.delete(`http://localhost:3000/movie/${checkedBoxes[i]}`).then( (answer) => {
                if (answer.status === 200) console.log("Success!");
            }).catch(error => console.log(error))
        }
        window.location.reload()
    }

    function isChecked(id){
        for (let i=0; i < checkedBoxes.length; i++) {
            if (checkedBoxes[i] === id.toString()){ 
                return true
            }
        };
        return false
    }

    return(
        <div id="movies">
        <table>
            <caption><h2>Baza filmów</h2>
            <p>Sortowanie: {order}</p>
            </caption>
            <thead>
                <tr>
                    <th>
                        Miniaturka
                    </th>
                    <th>
                        <div className="sort-by" onClick={(e) => {changeOrder('title')}}>
                        Tytuł
                        </div>
                    </th>
                    <th>
                        <div className="sort-by" onClick={(e) => {changeOrder('rating')}}>
                        Ocena
                        </div>
                    </th>
                    <th>
                        <div className="sort-by" onClick={(e) => {changeOrder('year')}}>
                        Data
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
            {getPaginatedData().map(movie => (
                <tr key={movie.id}>
                    <td key={`Miniaturka${movie.id}`}>
                        <input type="checkbox" id={`checkbox-${movie.id}`} defaultChecked={isChecked(movie.id)} onClick={() => handleCheck(`checkbox-${movie.id}`)} />
                        <img src={movie.image_url} alt="Miniaturka" id="thumbnail"/>
                    </td>
                    <td key={`Tytuł${movie.id}`}><Link to={`/movie/${movie.id}`}>{movie.title}</Link></td>
                    <td className="stars" key={`Ocena${movie.id}`}>{displayStars(movie.rating)}</td> 
                    <td key={`Rok${movie.id}`}>{movie.year}</td> 
                </tr>
            ))}
            </tbody>
        </table>
        <div id="addAndDelete">
        <Link to="movies/edit"><button>Dodaj film</button></Link>
        <button onClick={() => handleDelete()}>Usuń zaznaczone filmy</button>
        </div>
        <div className="pagination">
            <p>Obecna strona: {currentPage}</p>
            <button onClick={goToPreviousPage}>Prev</button>
            {getPaginationGroup().map((item, index) => (<button key={index} onClick={changePage}>
                <span>{item}</span>
              </button>
            ))}
            <button onClick={goToNextPage}>Next</button>
          </div>
        </div>
        )
}

export default Movies;
