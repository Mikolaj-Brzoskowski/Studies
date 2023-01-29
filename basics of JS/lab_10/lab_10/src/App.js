import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }




function About() {
  
  function myFunction() {
    alert("Kliknięty")
  }

  const [input, setInput] = useState('')
  const [value,setValue] = useState();

 function PrintInput(e){
   e.preventDefault();
   setValue(input)
   document.getElementById("input").reset();
 }

  const [items, setItems] = useState([]);
  const [element, setElement] = useState("");

  const addItem = event => {
    event.preventDefault();
    setItems([
      ...items,
      element
    ]);
    setElement("");
  };

  const paragraf = <h1>Hello World!</h1>

  return (
    <div>
      {paragraf}
      <p>AAAAAAAAAA</p>
      <form id="input" onSubmit={event => PrintInput(event)}>
        <input type="text" onChange={(e) => setInput(e.target.value)}/>
        <button>Send input</button>
      </form>
      <p>Input: {value}</p>
      <button onClick={myFunction}>Click me!</button><br/>
      <br/>
      <form onSubmit={addItem}>
        <input type="text" value={element} onChange={e => setElement(e.target.value)}/>
        <button>Add to list</button>
      </form>
      <ul>
        {items.map(item => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default About;
