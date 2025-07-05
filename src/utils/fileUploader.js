export async function uploadDocument(file, docType) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('docType', docType);

  const resp = await fetch('/api/cache-upload', {
    method: 'POST',
    body: formData,
  });

  if (!resp.ok) {
    throw new Error('Upload failed');
  }

  return true;
}
