import React, { useEffect, useState } from 'react';
import styles from '../styling/result.module.css'; // Import the CSS module

const Results = ({ results }) => {
  const [aiRecommendation, setAiRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOpenAIInstructions = async () => {
      if (results.length > 0) {
        setIsLoading(true);
        const items = results.join(", "); // Join items into a string
        const prompt = `The following have been detected as waste: ${items}. Provide environmentally friendly disposal methods for each of them.`;

        try {
          const response = await fetch('https://api.openai.com/v1/completions', { // OpenAI API endpoint for completions
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer YOUR_OPENAI_API_KEY`, // Replace with your OpenAI API key
            },
            body: JSON.stringify({
              model: 'gpt-3.5-turbo', // Use the desired model
              prompt: prompt,
              max_tokens: 150, // Adjust the token limit if needed
              temperature: 0.7, // Set the temperature for response creativity
            }),
          });

          const data = await response.json();
          setAiRecommendation(data.choices[0].text.trim()); // Set the instructions received from OpenAI
        } catch (error) {
          console.error('Error fetching OpenAI instructions:', error);
          setAiRecommendation('Unable to fetch AI recommendations at this time.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchOpenAIInstructions();
  }, [results]); // Dependency on results

  return (
    <div className={styles.resultsContainer}>
      <h2>AI Feedback and Tips:</h2>
      {isLoading ? (
        <p>Loading recommendations...</p> // Show loading text while fetching
      ) : (
        <textarea 
          className={styles.textBox} 
          value={aiRecommendation || 'No recommendations available.'} 
          readOnly 
        />
      )}
    </div>
  );
};

export default Results;
