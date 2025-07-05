import Tesseract from 'tesseract.js';
import { parse } from 'mrz';

export async function extractTextFromImage(file, lang = 'eng', onProgress) {
  if (!file) return '';
  const { data: { text } } = await Tesseract.recognize(file, lang, {
    logger: m => {
      if (m.status === 'recognizing text' && onProgress) {
        onProgress(m.progress);
      }
    }
  });
  return text;
}

export async function extractPassportData(file, onProgress) {
  const text = await extractTextFromImage(file, 'eng', onProgress);
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
    console.error(err);
    return null;
  }
  const fields = result.fields;
  const formatDate = val => {
    if (!val) return '';
    const year = val.slice(0, 2);
    const month = val.slice(2, 4);
    const day = val.slice(4, 6);
    return `20${year}-${month}-${day}`;
  };
  return {
    documentType: 'Passport',
    fullName: `${fields.lastName.replace(/</g, ' ')} ${fields.firstName.replace(/</g, ' ')}`.trim(),
    firstNameEn: fields.firstName.replace(/</g, ' '),
    lastNameEn: fields.lastName.replace(/</g, ' '),
    dob: formatDate(fields.dateOfBirth),
    passportExpiry: formatDate(fields.expirationDate)
  };
}

export function uploadPassport(file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload');
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch (err) {
          reject(err);
        }
      } else {
        reject(new Error('Upload failed'));
      }
    };
    xhr.onerror = () => reject(new Error('Network error'));
    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = e => {
        if (e.lengthComputable) {
          onProgress(e.loaded / e.total);
        }
      };
    }
    const formData = new FormData();
    formData.append('file', file);
    xhr.send(formData);
  });
}
