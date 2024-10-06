// pages/api/openai.js
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    try {
      const response = await openai.createCompletion({
        model: "gpt-3.5-turbo", // You can choose any model you prefer
        prompt: prompt,
        max_tokens: 150, // Adjust based on how detailed you want the response to be
      });

      res.status(200).json({ instructions: response.data.choices[0].text.trim() });
    } catch (error) {
      console.error('Error fetching from OpenAI:', error);
      res.status(500).json({ error: 'Failed to fetch instructions' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
