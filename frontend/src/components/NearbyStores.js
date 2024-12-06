import React, { useState } from 'react';

function NearbyStores() {
  const [query, setQuery] = useState('supermarket nearby');

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <h2>Nearby Stores</h2>
      <input
        type="text"
        placeholder="Enter your location.."
        value={query}
        onChange={handleQueryChange}
      />
      <iframe
        title="Nearby Supermarkets Map"
        width="600"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/search?q=supermarket%20nearby%20${encodeURIComponent(query)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
      ></iframe>
    </div>
  );
}

export default NearbyStores;
