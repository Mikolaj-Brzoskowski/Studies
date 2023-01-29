import logo from './logo.svg';
import './App.css';
import Cookies from 'js-cookie'
import { Field, Formik, Form } from 'formik'
import {useState} from 'react'

function App() {

  const [checker, setChecker] = useState(false)
  const [number, setNumber] = useState(1)

  const setCookie = () => {
    Cookies.set('Ciastko', 'wartość', {expires: 7})
  }

  const handleSubmit = async (values) => {
    let number = Cookies.get(`${values.imie}`+`${values.nazwisko}`)
    console.log(number)
    if (number === undefined){
      await Cookies.set(`${values.imie}`+`${values.nazwisko}`, 1)
    }
    else {
        number = parseInt(number) + 1
        await Cookies.set(`${values.imie}`+`${values.nazwisko}`, number)
        setNumber(number)
    }
    setChecker(true)
  }

  return (
    <div className="App">
      <button onClick={() => setCookie() }>Dodaj ciastko</button>
      <Formik
      initialValues={{
        imie: '',
        nazwisko: ''
      }}
      enableReinitialize={true}
      onSubmit={(values) => handleSubmit(values)}>
      <Form>
        <label htmlFor="imie">Imie</label>
        <Field id="imie" name="imie" />
        <br/>
        <label htmlFor="nazwisko">Nazwisko</label>
        <Field id="nazwisko" name="nazwisko" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
      {checker &&
      <p>Odwiedziłeś stronę {number} razy</p>
      }
    </div>
  );
}

export default App;
