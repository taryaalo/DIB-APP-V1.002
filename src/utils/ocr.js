import Tesseract from 'tesseract.js';
import { parse } from 'mrz';

export async function extractTextFromImage(file, lang = 'eng') {
  if (!file) return '';
  const { data: { text } } = await Tesseract.recognize(file, lang);
  return text;
}

export async function extractPassportData(file) {
  const text = await extractTextFromImage(file, 'eng');
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
