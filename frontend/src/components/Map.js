<iframe width="600" height="450" style="border:0" loading="lazy" 
allowfullscreen src="https://www.google.com/maps/embed/v1/search?q=supermarket%20nearby&key=AIzaSyAaK38ajzooBzJGk7oJv8Wb4PVRwyo_zR0"></iframe>

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({ center, markers }) => {
  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12} // Adjust zoom level based on requirements
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
