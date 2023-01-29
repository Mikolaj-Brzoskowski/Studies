import './App.css';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';

function App() {
  return (
   <BrowserRouter>
    <main>
      <Switch>
      <Route path="/" component={PostsList} exact/>
      <Route path="/:id" component={PostDetails} exact/>
      <Route path="/:id/edit" component={PostForm} exact/>
      </Switch>
    </main>
   </BrowserRouter>
  );
}

export default App;

const PostsList = () => {
  const [posts, setPosts] = useState([])

  useEffect( () => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then( (answer) => { 
    setPosts(answer.data)
  })
  }, [])

  return(
  <div>
    {posts.map(post => (<div key={post.id}>
                          {<p>
                          {/* Id: {post.id}, UserId: {post.userId}, */}
                          <Link to={`/${post.id}`}>Title: {post.title},</Link> 
                          {/* Body: {post.body} */}
                          </p>}
                        </div>))}
  </div>

)};
  
const PostDetails = ({match: {params: {id}}}) => {
  const [post, setPost] = useState([])
  const [coms, setComs] = useState([])

  useEffect( () => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then( (answer) => { 
    setPost(answer.data)
  })
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then( (answer) => { 
      setComs(answer.data)
    })
  }, [])

  return (
    <div>
      <h2>Post:</h2>
      <p>Id:{post.id}, </p>
      <p>UserId: {post.userId}, </p>
      <p>Title: {post.title}, </p>
      <p>Body: {post.body} </p>
      <h2>Comments:</h2>
      {coms.map(com => (<div key={com.id}>
                          <p>Id: {com.id}, Name: {com.name}, 
                          email: {com.email}, Body: {com.body}</p>
                        </div>))}
      <Link to={`/${id}/edit`}><button>Edytuj</button></Link>
    </div>
  )
  
}

const PostForm = ({match: {params: {id}}}) => {
  const [post, setPost] = useState([])


  useEffect( () => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then( (answer) => { 
    setPost(answer.data)
  })
  }, [])

  function handleSubmit(e){
    e.preventDefault();
    console.log(post)
    axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`).then( (answer) => { 
      if (answer.status === 200) console.log("Wysłano")
    }).catch(error => console.log(error))
  }
  
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Id:</label><input type="number" value={`${id}`} readOnly></input><p/>
        <label>UserId:</label><input type="number" value={`${post.userId}`} readOnly></input><p/>
        <label>Title:</label><input type="text" defaultValue={post.title} onChange={(e) => post.title = e.target.value}></input><p/>
        <label>Body:</label><input type="text" defaultValue={post.body} onChange={(e) => post.body = e.target.value}></input>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  )

}