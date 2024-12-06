import React, { useState } from 'react';
import axios from 'axios';

const NearbyStores = ({ onStoresFound }) => {
  const [location, setLocation] = useState('');
  const [stores, setStores] = useState([]);
  const [error, setError] = useState('');

  const findStores = async () => {
    try {
      setError('');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/stores/search`, {
        params: {
          location: location
        }
      });
      
      if (response.data.length === 0) {
        setError('No stores found in this location. Try Oxford, MS or 38655');
      } else {
        setStores(response.data);
        onStoresFound(response.data); // Pass stores data up to parent
      }
    } catch (error) {
      setError('Error finding stores. Please try again.');
      console.error('Error fetching stores:', error);
    }
  };

  return (
    <div className="nearby-stores">
      <h2>Find Nearby Stores</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city or zip code (e.g., Oxford or 38655)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={findStores}>Search</button>
      </div>
      
      {error && <p className="error-message">{error}</p>}
      
      <div className="stores-list">
        {stores.map((store) => (
          <div key={store._id} className="store-card">
            <h3>{store.name}</h3>
            <p>{store.city}, {store.zip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyStores;
