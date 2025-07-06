export async function cacheExtractedData(docType, data) {
  const resp = await fetch('/api/cache-extracted', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ docType, data }),
  });
  if (!resp.ok) {
    throw new Error('Cache failed');
  }
  return true;
}
