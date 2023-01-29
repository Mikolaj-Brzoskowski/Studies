import { Link } from "react-router-dom"

const Navbar = () => {
    return(
        <div className="Navbar">
            <Link to="/">Strona główna</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/movies/add">Add Movie</Link>
            <Link to="/directors">Directors</Link>
            <Link to="/directors/add">Add Director</Link>
            <Link to="/actors">Actors</Link>
            <Link to="/actors/add">Add Actor</Link>
            <Link to="/button">Increment button</Link>
        </div>
    )
}

export default Navbar