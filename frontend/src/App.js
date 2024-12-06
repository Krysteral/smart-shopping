import React, { useState } from 'react';
import axios from 'axios';
import ProductSelector from './components/ProductSelector';
import PriceComparison from './components/PriceComparison';
import './App.css';

function App() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [location, setLocation] = useState('');
  const [nearbyStores, setNearbyStores] = useState([]);
  const [error, setError] = useState('');

  const handleLocationSearch = async () => {
    try {
      setError('');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/stores/nearby/${location}`);
      if (response.data.length === 0) {
        setError('No stores found in this location');
      } else {
        setNearbyStores(response.data);
      }
    } catch (error) {
      console.error('Error fetching nearby stores:', error);
      setError('Error finding stores. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Smart Shopping Price Comparison</h1>
      <div className="location-search">
        <input
          type="text"
          placeholder="Enter City or ZIP Code"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleLocationSearch}>Search Stores</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      
      {nearbyStores.length > 0 && (
        <div className="nearby-stores">
          <h3>Nearby Stores:</h3>
          <ul>
            {nearbyStores.map(store => (
              <li key={store._id}>{store.name} - {store.city}</li>
            ))}
          </ul>
        </div>
      )}

      <ProductSelector 
        onProductsChange={setSelectedProducts}
        nearbyStores={nearbyStores}
      />
      {nearbyStores.length > 0 && (
        <PriceComparison 
          selectedProducts={selectedProducts}
          stores={nearbyStores}
        />
      )}
    </div>
  );
}

export default App;
