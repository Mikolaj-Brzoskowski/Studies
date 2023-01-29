import React, {useState} from 'react';
import Keyboard from "./Keyboard";

function Display() {

  const [result, setResult] = useState(0);
  const [pierwsza, setPierwsza] = useState(0);
  const [druga, setDruga] = useState(0);
  
  function Add() {
    setResult(pierwsza + druga)
  }

  function Subtract() {
    setResult(pierwsza - druga)
  }

  function Multiply() {
    setResult(pierwsza * druga)
  }

  function Divide() {
    setResult(pierwsza / druga)
  }

  function handleSet(e, num){
    if (num === 1) setPierwsza(parseInt(e.target.value))
    if (num === 2) setDruga(parseInt(e.target.value))
  }

  function Reset(){
    setPierwsza(0);
    setDruga(0);
    setResult(0);
    var element = document.getElementsByClassName("reset");
    for(var i=0; i<element.length; i++) {
        element[i].value = ""
      }
  }

  return (
    <div>
    <Keyboard Add={Add} Subtract={Subtract} Multiply={Multiply} Divide={Divide} handleSet={handleSet}/>
    <button onClick={Reset}>Reset</button>
    <p>Wynik: {result}</p>
    </div>
  )
}

export default Display;