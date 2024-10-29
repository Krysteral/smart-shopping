// src/components/ProductForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductForm({ product = {}, fetchProducts }) {
  const [name, setName] = useState(product.name || '');
  const [price, setPrice] = useState(product.price || '');
  const [description, setDescription] = useState(product.description || '');

  useEffect(() => {
    setName(product.name || '');
    setPrice(product.price || '');
    setDescription(product.description || '');
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = { name, price, description };

    try {
      if (product._id) {
        await axios.put(`http://localhost:5001/api/products/${product._id}`, productData);
      } else {
        await axios.post('http://localhost:5001/api/products', productData);
      }
      fetchProducts();
      setName('');
      setPrice('');
      setDescription('');
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" required />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
      <button type="submit">{product._id ? 'Update Product' : 'Add Product'}</button>
    </form>
  );
}

export default ProductForm;
