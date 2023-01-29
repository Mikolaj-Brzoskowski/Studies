import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
const losowa = getRandomInt(10,50)


function App() {
  function napis(){
    if (losowa === increment) return (<p>Równa</p>)
    if (losowa > increment) return (<p>Jeszcze nie</p>)
    if (losowa < increment) return (<p>Za dużo</p>)
  }

  const [increment, setIncrement] = useState(0)
  const [timer, setTimer] = useState()

  function buttonTimeout(e, number){
    setIncrement(increment + number)
    clearTimeout(timer)  
    setTimer(setTimeout(function() {
      setIncrement(0)
    }, 5000))
    setTimeout(timer)
  }
  
  return (
    <div>
      <button onClick={e => buttonTimeout(e, 1)}>Dodaj 1</button><br/>
      <button onClick={e => buttonTimeout(e, 5)}>Dodaj 5</button><br/>
      <button onClick={e => setIncrement(0)}>Wyzeruj</button>
      <p>{losowa}</p>
      <p>{increment}</p>
      {napis()}
    </div>
  );
}

export default App;
