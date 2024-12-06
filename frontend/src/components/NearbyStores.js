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
        placeholder="Search for stores..."
        value={query}
        onChange={handleQueryChange}
      />
      <iframe
        width="600"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/search?q=${encodeURIComponent(query)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
      ></iframe>
    </div>
  );
}

export default NearbyStores;
