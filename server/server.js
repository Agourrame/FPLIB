const mongoose = require('mongoose');
const express = require("express");
const cors = require('cors');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(cors());
app.use(express.json());

const documentSchema = new mongoose.Schema({
  titre: String,
  dispo: Boolean,
  type: {
    type: String,
    required: true,
    enum: ['LIVRE', 'PERIODIQUE'],
  }, 
  exemplaires: {
    type: [String], 
    default: undefined,  // Optional field
  },
  details: {
    annee: {
      type: Number,
      required: function() {
        return this.type === 'LIVRE'; 
      },
    },
    edition: {
      type: String,
      required: function() {
        return this.type === 'LIVRE'; 
      },
    },
    auteur: {
      type: String,
      required: function() {
        return this.type === 'LIVRE'; 
      },
    },
    date: {
      type: String,
      required: function() {
        return this.type === 'PERIODIQUE';  // Required only for type2
      },
    },
    periodicite: {
      type: String,
      enum: ['MENSUEL', 'HEBDOMADAIRE', 'JOURNALIER'],
      required: function() {
        return this.type === 'PERIODIQUE';  // Required only for type2
      },
    },
  },
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


app.get('/api/documents', async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (err) {
    console.error("Error fetching documents:", err);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

app.post('/api/documents', async (req, res) => {
  try {
    const newDocument = new Document(req.body);
    console.log(newDocument);
    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (err) {
    console.error("Error adding document:", err);
    res.status(500).json({ error: "Failed to add document" });
  }
});

app.put('/api/documents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDocument = req.body;
    delete updatedDocument._id;
    delete updatedDocument.__v;
    const result = await Document.findByIdAndUpdate(id, updatedDocument, { new: true });
    res.json(updatedDocument);
  } catch (err) {
    console.error("Error updating document:", err);
    res.status(500).json({ error: "Failed to update document" });
  }
});

app.delete('/api/documents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Document.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) })
    res.json({ message: "Document deleted successfully" });
  } catch (err) {
    console.error("Error deleting document:", err);
    res.status(500).json({ error: "Failed to delete document" });
  }
});

app.get('/api/download', async (req, res) => {
  try {
    const documents = await Document.find();
    const filePath = path.join(__dirname, 'database.json');
    fs.writeFileSync(filePath, JSON.stringify(documents, null, 2));
    res.download(filePath, 'database.json', (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).json({ error: "Failed to download file" });
      } else {
        fs.unlinkSync(filePath); // Delete the file after download
      }
    });
  } catch (err) {
    console.error("Error generating JSON file:", err);
    res.status(500).json({ error: "Failed to generate JSON file" });
  }
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
