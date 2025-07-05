export const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onloadend = () => resolve(reader.result.split(',')[1]);
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

const passportSchema = {
  type: 'OBJECT',
  properties: {
    fullNameArabic: { type: 'STRING' },
    firstNameEng: { type: 'STRING' },
    midNameEng: { type: 'STRING' },
    surnameEng: { type: 'STRING' },
    passportNo: { type: 'STRING' },
    dateOfBirth: { type: 'STRING' },
    placeOfBirth: { type: 'STRING' },
    dateOfIssue: { type: 'STRING' },
    issuingPlace: { type: 'STRING' },
    sex: { type: 'STRING' },
    nationality: { type: 'STRING' },
    expiryDate: { type: 'STRING' }
  }
};

const nidSchema = {
  type: 'OBJECT',
  properties: {
    nationalId: { type: 'STRING' },
    familyId: { type: 'STRING' },
    tripleName: { type: 'STRING' },
    surname: { type: 'STRING' },
    sex: { type: 'STRING' },
    birthYear: { type: 'STRING' }
  }
};

async function callGemini(payload) {
  const apiKey = '';
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  const resp = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
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

export async function extractPassportData(file) {
  const base64Data = await fileToBase64(file);
  const payload = {
    contents: [{
      parts: [
        { text: 'Extract the following fields from the passport image: Full Name (Arabic), First Name (English), Mid Name (English), Surname (English), Passport No, Date of Birth, Place of Birth, Date of Issue, Issuing Place, Sex, Nationality, and Expiry Date. Return the data in the specified JSON format.' },
        { inlineData: { mimeType: file.type || "image/png", data: base64Data } }
      ]
    }],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: passportSchema
    }
  };
  return callGemini(payload);
}

export async function extractNIDData(file) {
  const base64Data = await fileToBase64(file);
  const payload = {
    contents: [{
      parts: [
        { text: 'Extract the following fields from the NID document image: National ID (\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0648\u0637\u0646\u064a), Family Record Number (\u0631\u0642\u0645 \u0642\u064a\u062f \u0627\u0644\u0639\u0627\u0626\u0644\u0629), Triple Name (\u0627\u0644\u0627\u0633\u0645 \u062b\u0644\u0627\u062b\u064a), Surname (\u0627\u0644\u0644\u0642\u0628), Sex (\u0627\u0644\u062c\u0646\u0633), and Year of Birth (\u0633\u0646\u0629 \u0627\u0644\u0645\u064a\u0644\u0627\u062f). Return the data in the specified JSON format.' },
        { inlineData: { mimeType: file.type || "image/png", data: base64Data } }
      ]
    }],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: nidSchema
    }
  };
  return callGemini(payload);
}
