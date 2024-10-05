import React from 'react';
import Navbar from '../components/Navbar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

// Optional: Set up a default icon for markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Sample mining locations in Canada
const miningLocations = [
  [46.49, -81.01], // Sudbury Basin, Ontario
  [56.31, -62.1],  // Voisey's Bay, Newfoundland and Labrador
  [51.04, -93.78], // Red Lake Gold Mine, Ontario
  [50.43, -121.03], // Highland Valley Copper Mine, British Columbia
  [64.49, -110.27]  // Diavik Diamond Mine, Northwest Territories
];

const Map = () => {
  const position = [56.13, -106.34]; // Center of Canada

  // Initialize heatmap layer on map load
  const handleMapLoad = (map) => {
    const heatLayer = L.heatLayer(miningLocations, {
      radius: 250,    // Adjust radius to control the size of the heatmap points
      blur: 15,      // Blurring factor
      maxZoom: 17,   // Max zoom level for the heatmap to show
      gradient: {    // Color gradient for heat intensity
        0.4: 'blue',
        0.65: 'lime',
        1: 'red'
      }
    });
    heatLayer.addTo(map); // Add heatmap layer to the map
  };

  return (
    <div>
      <Navbar />
      <div style={{ width: '1000px', height: '600px', margin: '0 auto' }}>
        <MapContainer
          center={position}
          zoom={4} // Zoomed out to show more of Canada
          style={{ height: '100%', width: '100%' }}
          whenCreated={handleMapLoad}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* Markers for mining locations */}
          {miningLocations.map((loc, index) => (
            <Marker key={index} position={loc}>
              <Popup>Mining Location {index + 1}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
