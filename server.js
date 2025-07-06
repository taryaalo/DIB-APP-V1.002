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

app.post('/api/cache-form', (req, res) => {
  cachedForm = req.body || {};
  res.json({ success: true });
});

app.get('/api/cache-form', (req, res) => {
  res.json(cachedForm);
});

app.post('/api/cache-upload', upload.single('file'), (req, res) => {
  // File saved in uploads folder; you could process or move as needed
  res.json({ uploaded: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
