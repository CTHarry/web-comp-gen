const API_BASE = "http://127.0.0.1:8000";

export async function suggestCopy(payload) {
  const res = await fetch(`${API_BASE}/suggest-copy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`API request failed: ${res.status}`);
  return await res.json();
}
