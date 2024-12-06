import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NearbyStores({ location }) {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/stores/nearby?lat=${location.lat}&lng=${location.lng}`);
        setStores(response.data);
      } catch (error) {
        console.error('Error fetching nearby stores:', error);
      }
    };

    fetchStores();
  }, [location]);

  return (
    <div>
      <h2>Nearby Stores</h2>
      <ul>
        {stores.map((store) => (
          <li key={store._id}>{store.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default NearbyStores;
