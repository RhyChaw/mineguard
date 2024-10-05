import React, { useState } from 'react';
import Papa from 'papaparse';
import Navbar from '../components/Navbar';
import MaskedMiner from "../images/masked-miner.jpeg";
import styles from '../styling/air.module.css';
import { OpenAI } from 'openai';

// Initialize OpenAI with dangerouslyAllowBrowser
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Enable this option
});

function Air() {
  const [data, setData] = useState([]);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(''); // For AI feedback

  const csvData = `CO2,PM2.5,CO,O3,NOx,Temp,Humidity,Air_Quality_Label
  400,5,0.05,0.01,15,22,45,Good
  450,10,0.08,0.02,18,24,50,Moderate
  500,20,0.10,0.03,25,28,55,Unhealthy
  600,35,0.15,0.04,30,30,60,Very Unhealthy
  700,50,0.20,0.05,40,32,65,Hazardous`;

  const handleAnalyze = () => {
    Papa.parse(csvData, {
      header: true,
      complete: async (result) => {
        const parsedData = result.data;
        const randomIndex = Math.floor(Math.random() * parsedData.length);
        const randomRow = parsedData[randomIndex];
        setData(randomRow);
        setIsAnalyzed(true);

        // Create prompt for AI based on air quality label
        const prompt = `The air quality is ${randomRow.Air_Quality_Label}. Please suggest what the miner should do.`;

        try {
          // Call OpenAI API for feedback based on the label
          const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Updated model
            messages: [{ role: 'user', content: prompt }],
          });

          setAiFeedback(response.choices[0].message.content);
        } catch (error) {
          console.error('Error fetching AI feedback:', error);
          setAiFeedback('Unable to fetch AI feedback at the moment.');
        }
      },
    });
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.leftSide}></div>
        <div className={styles.rightSide}>
          <h1>Air Quality Analysis</h1>
          <button onClick={handleAnalyze} className={styles.analyzeButton}>
            Analyze current air quality on site
          </button>
        </div>
      </div>

      {isAnalyzed && (
        <div className={styles.tableSection}>
          <h2>Sample Data</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>CO2</th>
                <th>PM2.5</th>
                <th>CO</th>
                <th>O3</th>
                <th>NOx</th>
                <th>Temperature (°C)</th>
                <th>Humidity (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.CO2}</td>
                <td>{data["PM2.5"]}</td>
                <td>{data.CO}</td>
                <td>{data.O3}</td>
                <td>{data.NOx}</td>
                <td>{data.Temp}</td>
                <td>{data.Humidity}</td>
              </tr>
            </tbody>
          </table>

          <h2>Overall the Air Quality is: {data.Air_Quality_Label}</h2>
          
          <div className={styles.feedbackSection}>
            <h2>AI Feedback</h2>
            <p>{aiFeedback}</p> {/* Display the AI feedback */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Air;
