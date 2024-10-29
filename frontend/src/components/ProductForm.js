import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductForm({ product = {}, fetchProducts }) {
  // Initialize the state with default values to avoid null errors
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price || '');
  const [description, setDescription] = useState(product?.description || '');

  useEffect(() => {
    // Update the form fields if a product is selected for editing
    setName(product?.name || '');
    setPrice(product?.price || '');
    setDescription(product?.description || '');
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = { name, price, description };

    try {
      if (product && product._id) {
        await axios.put(`http://localhost:5001/api/products/${product._id}`, productData);
      } else {
        await axios.post('http://localhost:5001/api/products', productData);
      }
      fetchProducts();
      setName('');  // Clear the form after submission
      setPrice('');
      setDescription('');
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Product Name" 
        required 
      />
      <input 
        type="number" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
        placeholder="Price" 
        required 
      />
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description">
      </textarea>
      <button type="submit">{product && product._id ? 'Update Product' : 'Add Product'}</button>
    </form>
  );
}

export default ProductForm;
