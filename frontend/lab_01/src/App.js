import './App.css';
import ProductList from './ProductList';
import {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom'
import ProductForm from './ProductForm.js'
import ProductDetails from './ProductDetails.js'
import ProductEdit from './ProductEdit.js'


function App() {
  return (
    <BrowserRouter>
    <main>
      <Switch>
        <Redirect exact from="/" to="/products"/>
        <Route exact path="/products">
          <ProductList/>
        </Route>
        <Route exact path="/products/:productID/details">
          <ProductDetails/>
        </Route>
        <Route exact path="/products/new">
          <ProductForm/>
        </Route>
        <Route exact path="/products/:productID/edit">
          <ProductEdit/>
        </Route>
      </Switch>
    </main>
    </BrowserRouter>
    )
}

export default App;
