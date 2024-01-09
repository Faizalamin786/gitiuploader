const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3001;

// MongoDB connection setup
mongoose.connect('mongodb+srv://Faizal:Faizal786@faizal.atlxp5u.mongodb.net/your-database-name', {

});

// Check MongoDB connection
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
db.once('open', () => {
  console.log('MongoDB connected successfully!');
});
// MongoDB schema and model
const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
  // Add more fields as needed
});

const Image = mongoose.model('Image', imageSchema);

// Multer setup for file upload
const storage = multer.memoryStorage(); // Store images in memory (adjust based on your needs)
const upload = multer({ storage: storage });

// Express route for the root URL
app.get('/', (req, res) => {
  res.send('<h1>Your image has been uploaded Succesfully</h1>');
});

// Express route for image upload
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { originalname } = req.file;
    const imagePath = `/uploads/${originalname}`;

    // Save the image data to MongoDB
    await Image.create({
      filename: originalname,
      path: imagePath,
    });

    // Additional actions if needed

    res.json({ message: 'Image uploaded successfully', imagePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
