import { connect } from "react-redux"

const Dashboard = ({Dashboard, Dashboard_2}) => {

    return(
        <div>
            Movies with most actors: {Dashboard.map(el => (
                <div>
                {el.title}
                </div>
            ))}
            <br/>
            Actors with most movies: 
            {Dashboard_2.map(el => (
                <div>
                {el.firstName} {el.lastName}
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => {
    let Dashboard = [...state.movies]
    Dashboard = Dashboard.sort(function(a, b) {
        return b.actorsId.length - a.actorsId.length;
    }).slice(0,3)

    let Dashboard_2 = [...state.actors]
    Dashboard_2 = Dashboard_2.sort(function(a, b) {
        return b.moviesId.length - a.moviesId.length;
    }).slice(0,3)

    return {
        Dashboard : Dashboard,
        Dashboard_2: Dashboard_2
    }
}

export default connect(mapStateToProps, undefined)(Dashboard)