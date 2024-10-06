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
  const [data, setData] = useState({});
  const [aiRecommendation, setAiRecommendation] = useState('');
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  // Example CSV data for soil composition
  const soilCsvData = `
    Nitrogen,Phosphorus,Potassium,pH,Soil_Type
    30,10,20,6.5,Sandy
    40,15,25,7.0,Clay
    20,5,10,5.8,Loamy
    35,12,30,6.2,Silt
    25,8,15,6.8,Peaty
    50,20,40,7.5,Silty Loam
    28,9,18,6.0,Sandy Loam
    45,17,35,7.3,Clay Loam
    33,11,22,5.7,Silt Clay
    29,10,21,6.4,Sandy Clay
    48,16,38,7.2,Loamy Sand
    22,7,12,5.9,Chalky
    31,13,23,6.1,Peaty Loam
    27,6,14,5.5,Silty Clay
    52,19,42,7.8,Clayey Sand
    24,9,16,6.6,Sandy Peaty
    38,14,28,6.9,Loamy Clay
    20,6,10,5.3,Organic
    34,12,26,6.3,Gravelly
    46,18,37,7.1,Heavy Clay
    42,15,31,7.4,Marshy
    36,13,29,6.7,Swampy Loam
    39,14,32,6.9,Tropical Soil
    25,8,18,6.0,Volcanic Ash
    50,20,40,7.2,Bog Soil
    28,9,22,6.1,Desert Soil
    47,16,39,7.5,Saline Soil
    22,7,12,5.6,Prairie Soil
    30,10,20,6.5,Red Soil
    35,13,25,6.7,Limestone Soil
    21,6,14,5.8,Alkaline Soil
  `;

  const handleAnalyze = () => {
    Papa.parse(soilCsvData, {
      header: true,
      complete: async (result) => {
        const parsedData = result.data;
        const randomIndex = Math.floor(Math.random() * parsedData.length);
        const randomSoilSample = parsedData[randomIndex];
  
        if (randomSoilSample.__parsed_extra) {
          // Destructure the array in the correct order
          const [Nitrogen, Phosphorus, Potassium, pH, Soil_Type] = randomSoilSample.__parsed_extra;
  
          // Create the object with correct mapping
          const formattedData = {
            Nitrogen: Nitrogen || '',
            Phosphorus: Phosphorus || '',
            Potassium: Potassium || '',
            pH: pH || '',
            Soil_Type: Soil_Type || ''
          };
  
          setData(formattedData);
          console.log('randomSoilSample:', randomSoilSample);
          console.log('Updated data:', formattedData);
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
            model: 'gpt-3.5-turbo',
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
