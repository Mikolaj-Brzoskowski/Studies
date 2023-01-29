import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useKeycloak} from "@react-keycloak/web";
import {useEffect, useState} from "react"
import axios from "axios"

const SecuredPage  =  () =>  {

    const { keycloak } = useKeycloak();
    const isLoggedIn = keycloak.authenticated;

    const [comments, setcomments] = useState({})
    
    useEffect(() => {
      if (isLoggedIn) {
        axios.get('http://localhost:6000/protectedData')
        .then((response) => {
            setcomments(response.data.comments)
        })
        .catch((error) => {
            console.error(error)
        })
      } 
    }, [isLoggedIn]);

    return  (
        <div>
            <h1 className="text-black text-4xl">Comments</h1>
            {Object.keys(comments).map((keyName)=> (
              <div key={keyName}>
              <h4>{keyName}:</h4>
              {comments[keyName].map(comment => 
                (
                  <p key={comment}>{comment}</p>
                )
                )}
              </div>
            ))}
            <p><Link to="/events"><Button>Events</Button></Link></p>
            <Link to="/add_comment"><Button>Add comment</Button></Link>
        </div>
    )
}

export default SecuredPage;