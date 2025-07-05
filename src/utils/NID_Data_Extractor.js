import Tesseract from 'tesseract.js';

export const extractNIDData = async (file) => {
  if (!file) return null;
  try {
    const { data: { text } } = await Tesseract.recognize(file, 'ara+eng');
    const digits = text.replace(/\D/g, '').slice(-12);
    return { nidDigits: digits.split('') };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default extractNIDData;
