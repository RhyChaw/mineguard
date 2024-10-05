import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ImageUploader from '../components/ImageUploader'; // Create a separate component for image uploading
import Results from '../components/Results'; // Create a results component for displaying the AI recommendations and map
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import styles from "../styling/result.module.css"

function Waste() {
  const [image, setImage] = useState(null); // State to hold the uploaded image
  const [results, setResults] = useState(null); // State to hold results from AI
  const [route, setRoute] = useState(null); // State to hold route data for the map
  const [userLocation, setUserLocation] = useState(null); // State to hold user location
  const [disposalSite, setDisposalSite] = useState(null); // State to hold the disposal site

  // Function to handle image upload
  const handleImageUpload = async (uploadedImage) => {
    setImage(uploadedImage); // Set the uploaded image

    // Send the image to the server and get results
    const formData = new FormData();
    formData.append('image', uploadedImage);

    try {
      const response = await fetch('/api/process-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResults(data); // Set the results received from the server
      // Placeholder: Set disposal site and user location based on your logic
      setUserLocation({ lat: 51.505, lng: -0.09 }); // Example user location
      setDisposalSite({ lat: 51.515, lng: -0.1 }); // Example disposal site
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // Placeholder function for AI model integration
  const handleAIProcessing = () => {
    // Here you will integrate with the AI model when ready
    console.log('AI processing placeholder for image:', image);
  };

  // Function to optimize route to disposal site (placeholder)
  const optimizeRoute = () => {
    // Here you will add logic to optimize the route
    console.log('Optimizing route from:', userLocation, 'to:', disposalSite);
    // Placeholder for setting route data
    setRoute([{ lat: 51.505, lng: -0.09 }, { lat: 51.515, lng: -0.1 }]); // Example route
  };

  return (
    <div className={styles.background}>
      <Navbar />
      <h1>Waste Management for Mining</h1>
      <ImageUploader onImageUpload={handleImageUpload} /> 
      <Results results={results} route={route} />
    </div>
  );
}

export default Waste;
