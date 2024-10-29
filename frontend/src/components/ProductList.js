import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("Fetching products...");
    axios.get('http://localhost:5001/api/products')
      .then(response => {
        console.log("Products fetched:", response.data);  // Log the fetched data
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      <h2>Product List Component Loaded</h2>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
