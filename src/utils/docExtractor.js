import { t } from '../i18n';

// Convert a file to base64 string
const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onloadend = () => resolve(reader.result.split(',')[1]);
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

const passportSchema = {
  type: 'OBJECT',
  properties: {
    fullNameArabic: { type: 'STRING' },
    givenNameEng: { type: 'STRING' },
    surnameEng: { type: 'STRING' },
    passportNo: { type: 'STRING' },
    dateOfBirth: { type: 'STRING' },
    placeOfBirth: { type: 'STRING' },
    dateOfIssue: { type: 'STRING' },
    issuingPlace: { type: 'STRING' },
    sex: { type: 'STRING' },
    nationality: { type: 'STRING' },
    expiryDate: { type: 'STRING' },
  },
};

const genericSchema = { type: 'OBJECT' };

const DOC_CONFIGS = {
  passport: {
    instruction: `Extract the following fields from the passport image: ${Object.keys(passportSchema.properties).join(', ')}. Return the data in the specified JSON format.`,
    schema: passportSchema,
  },
  nationalId: {
    instruction: 'Extract any readable fields from the National ID image in JSON format.',
    schema: genericSchema,
  },
  letter: {
    instruction: 'Extract any structured data from this letter image in JSON format.',
    schema: genericSchema,
  },
  photo: {
    instruction: 'Describe the person in the photo in JSON format with a single field "description".',
    schema: { type: 'OBJECT', properties: { description: { type: 'STRING' } } },
  },
};

async function callGemini(payload) {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const resp = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const result = await resp.json();
  if (result.candidates && result.candidates[0].content.parts[0].text) {
    try {
      return JSON.parse(result.candidates[0].content.parts[0].text);
    } catch {
      return null;
    }
  }
  return null;
}

async function callChatGPT(prompt, base64Data, mimeType) {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OpenAI API key');
  }
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

  if (!resp.ok) {
    throw new Error(`OpenAI request failed: ${resp.status}`);
  }

  const result = await resp.json();
  if (result.choices && result.choices[0].message && result.choices[0].message.content) {
    try {
      return JSON.parse(result.choices[0].message.content);
    } catch {
      return null;
    }
  }
  return null;
}

export async function extractDocumentData(file, docType, provider = 'gemini') {
  const config = DOC_CONFIGS[docType] || DOC_CONFIGS.passport;
  const base64Data = await fileToBase64(file);
  if (provider === 'chatgpt') {
    return callChatGPT(config.instruction, base64Data, file.type || 'image/png');
  }
  const payload = {
    contents: [{
      parts: [
        { text: config.instruction },
        { inlineData: { mimeType: file.type || 'image/png', data: base64Data } },
      ],
    }],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: config.schema,
    },
  };
  return callGemini(payload);
}
