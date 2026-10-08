const API_BASE = "http://localhost:5000/api/records";

export async function fetchRecords() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch records");
  return res.json();
}

export async function createRecord(payload) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Create failed");
  return res.json();
}

export async function updateRecord(id, payload) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Update failed");
  return res.json();
}

export async function deleteRecord(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error((await res.json()).message || "Delete failed");
  return res.json();
}
