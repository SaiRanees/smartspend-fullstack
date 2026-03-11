// ─── API Base Configuration ────────────────────────────────────
// All frontend API calls point here.
// Change BASE_URL if backend runs on a different port/server.

export const BASE_URL = 'http://localhost:8080/api';

/**
 * Central fetch wrapper — handles errors uniformly.
 * Throws a clear error message on non-2xx responses.
 */
export const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!response.ok) {
    // Try to parse backend error message
    let errorMsg = `HTTP ${response.status}`;
    try {
      const err = await response.json();
      errorMsg = err.message || err.error || errorMsg;
    } catch { /* ignore parse error */ }
    throw new Error(errorMsg);
  }

  // 204 No Content — return null
  if (response.status === 204) return null;

  return response.json();
};
