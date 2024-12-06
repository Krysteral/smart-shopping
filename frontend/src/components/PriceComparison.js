import React, { useState } from 'react';
import axios from 'axios';
import './PriceComparison.css';

function PriceComparison({ selectedProducts, stores }) {
  const [comparison, setComparison] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const calculatePrices = async () => {
    if (!selectedProducts.length) {
      setError('Please add items to your list first');
      return;
    }
    
    setLoading(true);
    try {
      console.log('Sending products to compare:', selectedProducts);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/compare-prices`,
        { products: selectedProducts }
      );

      console.log('Raw response:', JSON.stringify(response.data, null, 2));

      const transformedData = {
        cheapestTotalBill: {
          store: stores[0].name,
          total: 0,
          items: []
        },
        optimalDistribution: {
          totalSavings: 0,
          totalBill: 0,
          items: []
        }
      };

      let cheapestTotal = Infinity;
      let cheapestStoreIndex = 0;

      stores.forEach((store, index) => {
        let storeTotal = 0;
        selectedProducts.forEach(product => {
          const inventoryItem = store.inventory.find(item => item.product === product.name);
          if (inventoryItem) {
            storeTotal += inventoryItem.price * product.quantity;
          }
        });

        if (storeTotal < cheapestTotal) {
          cheapestTotal = storeTotal;
          cheapestStoreIndex = index;
        }
      });

      transformedData.cheapestTotalBill.store = stores[cheapestStoreIndex].name;
      transformedData.cheapestTotalBill.total = cheapestTotal;
      transformedData.cheapestTotalBill.items = selectedProducts.map(product => {
        const inventoryItem = stores[cheapestStoreIndex].inventory.find(
          item => item.product === product.name
        );
        return {
          name: product.name,
          quantity: product.quantity,
          price: inventoryItem ? inventoryItem.price : null
        };
      });

      transformedData.optimalDistribution.items = selectedProducts.map(product => {
        let cheapestPrice = Infinity;
        let cheapestStore = '';
        
        stores.forEach(store => {
          const inventoryItem = store.inventory.find(item => item.product === product.name);
          if (inventoryItem && inventoryItem.price < cheapestPrice) {
            cheapestPrice = inventoryItem.price;
            cheapestStore = store.name;
          }
        });

        return {
          productName: product.name,
          quantity: product.quantity,
          cheapestAt: cheapestStore,
          price: cheapestPrice,
          totalPrice: cheapestPrice * product.quantity
        };
      });

      const optimalTotal = transformedData.optimalDistribution.items.reduce(
        (sum, item) => sum + item.totalPrice, 0
      );
      transformedData.optimalDistribution.totalBill = optimalTotal;
      transformedData.optimalDistribution.totalSavings = cheapestTotal - optimalTotal;

      console.log('Transformed data:', transformedData);
      setComparison(transformedData);
      setError('');
    } catch (err) {
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError(err.response?.data?.message || 'Failed to fetch price comparison');
      setComparison(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Calculating best prices...</div>;
  }

  return (
    <div className="price-comparison">
      <div className="calculate-section">
        <button 
          onClick={calculatePrices}
          className="calculate-button"
          disabled={!selectedProducts.length}
        >
          Calculate Best Prices
        </button>
        {error && <div className="error-message">{error}</div>}
      </div>

      {comparison && comparison.cheapestTotalBill && comparison.optimalDistribution && (
        <div className="results-container">
          <h2 className="results-title">Price Comparison Results</h2>
          
          <div className="options-container">
            {/* Option 1: Single Store */}
            <div className="option-card">
              <h3>Option 1: Cheapest Store</h3>
              <div className="store-info">
                <h4>{comparison.cheapestTotalBill.store}</h4>
                <p className="total-price">
                  Total Bill: ${Number(comparison.cheapestTotalBill.total).toFixed(2)}
                </p>
                <div className="items-list">
                  {comparison.cheapestTotalBill.items
                    .filter(item => item.price != null)
                    .map((item, index) => (
                      <div key={index} className="item">
                        <span>{item.name}</span>
                        <span>${Number(item.price).toFixed(2)} × {item.quantity} = ${(Number(item.price) * item.quantity).toFixed(2)}</span>
                      </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Option 2: Multiple Stores */}
            <div className="option-card">
              <h3>Option 2: Best Prices Across Stores</h3>
              <p className="total-price">
                Total Bill: ${Number(comparison.optimalDistribution.totalBill).toFixed(2)}
              </p>
              <p className="savings">
                You Save: ${Number(comparison.optimalDistribution.totalSavings).toFixed(2)}
              </p>
              
              {/* Group items by store */}
              {comparison.optimalDistribution.items && 
                Object.entries(
                  comparison.optimalDistribution.items.reduce((stores, item) => {
                    if (!stores[item.cheapestAt]) {
                      stores[item.cheapestAt] = [];
                    }
                    stores[item.cheapestAt].push(item);
                    return stores;
                  }, {})
                ).map(([storeName, items]) => {
                  // Calculate subtotal for this store
                  const storeSubtotal = items.reduce((sum, item) => 
                    sum + (item.price * item.quantity), 0
                  );
                  
                  return (
                    <div key={storeName} className="store-group">
                      <h4>{storeName}:</h4>
                      {items.map((item, index) => (
                        <div key={index} className="item">
                          <span>{item.productName}</span>
                          <span>${Number(item.price).toFixed(2)} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="store-subtotal">
                        Store Subtotal: ${storeSubtotal.toFixed(2)}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PriceComparison; 