import { connect } from 'react-redux'
import { Link } from "react-router-dom"

const Main = ({items}) => {
    return(
        <div className="Main">
           {items.map(item => (
               <div key={item.id}><Link to={`/items/${item.id}`}>{item.name} {item.surname}</Link></div>
           ))}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        items: state.items
    }
}

export default connect(mapStateToProps,undefined)(Main)