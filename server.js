const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { callChatGPT } = require('./ai');
const { Pool } = require('pg');

// Load environment variables from the .env file if present
require('dotenv').config();

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

function logActivity(msg) {
  logMessage(msg);
  pool.query('INSERT INTO activity_log (activity) VALUES ($1)', [msg]).catch(e =>
    console.error('Activity log error:', e.message)
  );
}

function logError(msg) {
  logMessage(msg);
  pool.query('INSERT INTO error_log (error) VALUES ($1)', [msg]).catch(e =>
    console.error('Error log error:', e.message)
  );
}

const https = require('https');
const http = require('http');

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || '',
  database: process.env.PG_DATABASE || 'dib_app_data',
});

// Log database connection events and errors
pool.on('connect', () => logActivity('DB_CONNECT'));
pool.on('error', (err) => logError(`DB_ERROR ${err.message}`));

const app = express();
const upload = multer({ dest: 'uploads/' });
const HTTP_PORT = process.env.PORT || 7003;
const HTTPS_PORT = process.env.HTTPS_PORT || 7103;

app.use(cors());
// Allow slightly larger payloads for image data
app.use(express.json({ limit: '20mb' }));

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
    logActivity(message);
  }
  res.json({ success: true });
});

function generateReference(id) {
  const padded = id.toString().padStart(6, '0');
  return `REF-${padded}`;
}

app.post('/api/submit-form', async (req, res) => {
  const form = req.body || {};
  const values = [
    form.fullName,
    form.firstNameEn || null,
    form.middleNameEn || null,
    form.lastNameEn || null,
    form.passportNumber || null,
    form.passportIssueDate || null,
    form.passportExpiryDate || null,
    form.birthPlace || null,
    form.dob || null,
    form.gender || null,
    form.nationality || null,
    form.familyRecordNumber || null,
    form.phone || null,
    form.email || null,
    form.residenceExpiry || null,
    form.censusCardNumber || null,
    form.aiModel || null,
    form.serviceType || null
  ];
  const query = `INSERT INTO personal_info (
      full_name, first_name, middle_name, last_name, passport_number,
      passport_issue_date, passport_expiry_date, birth_place, dob, gender,
      nationality, family_record_number, phone, email, residence_expiry,
      census_card_number, ai_model, service_type
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18
    ) RETURNING id, created_at`;
  try {
    const result = await pool.query(query, values);
    const id = result.rows[0].id;
    const createdAt = result.rows[0].created_at;
    const referenceNumber = generateReference(id);
    logActivity(`DB_INSERT personal_info ${referenceNumber}`);

    if (form.addressInfo) {
      const a = form.addressInfo;
      await pool.query(
        'INSERT INTO address_info (personal_id, country, city, area, residential_address) VALUES ($1,$2,$3,$4,$5)',
        [id, a.country || null, a.city || null, a.area || null, a.residentialAddress || null]
      );
    }

    if (form.workInfo) {
      const w = form.workInfo;
      await pool.query(
        'INSERT INTO work_income_info (personal_id, employment_status, job_title, employer, employer_address, employer_phone, source_of_income, monthly_income) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
        [id, w.employmentStatus || null, w.jobTitle || null, w.employer || null, w.employerAddress || null, w.employerPhone || null, w.sourceOfIncome || null, w.monthlyIncome || null]
      );
    }

    const nid = Array.isArray(form.nidDigits) ? form.nidDigits.join('') : '';
    const folder = nid && nid.length === 12 ? nid :
      '10000' + Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
    const userDir = path.join('uploads', folder);
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    for (const [docType, fileName] of Object.entries(cachedUploads)) {
      const newPath = path.join(userDir, path.basename(fileName));
      try {
        fs.renameSync(fileName, newPath);
      } catch (err) {
        logError(`MOVE_FILE_ERROR ${err.message}`);
      }
      await pool.query(
        'INSERT INTO uploaded_documents (personal_id, doc_type, file_name, reference_number) VALUES ($1,$2,$3,$4)',
        [id, docType, newPath, referenceNumber]
      );
    }
    cachedForm = {};
    cachedUploads = {};
    cachedExtracted = {};
    res.json({ referenceNumber, createdAt });
  } catch (e) {
    logError(`SUBMIT_ERROR ${e.message}`);
    res.status(500).json({ error: 'Failed to save' });
  }
});

app.post('/api/chatgpt', async (req, res) => {
  const { prompt, base64Data, mimeType } = req.body || {};
  try {
    const data = await callChatGPT(prompt, base64Data, mimeType);
    logActivity(`CHATGPT_RESPONSE ${JSON.stringify(data)}`);
    res.json(data);
  } catch (e) {
    logError(`CHATGPT_ERROR ${e.message}`);
    const status = e.message === 'Missing API key' ? 400 : 500;
    res.status(status).json({ error: e.message });
  }
});

app.get('/api/test-db', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ connected: true });
  } catch (e) {
    logError(`DB_TEST_ERROR ${e.message}`);
    res.status(500).json({ connected: false, error: e.message });
  }
});

app.use((err, req, res, next) => {
  logError(`ERROR ${err.message}`);
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
