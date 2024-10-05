import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import styles from '../styling/result.module.css'; // Import the CSS module

const Results = ({ results, route }) => {
  return (
    <div className={styles.resultsContainer}>
      <h2>AI Results</h2>
      
      {/* Textbox for AI Results */}
      <textarea 
        className={styles.textBox} 
        value={JSON.stringify(results, null, 2)} 
        readOnly 
      />

      {/* Placeholder for route, below add the map */}
      <div className={styles.mapContainer}>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default Results;
