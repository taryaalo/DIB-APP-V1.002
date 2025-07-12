const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { callChatGPT, callGemini } = require('./ai');
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
// Serve uploaded files statically so the React app can display them
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

app.post('/api/address-info', async (req, res) => {
  const { reference, nid, country, city, area, residentialAddress } = req.body || {};
  if (!reference && !nid) return res.status(400).json({ error: 'missing_identifier' });
  try {
    let personal;
    if (reference) {
      personal = await pool.query('SELECT id, national_id FROM personal_info WHERE reference_number=$1', [reference]);
    } else {
      personal = await pool.query('SELECT id, national_id FROM personal_info WHERE national_id=$1 ORDER BY created_at DESC LIMIT 1', [nid]);
    }
    if (personal.rows.length === 0) return res.status(404).json({ error: 'not_found' });
    const pid = personal.rows[0].id;
    const natId = personal.rows[0].national_id;
    const existing = await pool.query('SELECT id FROM address_info WHERE personal_id=$1', [pid]);
    if (existing.rows.length) {
      await pool.query(
        'UPDATE address_info SET country=$1, city=$2, area=$3, residential_address=$4 WHERE personal_id=$5',
        [country || null, city || null, area || null, residentialAddress || null, pid]
      );
      logActivity(`DB_UPDATE address_info ${pid}`);
    } else {
      await pool.query(
        'INSERT INTO address_info (personal_id, national_id, country, city, area, residential_address) VALUES ($1,$2,$3,$4,$5,$6)',
        [pid, natId, country || null, city || null, area || null, residentialAddress || null]
      );
      logActivity(`DB_INSERT address_info ${pid}`);
    }
    res.json({ success: true });
  } catch (e) {
    logError(`ADDRESS_INFO_ERROR ${e.message}`);
    res.status(500).json({ error: 'server_error' });
  }
});

app.post('/api/work-info', async (req, res) => {
  const { reference, nid, employmentStatus, jobTitle, employer, employerAddress, employerPhone, sourceOfIncome, monthlyIncome } = req.body || {};
  if (!reference && !nid) return res.status(400).json({ error: 'missing_identifier' });
  try {
    let personal;
    if (reference) {
      personal = await pool.query('SELECT id, national_id FROM personal_info WHERE reference_number=$1', [reference]);
    } else {
      personal = await pool.query('SELECT id, national_id FROM personal_info WHERE national_id=$1 ORDER BY created_at DESC LIMIT 1', [nid]);
    }
    if (personal.rows.length === 0) return res.status(404).json({ error: 'not_found' });
    const pid = personal.rows[0].id;
    const natId = personal.rows[0].national_id;
    const existing = await pool.query('SELECT id FROM work_income_info WHERE personal_id=$1', [pid]);
    if (existing.rows.length) {
      await pool.query(
        'UPDATE work_income_info SET employment_status=$1, job_title=$2, employer=$3, employer_address=$4, employer_phone=$5, source_of_income=$6, monthly_income=$7 WHERE personal_id=$8',
        [employmentStatus || null, jobTitle || null, employer || null, employerAddress || null, employerPhone || null, sourceOfIncome || null, monthlyIncome || null, pid]
      );
      logActivity(`DB_UPDATE work_income_info ${pid}`);
    } else {
      await pool.query(
        'INSERT INTO work_income_info (personal_id, national_id, employment_status, job_title, employer, employer_address, employer_phone, source_of_income, monthly_income) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
        [pid, natId, employmentStatus || null, jobTitle || null, employer || null, employerAddress || null, employerPhone || null, sourceOfIncome || null, monthlyIncome || null]
      );
      logActivity(`DB_INSERT work_income_info ${pid}`);
    }
    res.json({ success: true });
  } catch (e) {
    logError(`WORK_INFO_ERROR ${e.message}`);
    res.status(500).json({ error: 'server_error' });
  }
});

