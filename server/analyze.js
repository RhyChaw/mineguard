// analyze.js
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

const loadModel = async () => {
  const model = await require('@tensorflow-models/coco-ssd').load();
  return model;
};

// Function to analyze image and return broken items
async function analyzeImage(imagePath) {
  // Load the model (this should ideally be done once and cached)
  const model = await loadModel();

  // Load the image
  const image = await loadImage(imagePath);
  
  // Create a canvas and draw the image onto it
  const canvas = createCanvas(image.width, image.height);
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);

  // Convert the canvas to a tensor
  const tensor = tf.browser.fromPixels(canvas);

  // Run object detection
  const predictions = await model.detect(tensor);

  // Process results
  const brokenItems = predictions
    .filter(pred => pred.score > 0.5) // Filter items with confidence score greater than 50%
    .map(pred => pred.class); // Get the class names

  // Clean up tensor
  tf.dispose(tensor);
  
  // Return results
  return { items: brokenItems };
}

module.exports = { analyzeImage };
