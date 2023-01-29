import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Users from './components/Users/Users'
import UsersDetails from './components/Users/UsersDetails'
import Products from './components/Products/Products'
import ProductsDetails from './components/Products/ProductsDetails'
import Dashboard from './components/Dashboard'
import AddProduct from './components/Products/AddProduct'
import CartProducts from './components/Products/CartProducts';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Dashboard/>
        <Switch>
          <Route exact path="/users" component={Users}/>
          <Route exact path="/users/:id" component={UsersDetails}/>
          <Route exact path="/products" component={Products}/>
          <Route exact path="/products/add" component={AddProduct}/>
          <Route exact path="/products/:id" component={ProductsDetails}/>
          <Route exact path="/users/:id/cart" component={CartProducts}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
