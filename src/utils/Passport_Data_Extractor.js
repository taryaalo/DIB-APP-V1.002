import Tesseract from 'tesseract.js';
import { parse } from 'mrz';

const formatMRZDate = (val) => {
  if (!val) return '';
  const year = val.slice(0, 2);
  const month = val.slice(2, 4);
  const day = val.slice(4, 6);
  return `20${year}-${month}-${day}`;
};

const normalizeDate = (val) => {
  const digits = val.replace(/[^0-9]/g, '');
  if (digits.length === 6) return `20${digits.slice(0,2)}-${digits.slice(2,4)}-${digits.slice(4,6)}`;
  if (digits.length === 8) {
    if (digits.startsWith('20')) return `${digits.slice(0,4)}-${digits.slice(4,6)}-${digits.slice(6,8)}`;
    return `${digits.slice(4,8)}-${digits.slice(2,4)}-${digits.slice(0,2)}`;
  }
  return '';
};

export const extractPassportData = async (file) => {
  if (!file) return null;
  try {
    const { data: { text } } = await Tesseract.recognize(file, 'ara+eng');
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const mrz = lines.slice(-2).join('');
    let fields = {};
    try {
      const result = parse(mrz);
      fields = result.fields;
    } catch {}
    const arabicLine = lines.find(l => /[\u0600-\u06FF]/.test(l)) || '';
    const issueMatch = text.match(/(?:issue|issuance)[^\d]*(\d{2,4}[\/-]\d{1,2}[\/-]\d{2,4})/i);
    const issueDate = issueMatch ? normalizeDate(issueMatch[1]) : '';
    return {
      documentType: 'Passport',
      passportNumber: fields.documentNumber || '',
      passportIssueDate: issueDate,
      passportExpiry: formatMRZDate(fields.expirationDate),
      fullName: arabicLine || `${fields.lastName?.replace(/</g,' ')} ${fields.firstName?.replace(/</g,' ')}`.trim(),
      firstNameEn: fields.firstName?.replace(/</g,' '),
      lastNameEn: fields.lastName?.replace(/</g,' '),
      dob: formatMRZDate(fields.birthDate)
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default extractPassportData;
