import { useEffect, useState } from "react";
import RecordForm from "./components/RecordForm.jsx";
import RecordsTable from "./components/RecordsTable.jsx";
import {
  fetchRecords,
  createRecord,
  updateRecord,
  deleteRecord,
} from "./api/records.js";

export default function App() {
  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [apiOk, setApiOk] = useState(null);

  async function load() {
    try {
      const data = await fetchRecords();
      setRecords(data);
      setApiOk(true);
    } catch {
      setRecords([]);
      setApiOk(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(payload) {
    try {
      if (editingId) {
        await updateRecord(editingId, payload);
      } else {
        await createRecord(payload);
      }
      setEditingId(null);
      await load();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this record?")) return;
    try {
      await deleteRecord(id);
      if (editingId === id) setEditingId(null);
      await load();
    } catch (err) {
      alert(err.message);
    }
  }

  const editingRecord = records.find((r) => r._id === editingId) || null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-20">
      <div className="flex items-baseline justify-between border-b-2 border-ink pb-3.5 mb-1.5">
        <h1 className="text-2xl">CRUDX - MERN Based CRUD Application</h1>
        <div className="text-xs font-mono text-inksoft border border-inksoft px-2.5 py-1 rounded">
          {new Date().toLocaleDateString(undefined, {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>
      <p className="text-xs font-mono text-inksoft mb-1">
        CRUDX — create, read, update and delete candidate records
      </p>
      <p
        className={`text-[11.5px] font-mono mb-7 ${apiOk ? "text-tealdark" : "text-danger"}`}
      >
        {apiOk === null
          ? ""
          : apiOk
            ? "Connected to API at https://crud-x-l5is.onrender.com"
            : "Cannot reach backend — start the server first."}
      </p>

      <RecordForm
        editingRecord={editingRecord}
        onSubmit={handleSubmit}
        onCancel={() => setEditingId(null)}
      />

      <div className="bg-white border border-line rounded-lg p-7">
        <h2 className="text-base flex items-center gap-2 mb-5">
          <span className="text-[11px] font-mono bg-navy text-white px-2 py-0.5 rounded">
            03
          </span>
          Records
          <span className="text-[11px] font-mono bg-navy text-white px-2 py-0.5 rounded-full ml-1">
            {records.length}
          </span>
        </h2>
        <RecordsTable
          records={records}
          onEdit={setEditingId}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
