const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const { parse } = require('mrz');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });
const app = express();

app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  try {
    const { data: { text } } = await Tesseract.recognize(req.file.path, 'eng');
    const lines = text
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean)
      .slice(-2)
      .join('');
    let result;
    try {
      result = parse(lines);
    } catch (err) {
      return res.json({ fields: null });
    }
    const fields = result.fields;
    const formatDate = val => {
      if (!val) return '';
      const year = val.slice(0, 2);
      const month = val.slice(2, 4);
      const day = val.slice(4, 6);
      return `20${year}-${month}-${day}`;
    };
    const data = {
      documentType: 'Passport',
      fullName: `${fields.lastName.replace(/</g, ' ')} ${fields.firstName.replace(/</g, ' ')}`.trim(),
      firstNameEn: fields.firstName.replace(/</g, ' '),
      lastNameEn: fields.lastName.replace(/</g, ' '),
      dob: formatDate(fields.dateOfBirth),
      passportExpiry: formatDate(fields.expirationDate)
    };
    res.json({ fields: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Processing failed' });
  } finally {
    fs.unlink(req.file.path, () => {});
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Server running on port', port);
});