app.get('/api/address-info', async (req, res) => {
  const { reference, nid } = req.query;
  if (!reference && !nid) return res.status(400).json({ error: 'missing_identifier' });
  try {
    let personal;
    if (reference) {
      personal = await pool.query('SELECT id FROM personal_info WHERE reference_number=$1', [reference]);
    } else {
      personal = await pool.query('SELECT id FROM personal_info WHERE national_id=$1 ORDER BY created_at DESC LIMIT 1', [nid]);
    }
    if (personal.rows.length === 0) return res.status(404).json({ error: 'not_found' });
    const pid = personal.rows[0].id;
    const address = await pool.query('SELECT * FROM address_info WHERE personal_id=$1 LIMIT 1', [pid]);
    res.json(address.rows[0] || null);
  } catch (e) {
    logError(`ADDRESS_INFO_GET_ERROR ${e.message}`);
    res.status(500).json({ error: 'server_error' });
  }
});

app.get('/api/work-info', async (req, res) => {
  const { reference, nid } = req.query;
  if (!reference && !nid) return res.status(400).json({ error: 'missing_identifier' });
  try {
    let personal;
    if (reference) {
      personal = await pool.query('SELECT id FROM personal_info WHERE reference_number=$1', [reference]);
    } else {
      personal = await pool.query('SELECT id FROM personal_info WHERE national_id=$1 ORDER BY created_at DESC LIMIT 1', [nid]);
    }
    if (personal.rows.length === 0) return res.status(404).json({ error: 'not_found' });
    const pid = personal.rows[0].id;
    const work = await pool.query('SELECT * FROM work_income_info WHERE personal_id=$1 LIMIT 1', [pid]);
    res.json(work.rows[0] || null);
  } catch (e) {
    logError(`WORK_INFO_GET_ERROR ${e.message}`);
    res.status(500).json({ error: 'server_error' });
  }
});

app.get('/api/personal-info', async (req, res) => {
  const { reference, nid } = req.query;
  if (!reference && !nid) return res.status(400).json({ error: 'missing_identifier' });
  try {
    let personal;
    if (reference) {
      personal = await pool.query('SELECT * FROM personal_info WHERE reference_number=$1', [reference]);
    } else {
      personal = await pool.query('SELECT * FROM personal_info WHERE national_id=$1 ORDER BY created_at DESC LIMIT 1', [nid]);
    }
    if (personal.rows.length === 0) return res.status(404).json({ error: 'not_found' });
    res.json(personal.rows[0]);
  } catch (e) {
    logError(`PERSONAL_INFO_GET_ERROR ${e.message}`);
    res.status(500).json({ error: 'server_error' });
  }
});

function generateReference(createdAt) {
   const datePart = createdAt.toISOString().split('T')[0].replace(/-/g, '');
   const randomPart = Math.floor(1000000000 + Math.random() * 9000000000);
   return `REF-${datePart}-${randomPart}`;
}

