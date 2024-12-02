import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';

const API_URL = process.env.REACT_APP_API_URL; // Environment variable for the backend URL

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products`); // Use API_URL here
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/products/${id}`); // Use API_URL here
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const resetSelectedProduct = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <h2>Product List Component Loaded</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id} className="product-item">
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <ProductForm
        product={selectedProduct}
        fetchProducts={fetchProducts}
        resetSelectedProduct={resetSelectedProduct}
        className="product-form"
      />
    </div>
  );
}

export default ProductList;
