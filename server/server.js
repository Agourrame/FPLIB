const express = require("express");
const app = express();
const mongoose = require('mongoose');

const mongoDBURL = 'mongodb://127.0.0.1:27017';
const dbName = 'fplib';

// Define a Mongoose schema
const documentSchema = new mongoose.Schema({
  title: String,
  content: String,
  // Add other fields as needed
});

// Create a Mongoose model
const Document = mongoose.model('Document', documentSchema);

mongoose.connect(`${mongoDBURL}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => { 
  console.log("Connection Successfull");
})
.catch((err) => { 
  console.error("Connection Error:", err);
});

// Define route to fetch documents
app.get('/api/documents', async (req, res) => {
  try {
    // Fetch all documents from the collection
    const documents = await Document.find();
    res.json(documents); // Send JSON response with documents
  } catch (err) {
    console.error("Error fetching documents:", err);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server Started at port no. ${port}`);
});
