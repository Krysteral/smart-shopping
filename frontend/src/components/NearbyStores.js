import React, { useState } from 'react';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function NearbyStores() {
  const [location, setLocation] = useState('');
  const [stores, setStores] = useState([]);

  const findNearbyStores = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=5000&type=supermarket&key=${GOOGLE_MAPS_API_KEY}`
      );
      setStores(response.data.results);
    } catch (error) {
      console.error("Error fetching nearby stores:", error);
    }
  };

  return (
    <div>
      <h2>Nearby Stores</h2>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter your location (latitude,longitude)"
      />
      <button onClick={findNearbyStores}>Find Stores</button>
      <ul>
        {stores.map((store) => (
          <li key={store.place_id}>
            <strong>{store.name}</strong>
            <p>{store.vicinity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NearbyStores;
