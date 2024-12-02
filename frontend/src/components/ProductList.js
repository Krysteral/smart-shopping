import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []); // No dependencies, so it stays the same across renders

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // Add fetchProducts as a dependency

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/products/${id}`);
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
