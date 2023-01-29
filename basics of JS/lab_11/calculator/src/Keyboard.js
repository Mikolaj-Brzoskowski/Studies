import {useState} from "react";

function Keyboard({Add, Subtract, Multiply, Divide, handleSet}) {

  
  return (
      <div>
        <div>Podaj pierwszą liczbę: <input type='text' class="reset" onChange={e => handleSet(e, 1)} /></div>
        <div>Podaj drugą liczbę: <input type='text' class="reset" onChange={e => handleSet(e, 2)} /></div>
        <div><button onClick={Add}>Dodaj</button></div>
        <div><button onClick={Subtract}>Odejmij</button></div>
        <div><button onClick={Multiply}>Pomnóż</button></div>
        <div><button onClick={Divide}>Podziel</button></div>
      </div>
  )
}

export default Keyboard;