import './App.css';
import Welcome from './Welcome';
import ChangePasswordForm from './ChangePasswordForm';
import Animals from './Animals';
import Personaldata from './Personaldata'
import React, { useState, useEffect } from 'react';


function App() {
  const animals = ["Pies", "Kot", "Koń"]
  const [data, setData] = useState({'name': '',
                                    'surname': '',
                                    'age': ''})

                                    
  const [pass, setPass] = useState("aaaaa")


  function handleData(e, type){
    let kopia = Object.assign({}, data);
    kopia[type] = e.target.value;
    setData(kopia)
  }

  function handleSubmit(e, value) {
    e.preventDefault();
    setPass(value)
    document.getElementById("password").reset();
  }

  useEffect(() => {
    console.log("Korzystam z React Hooks!")
  }, []);

  useEffect(() => {
    document.title = data['name']
  }, [data['name']]);

  return (
    <div className="App">
      {
        // Poniżej zaprezentowano przykład użycia props
      }
        <Welcome name={document.title}/>

        {// Umieść komponent, który będzie przyjmował jako element props tablicę animals i ją wyświetlał wewnątrz tagów li.
        }
        <Animals array={animals} />

        {// Poniżej są przygotowane inputy pod profil użytkownika. Stwórz komponent, który będzie otrzymywał te dane jako propsy, a następnie wyświetlał je.
        } 
        <div>
          <label>Imię</label>
          <input type="text" value={data['name']} onChange={e => handleData(e, 'name')}/>
        </div>
        <div>
          <label>Nazwisko</label>
          <input type="text" value={data['surname']} onChange={e => handleData(e, 'surname')}/>
        </div>
        <div>
          <label>Wiek</label>
          <input type="text" value={data['age']} onChange={e => handleData(e, 'age')}/>
        </div>
        <Personaldata data={data} />
        {// Zmień powyższe rozwiązanie tak, aby użyć dekonstrukcji obiektów zamiast odwoływać się do zmiennych za pomocą props.[nazwa]
        }

        {// Powszechną praktyką w React jest tworzenie osobnych komponentów dla wnętrza formularza. Uzupełnij komponenty App.js oraz ChangePasswordForm.js tak, 
         // aby wpisane hasło wyświetlało się po zatwierdzeniu w tagu <p> istniejącym w App.js 
        }
        <ChangePasswordForm handleSubmit={handleSubmit} />
        <p>Miejsce na hasło: {pass}</p>

    </div>
  );
}

export default App;
