import { connect } from 'react-redux'
import { withRouter, Link } from "react-router-dom"


const Details = ({item}) => {
    return(
        <div className="Main">
           {item.map(item => (
               <div key={item.id}>
                   ID: {item.id}<br/>
                   Name: {item.name}<br/>
                    Surname: {item.surname}<br/>
                    Item: {item.item}<br/>
                    {item.second_item ? <div>
                        Second item:<br/>
                        Name: {item.second_item.name}<br/>
                        Genre: {item.second_item.genre}<br/>
                        Playlists: {item.second_item.playlists.map(el => <div>{el}</div>)}
                        Likes: {item.second_item.like}<br/>
                        Description: {item.second_item.description}<br/>
                    </div> : <div> Second item: </div>}
                    <Link to={`/items/${item.id}/form`}><button>Add/Edit Item</button></Link>
                    </div>
           ))}
        </div>
    )
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id
    const detailed = state.items.filter(item => item.id == id)
    return {
        item: detailed
    }
}

export default withRouter(connect(mapStateToProps,undefined)(Details))