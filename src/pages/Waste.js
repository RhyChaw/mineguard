import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ImageUploader from '../components/ImageUploader'; 
import Results from '../components/Results'; 
import styles from "../styling/result.module.css";

function Waste() {
  const [image, setImage] = useState(null); 
  const [results, setResults] = useState([]); // Array for waste items
  const [instructions, setInstructions] = useState(null); // State to hold instructions from OpenAI

  // Sample waste items to simulate analysis
  const wasteItems = [
    'Tailings',
    'Overburden',
    'Slag',
    'Rock Waste',
    'Chemical Waste',
    'Drilling Waste',
    'Spent Fuel',
    'Packaging Waste',
    'Wastewater',
    'Batteries and Electrical Waste',
  ];

  // Function to handle image upload
  const handleImageUpload = (uploadedImage) => {
    setImage(uploadedImage); 

    // Simulate image analysis by directly assigning waste items
    setResults(wasteItems); 

    // Simulate getting instructions from OpenAI
    getOpenAIInstructions(wasteItems); 
  };

  // Function to simulate getting instructions from OpenAI
  const getOpenAIInstructions = (classificationResults) => {
    const items = classificationResults.join(", "); // Join items into a string
    const simulatedInstructions = `Based on the following waste items: ${items}, ensure proper disposal by following local regulations and guidelines.`;

    setInstructions(simulatedInstructions); // Set the simulated instructions
  };

  return (
    <div className={styles.background}>
      <Navbar />
      <h1 className={styles.headline}>Waste Management for Mining</h1>
      <ImageUploader onImageUpload={handleImageUpload} /> 

      {/* Conditional rendering of Results component */}
      {results.length > 0 && (
        <Results 
          results={results} 
          instructions={instructions} 
          image={image} // Pass the image if needed
        />
      )}
    </div>
  );
}

export default Waste;
