import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';
import styles from '../styling/mapstyle.module.css'; // Import the modular CSS file

// Optional: Set up a default icon for markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Sample mining locations in Canada (expanded list with names)
const miningLocations = [
  { name: 'Sudbury Basin, Ontario', coords: [46.49, -81.01] },
  { name: 'Voisey\'s Bay, Newfoundland and Labrador', coords: [56.31, -62.1] },
  { name: 'Red Lake Gold Mine, Ontario', coords: [51.04, -93.78] },
  { name: 'Highland Valley Copper Mine, British Columbia', coords: [50.43, -121.03] },
  { name: 'Diavik Diamond Mine, Northwest Territories', coords: [64.49, -110.27] },
  { name: 'Mount Polley Mine, British Columbia', coords: [53.72, -127.1] },
  { name: 'Lapa Mine, Quebec', coords: [48.92, -78.68] },
  { name: 'Huckleberry Mine, British Columbia', coords: [53.85, -122.59] },
  { name: 'Minto Mine, Yukon', coords: [60.11, -134.57] },
  { name: 'K+S Potash Canada, Saskatchewan', coords: [52.78, -113.16] },
  { name: 'Nugget Pond, Newfoundland', coords: [47.67, -53.13] },
  { name: 'Wolverine Mine, Yukon', coords: [60.00, -135.00] },
  { name: 'Goliath Gold Project, Ontario', coords: [46.0, -81.2] },
  { name: 'Suncor Energy, Fort Hills, Alberta', coords: [52.60, -118.15] },
  { name: 'Pembina Mine, Manitoba', coords: [48.61, -99.20] },
  { name: 'Castle Mountain Mine, British Columbia', coords: [49.67, -115.58] },
  { name: 'Doyon Mine, Northwest Territories', coords: [61.09, -114.43] },
  { name: 'Darnley Bay, Northwest Territories', coords: [57.28, -123.20] },
  { name: 'Goldboro Project, Nova Scotia', coords: [44.88, -63.24] },
  { name: 'Eagle Lake Gold Mine, Alberta', coords: [51.12, -112.45] },
  { name: 'Lambton Gold Mine, Ontario', coords: [42.9, -81.35] },
  { name: 'Lynn Lake Mine, Manitoba', coords: [50.0, -96.0] },
];

// HeatLayer component for adding the heatmap
const HeatLayer = ({ positions }) => {
  const map = useMap(); // Get the current map instance

  useEffect(() => {
    if (map) {
      const heatLayer = L.heatLayer(positions, {
        radius: 30,
        blur: 25,
        maxZoom: 10,
        gradient: {
          0.4: 'blue',
          0.6: 'lime',
          0.7: 'yellow',
          1.0: 'red',
        },
      });
      heatLayer.addTo(map); // Add the heatmap to the map
      console.log('Heat layer added!'); // Console log for debugging
    }
  }, [map, positions]); // Only run when map or positions change

  return null; // No need to render anything
};

const Map = () => {
  const position = [56.13, -106.34]; // Center of Canada

  return (
    <div>
      <Navbar />
      <div className={styles.mapWrapper}>
        <MapContainer
          center={position}
          zoom={4} // Zoomed out to show more of Canada
          className={styles.leaflet_container}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Markers for mining locations */}
          {miningLocations.map((loc, index) => (
            <Marker key={index} position={loc.coords}>
              <Popup>{loc.name}</Popup> {/* Use the name of the mining location */}
            </Marker>
          ))}

          {/* Add the heat layer */}
          <HeatLayer positions={miningLocations.map(loc => loc.coords)} />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