app.post('/api/submit-form', async (req, res) => {
  const form = req.body || {};
  const nid = Array.isArray(form.nidDigits) ? form.nidDigits.join('') : null;
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
    nid,
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
      nationality, family_record_number, national_id, phone, email, residence_expiry,
      census_card_number, ai_model, service_type
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19
    ) RETURNING id, created_at`;
  try {
    const result = await pool.query(query, values);
    const id = result.rows[0].id;
    const createdAt = result.rows[0].created_at;

    const referenceNumber = generateReference(createdAt);
    await pool.query('UPDATE personal_info SET reference_number=$1 WHERE id=$2', [referenceNumber, id]);
    logActivity(`DB_INSERT personal_info ${referenceNumber}`);
    logMessage(`DB_INSERT personal_info ${referenceNumber}`);

    if (form.addressInfo) {
      const a = form.addressInfo;
      await pool.query(
        'INSERT INTO address_info (personal_id, national_id, country, city, area, residential_address) VALUES ($1,$2,$3,$4,$5,$6)',
        [id, nid, a.country || null, a.city || null, a.area || null, a.residentialAddress || null]
      );
    }

    if (form.workInfo) {
      const w = form.workInfo;
      await pool.query(
        'INSERT INTO work_income_info (personal_id, national_id, employment_status, job_title, employer, employer_address, employer_phone, source_of_income, monthly_income) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
        [id, nid, w.employmentStatus || null, w.jobTitle || null, w.employer || null, w.employerAddress || null, w.employerPhone || null, w.sourceOfIncome || null, w.monthlyIncome || null]
      );
    }

    const cleanNid = nid && /^[0-9]{12}$/.test(nid) ? nid : null;
    const folder = cleanNid ||
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
      const docReference = generateReference(new Date());
      await pool.query(
        'INSERT INTO uploaded_documents (personal_id, national_id, doc_type, file_name, reference_number) VALUES ($1,$2,$3,$4,$5)',
        [id, nid, docType, newPath, docReference]
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

app.post('/api/gemini', async (req, res) => {
  try {
    const data = await callGemini(req.body || {});
    logActivity(`GEMINI_RESPONSE ${JSON.stringify(data)}`);
    res.json(data);
  } catch (e) {
    logError(`GEMINI_ERROR ${e.message}`);
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

app.get('/api/customer', async (req, res) => {
  const { reference, nid } = req.query;
  if (!reference && !nid) {
    return res.status(400).json({ error: 'missing_identifier' });
  }
  try {
    let personal;
    if (reference) {
      personal = await pool.query('SELECT * FROM personal_info WHERE reference_number=$1', [reference]);
    } else {
      personal = await pool.query('SELECT * FROM personal_info WHERE national_id=$1 ORDER BY created_at DESC LIMIT 1', [nid]);
    }
    if (personal.rows.length === 0) return res.status(404).json({ error: 'not_found' });
    const p = personal.rows[0];
    const address = await pool.query('SELECT * FROM address_info WHERE personal_id=$1 LIMIT 1', [p.id]);
    const work = await pool.query('SELECT * FROM work_income_info WHERE personal_id=$1 LIMIT 1', [p.id]);
    const docs = await pool.query('SELECT doc_type, file_name, reference_number, confirmed_by_admin FROM uploaded_documents WHERE personal_id=$1', [p.id]);
    res.json({
      personalInfo: p,
      addressInfo: address.rows[0] || null,
      workInfo: work.rows[0] || null,
      uploadedDocuments: docs.rows
    });
  } catch (e) {
    logError(`GET_CUSTOMER_ERROR ${e.message}`);
    res.status(500).json({ error: 'server_error' });
  }
});

// Update an uploaded document with a new file
app.post('/api/update-document/:reference', upload.single('file'), async (req, res) => {
  const ref = req.params.reference;
  if (!req.file) return res.status(400).json({ error: 'missing_file' });
  try {
    const existing = await pool.query('SELECT file_name FROM uploaded_documents WHERE reference_number=$1', [ref]);
    if (existing.rows.length === 0) return res.status(404).json({ error: 'not_found' });
    const oldPath = existing.rows[0].file_name;
    const dir = path.dirname(oldPath);
    const newPath = path.join(dir, path.basename(req.file.path));
    fs.renameSync(req.file.path, newPath);
    await pool.query('UPDATE uploaded_documents SET file_name=$1, confirmed_by_admin=FALSE WHERE reference_number=$2', [newPath, ref]);
    logActivity(`DOC_UPDATED ${ref}`);
    res.json({ path: newPath });
  } catch (e) {
    logError(`DOC_UPDATE_ERROR ${e.message}`);
    res.status(500).json({ error: 'server_error' });
  }
});

// Approve or unapprove an uploaded document
app.post('/api/approve-document', async (req, res) => {
  const { reference, approved } = req.body || {};
  if (!reference) return res.status(400).json({ error: 'missing_reference' });
  try {
    await pool.query('UPDATE uploaded_documents SET confirmed_by_admin=$1 WHERE reference_number=$2', [approved, reference]);
    logActivity(`DOC_APPROVE ${reference} ${approved}`);
    res.json({ success: true });
  } catch (e) {
    logError(`DOC_APPROVE_ERROR ${e.message}`);
    res.status(500).json({ error: 'server_error' });
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
