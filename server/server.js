const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { analyzeImage } = require('./analyze'); // Import your analyze function

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// POST endpoint to process the uploaded image
app.post('/api/process-image', upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file.path;

    // Analyze the image using your AI model
    const results = await analyzeImage(imagePath);

    // Return the results back to the client
    res.json(results);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
