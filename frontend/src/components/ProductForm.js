import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast from react-toastify

function ProductForm({ product = {}, fetchProducts, resetSelectedProduct }) {
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price || '');
  const [description, setDescription] = useState(product?.description || '');

  // Use the backend URL from the environment variable
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    setName(product?.name || '');
    setPrice(product?.price || '');
    setDescription(product?.description || '');
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = { name, price, description };

    try {
      if (product && product._id) {
        await axios.put(`${API_URL}/api/products/${product._id}`, productData);
        resetSelectedProduct(); // Reset selected product after updating
        toast.success("Product updated successfully");
      } else {
        await axios.post(`${API_URL}/api/products`, productData);
        toast.success("Product added successfully");
      }
      fetchProducts();
      setName('');
      setPrice('');
      setDescription('');
    } catch (error) {
      toast.error("Error saving product");
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
        step="0.01"
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
