import React, { useEffect, useState } from 'react';

const SensorComponent = () => {
  const [pollutionLevel, setPollutionLevel] = useState(0);
  const [soilData, setSoilData] = useState(null);

  useEffect(() => {
    // Simulate fetching pollution data
    const fetchPollutionData = () => {
      const mockPollution = Math.random() * 100; // Random pollution level
      setPollutionLevel(mockPollution);
    };

    // Simulate soil data from sensor
    const fetchSoilData = () => {
      const mockSoil = { pH: 6.5, nutrients: 'High' }; // Example soil data
      setSoilData(mockSoil);
    };

    fetchPollutionData();
    fetchSoilData();
  }, []);

  return (
    <div>
      <h3>Pollution Level: {pollutionLevel.toFixed(2)}</h3>
      <h3>Soil Data: {soilData ? `pH: ${soilData.pH}, Nutrients: ${soilData.nutrients}` : 'Loading...'}</h3>
    </div>
  );
};

export default SensorComponent;
