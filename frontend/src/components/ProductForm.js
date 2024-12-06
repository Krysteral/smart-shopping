import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../api/productApi';
import { toast } from 'react-toastify';

function ProductForm({ product, fetchProducts, resetSelectedProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price || '');
      setDescription(product.description || '');
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = { name, price, description };

    try {
      if (product?._id) {
        await updateProduct(product._id, productData);
        toast.success("Product updated successfully");
      } else {
        await createProduct(productData);
        toast.success("Product added successfully");
      }
      fetchProducts();
      resetSelectedProduct();
      setName('');
      setPrice('');
      setDescription('');
    } catch (error) {
      toast.error("Error saving product");
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <button type="submit">{product ? 'Update' : 'Add'}</button>
    </form>
  );
}

export default ProductForm;
