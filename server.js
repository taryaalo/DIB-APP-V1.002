const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let cachedForm = {};
let cachedUploads = {};
let cachedExtracted = {};

app.post('/api/cache-form', (req, res) => {
  cachedForm = req.body || {};
  res.json({ success: true });
});

app.get('/api/cache-form', (req, res) => {
  res.json(cachedForm);
});

app.post('/api/cache-upload', upload.single('file'), (req, res) => {
  const docType = req.body.docType;
  if (req.file && docType) {
    cachedUploads[docType] = req.file.path;
  }
  res.json({ uploaded: true });
});

app.get('/api/cache-upload/:docType', (req, res) => {
  res.json({ path: cachedUploads[req.params.docType] });
});

app.post('/api/cache-extracted', (req, res) => {
  const { docType, data } = req.body || {};
  if (docType) {
    cachedExtracted[docType] = data;
  }
  res.json({ success: true });
});

app.get('/api/cache-extracted/:docType', (req, res) => {
  res.json(cachedExtracted[req.params.docType] || {});
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
