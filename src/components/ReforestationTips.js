import React from 'react';

const ReforestationTips = ({ soilData }) => {
  return (
    <div>
      <h2>Reforestation Tips</h2>
      {soilData && soilData.nutrients === 'High' ? (
        <p>Plant nitrogen-fixing species like legumes for better soil recovery.</p>
      ) : (
        <p>Consider using organic fertilizers and planting resilient species.</p>
      )}
    </div>
  );
};

export default ReforestationTips;
