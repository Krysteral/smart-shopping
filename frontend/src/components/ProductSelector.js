import React, { useState } from 'react';
import './ProductSelector.css';

function ProductSelector({ onProductsChange }) {
  const [products] = useState([
    "Milk (1 gallon)",
    "Bread",
    "Eggs (dozen)",
    "Cheese (8 oz)",
    "Chicken Breast (1 lb)",
    "Bananas (1 lb)",
    "Rice (5 lb)",
    "Pasta (16 oz)",
    "Ground Beef (1 lb)",
    "Tomatoes (1 lb)"
  ]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAddProduct = () => {
    if (selectedProduct && quantity > 0) {
      const newProduct = {
        name: selectedProduct,
        quantity: parseInt(quantity)
      };
      const updatedProducts = [...selectedProducts, newProduct];
      setSelectedProducts(updatedProducts);
      onProductsChange(updatedProducts);
      setSelectedProduct('');
      setQuantity(1);
    }
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(updatedProducts);
    onProductsChange(updatedProducts);
  };

  return (
    <div className="product-selector">
      <div className="input-container">
        <div className="select-wrapper">
          <label htmlFor="product-select">Select Product:</label>
          <select
            id="product-select"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="product-dropdown"
            placeholder="Choose a product"
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>

        <div className="quantity-wrapper">
          <label htmlFor="quantity-input">Quantity:</label>
          <input
            id="quantity-input"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="quantity-input"
            placeholder="Enter quantity"
          />
        </div>

        <div className="button-wrapper">
          <label className="invisible-label">Action:</label>
          <button 
            onClick={handleAddProduct}
            disabled={!selectedProduct || quantity < 1}
            className="add-button"
          >
            Add to List
          </button>
        </div>
      </div>

      <div className="selected-products">
        <h3>Selected Items:</h3>
        {selectedProducts.length === 0 ? (
          <p className="no-items">No items added to the list yet</p>
        ) : (
          selectedProducts.map((product, index) => (
            <div key={index} className="selected-product">
              <span>{product.name} (Quantity: {product.quantity})</span>
              <button
                onClick={() => handleRemoveProduct(index)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductSelector; 