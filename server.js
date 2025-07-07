const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

function logMessage(msg) {
  const file = path.join(logsDir, `${new Date().toISOString().split('T')[0]}.log`);
  const entry = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFile(file, entry, (err) => {
    if (err) console.error('Log error:', err);
  });
}

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

app.post('/api/log', (req, res) => {
  const { message } = req.body || {};
  if (message) {
    logMessage(message);
  }
  res.json({ success: true });
});

app.post('/api/chatgpt', async (req, res) => {
  const { prompt, base64Data, mimeType } = req.body || {};
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  if (!apiKey) {
    logMessage('Missing OpenAI API key');
    return res.status(400).json({ error: 'Missing API key' });
  }
  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You extract data from images and return JSON.' },
          {
            role: 'user',
            content: [
              { type: 'text', text: `${prompt} Only return valid JSON.` },
              { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64Data}` } },
            ],
          },
        ],
        max_tokens: 1000,
        response_format: { type: 'json_object' },
      }),
    });

    const data = await resp.json();
    logMessage(`CHATGPT_RESPONSE ${JSON.stringify(data)}`);
    res.status(resp.ok ? 200 : resp.status).json(data);
  } catch (e) {
    logMessage(`CHATGPT_ERROR ${e.message}`);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
});

app.use((err, req, res, next) => {
  logMessage(`ERROR ${err.message}`);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
