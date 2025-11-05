// utils/apiClient.js
export async function apiRequest(url, method = 'GET', body) {
  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch (err) {
    throw err;
  }
}
