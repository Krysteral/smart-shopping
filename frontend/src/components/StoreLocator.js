import React, { useState } from 'react';
import { getStores } from '../api/storeApi';

function StoreLocator() {
  const [location, setLocation] = useState('');
  const [stores, setStores] = useState([]);

  const handleFindStores = async () => {
    try {
      const data = await getStores(location);
      setStores(data);
    } catch (error) {
      console.error("Error finding stores:", error);
    }
  };

  return (
    <div>
      <h2>Find Nearby Stores</h2>
      <input
        type="text"
        placeholder="Enter your location (ZIP or Address)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <button onClick={handleFindStores}>Find Stores</button>
      <ul>
        {stores.map((store) => (
          <li key={store._id}>
            <h3>{store.name}</h3>
            <p>{store.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StoreLocator;
