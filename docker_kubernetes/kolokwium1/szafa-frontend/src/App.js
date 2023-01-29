import './App.css';

import {useState, useEffect} from 'react'
import axios from "axios"

function App() {

  const [mybackendmessage, setmybackendmessage] = useState()

  useEffect( () => {
    axios.get('/api/szafa').then(response => {
      console.log(response.data);
      setmybackendmessage(response.data)})
    .catch(error => console.log(error))
  })

  return (
    <div className="App">
      <div>{mybackendmessage}</div>
    </div>
  );
}

export default App;