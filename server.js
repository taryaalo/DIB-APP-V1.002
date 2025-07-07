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

const https = require('https');
const http = require('http');

const app = express();
const upload = multer({ dest: 'uploads/' });
const HTTP_PORT = process.env.PORT || 7003;
const HTTPS_PORT = process.env.HTTPS_PORT || 7103;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

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
  const openaiUrl = process.env.REACT_APP_OPENAI_URL ||
    'https://api.openai.com/v1/chat/completions';
  try {
    const resp = await fetch(openaiUrl, {
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

http.createServer(app).listen(HTTP_PORT, () => {
  console.log(`HTTP server running on port ${HTTP_PORT}`);
});

try {
  const keyPath = process.env.SSL_KEY_PATH || path.join(__dirname, 'key.pem');
  const certPath = process.env.SSL_CERT_PATH || path.join(__dirname, 'cert.pem');
  const httpsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };
  https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
    console.log(`HTTPS server running on port ${HTTPS_PORT}`);
  });
} catch (e) {
  console.warn('HTTPS disabled:', e.message);
}
