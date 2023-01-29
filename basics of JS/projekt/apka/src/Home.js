import {Link} from 'react-router-dom';

function Home() {
    return(
        <div id="home">
            <h1>Welcome Home!</h1>
            <p>To jest moja strona z bazą danych filmów. Pozwala ona na przeglądanie szczegółów, edytowanie, dodawanie i usuwanie filmów.</p>
            <Link to="/movies">Przejdź do listy z filmami</Link>
        </div>
        )
}

export default Home;