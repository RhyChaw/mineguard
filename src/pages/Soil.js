import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Papa from 'papaparse';
import soil from "../images/Soil.jpg";
import { OpenAI } from 'openai'; // Import OpenAI for API calls
import styles from '../styling/soil.module.css';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Enable browser usage
});

function Soil() {
  const [data, setData] = useState([]);
  const [aiRecommendation, setAiRecommendation] = useState('');
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  // Example CSV data for soil composition
  const soilCsvData = `
    Nitrogen,Phosphorus,Potassium,pH,Soil_Type
    30,10,20,6.5,Sandy
    40,15,25,7.0,Clay
    20,5,10,5.8,Loamy
  `;

  const handleAnalyze = () => {
    Papa.parse(soilCsvData, {
      header: true,
      complete: async (result) => {
        const parsedData = result.data;
        const randomIndex = Math.floor(Math.random() * parsedData.length);
        const randomSoilSample = parsedData[randomIndex];
        
        // Checking if there's parsed_extra field and accessing its values
        if (randomSoilSample.__parsed_extra) {
          const [Nitrogen, Phosphorus, Potassium, pH, Soil_Type] = randomSoilSample.__parsed_extra;

          // Assigning the parsed values to the state
          const formattedData = { Nitrogen, Phosphorus, Potassium, pH, Soil_Type };
          setData(formattedData);

          console.log('randomSoilSample:', randomSoilSample);
          console.log('Updated data:', formattedData); // Log formatted data
        } else {
          console.error('Unexpected data structure:', randomSoilSample);
        }

        setIsAnalyzed(true);

        // AI prompt based on the soil composition
        const prompt = `
        Based on the soil composition of ${randomSoilSample.__parsed_extra[4]} with a pH of ${randomSoilSample.__parsed_extra[3]}, and Nitrogen: ${randomSoilSample.__parsed_extra[0]}, Phosphorus: ${randomSoilSample.__parsed_extra[1]}, and Potassium: ${randomSoilSample.__parsed_extra[2]}, 
        give suggestions to miners on how to restore the soil after mining has been done.
        `;

        try {
          const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Use a valid model
            messages: [{ role: 'user', content: prompt }],
          });

          setAiRecommendation(response.choices[0].message.content);
        } catch (error) {
          console.error('Error with OpenAI API:', error);
          setAiRecommendation('Unable to fetch AI recommendations at this time.');
        }
      },
    });
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        {/* Left side - 1/4 for the image */}
        <div className={styles.leftSide}>
          <img src={soil} alt="Soil" className={styles.soilImage} />
        </div>

        {/* Right side - 3/4 for the button and AI recommendation */}
        <div className={styles.rightSide}>
          <button onClick={handleAnalyze} className={styles.scanButton}>
            Scan Soil
          </button>

          {/* Display soil composition and AI recommendation */}
          {isAnalyzed && (
            <div className={styles.resultSection}>
              <h2>Soil Composition</h2>
              <p>Nitrogen: {data.Nitrogen}</p>
              <p>Phosphorus: {data.Phosphorus}</p>
              <p>Potassium: {data.Potassium}</p>
              <p>pH: {data.pH}</p>
              <p>Soil Type: {data.Soil_Type}</p>

              <h2>AI Recommendation</h2>
              <p>{aiRecommendation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Soil;
