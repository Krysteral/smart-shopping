import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function ProductMatching({ shoppingList }) {
  const [matchedProducts, setMatchedProducts] = useState([]);

  useEffect(() => {
    if (shoppingList) {
      matchProducts(shoppingList.items);
    }
  }, [shoppingList]);

  const matchProducts = async (items) => {
    try {
      const response = await axios.post(`${API_URL}/api/products/match`, { items });
      setMatchedProducts(response.data);
    } catch (error) {
      console.error("Error matching products:", error);
    }
  };

  return (
    <div>
      <h2>Matched Products</h2>
      <ul>
        {matchedProducts.map((product) => (
          <li key={product._id}>
            <strong>{product.name}</strong>
            <p>Price: ${product.price}</p>
            <p>Store: {product.store.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductMatching;
