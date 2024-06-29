const mongoose = require('mongoose');
const express = require("express");
const app = express();

const documentSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Document = mongoose.model('documents', documentSchema);

module.exports = Document;

const mongoDBURL = 'mongodb://127.0.0.1:27017';
const dbName = 'fplib';

mongoose.connect(`${mongoDBURL}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => { 
  console.log("Connection Successful");
})
.catch((err) => { 
  console.error("Connection Error:", err);
});

// Middleware to parse JSON bodies
app.use(express.json());

// Route to fetch all documents
app.get('/api/documents', async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (err) {
    console.error("Error fetching documents:", err);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

// Route to add a new document
app.post('/api/documents', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newDocument = new Document({ title, content });
    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (err) {
    console.error("Error adding document:", err);
    res.status(500).json({ error: "Failed to add document" });
  }
});

// Route to update a document
app.put('/api/documents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedDocument = await Document.findByIdAndUpdate(id, { title, content }, { new: true });
    res.json(updatedDocument);
  } catch (err) {
    console.error("Error updating document:", err);
    res.status(500).json({ error: "Failed to update document" });
  }
});

// Route to delete a document
app.delete('/api/documents/:id', async (req, res) => {
  console.log("delete")
  try {
    const { id } = req.params;
    await Document.findOneAndDelete({ _id: new ObjectID(id) })
    res.json({ message: "Document deleted successfully" });
  } catch (err) {
    console.error("Error deleting document:", err);
    res.status(500).json({ error: "Failed to delete document" });
  }
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
