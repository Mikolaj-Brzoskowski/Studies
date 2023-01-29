import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams, Link} from 'react-router-dom'

function ProductList() {

    const { productID } = useParams();
    const [product, setProduct] = useState([])
  
    useEffect( async() => {
      const getData = await axios.get(`https://fakestoreapi.com/products/${productID}`) 
      console.log(getData)
      setProduct(getData.data) 
    }, [])

    return (
      <div>
        <ul key={product.id}>
          <li>ID: {product.id}</li>
          <li>Title: {product.title}</li>
          <li>Price: {product.price}</li>
          <li>Category: {product.category}</li>
        </ul>
        <Link to='/products'><button>Usuń</button></Link>
        </div>
    );
  }

export default ProductList;
