import React, { useEffect, useState } from 'react';
import styles from '../styling/result.module.css'; 
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Use from .env.local
  dangerouslyAllowBrowser: true, // Browser usage (not recommended for production)
});

const Results = ({ results }) => {
  const [aiRecommendation, setAiRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOpenAIInstructions = async () => {
      if (results.length > 0) {
        setIsLoading(true);
        const items = results.join(", "); // Join items into a string
        const messages = [
          { role: 'system', content: 'You are a waste management expert.' },
          { role: 'user', content: `The following have been detected as waste: ${items}. Provide environmentally friendly disposal or recycling methods for each of them, with specific tips for each.` }
        ];

        try {
          const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Use the desired model
            messages: messages,
            max_tokens: 300,
            temperature: 0.7,
          });

          setAiRecommendation(response.choices[0].message.content.trim()); // Set the instructions received from OpenAI
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
