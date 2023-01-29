import {useEffect, useState} from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import {Link} from 'react-router-dom'

function ProductList() {

    const [productsList, setProductsList] = useState([])
  
    useEffect( async() => {
      const getData = await axios.get('https://fakestoreapi.com/products') 
      console.log(getData)
      setProductsList(getData.data) 
    }, [])

    const handleDelete = async (ID) => {
      const response = await axios.delete(`https://fakestoreapi.com/products/${ID}`)
        setProductsList(productsList.filter(product => product.id !== ID))
        console.log(response)
    }

    return (
     <div>
       <Link to='/products/new' ><button>Add new</button></Link>
      {productsList && productsList.map(product => 
      <div>
        <ul key={product.id}>
          <li>ID: {product.id}</li>
        </ul>
        <Link to={`/products/${product.id}/details`}><button>Details</button></Link>
        <button onClick={e => handleDelete(product.id)}>Usuń</button>
        </div>
        )}
        
     </div>
    );
  }

export default ProductList;