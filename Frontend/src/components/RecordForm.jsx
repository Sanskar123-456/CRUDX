import { useEffect, useState } from "react";
import QualificationRow from "./QualificationRow.jsx";

const emptyQual = () => ({ qualification: "", year: "", marks: "" });
const emptyForm = () => ({
  name: "",
  age: "",
  gender: "",
  language: "",
  qualifications: [emptyQual()],
});

export default function RecordForm({ editingRecord, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingRecord) {
      setForm({
        name: editingRecord.name,
        age: editingRecord.age,
        gender: editingRecord.gender,
        language: editingRecord.language,
        qualifications: editingRecord.qualifications.map((q) => ({
          ...q,
          marks: String(q.marks),
        })),
      });
    } else {
      setForm(emptyForm());
    }
    setErrors({});
  }, [editingRecord]);

  function updateField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function updateQualRow(index, row) {
    setForm((f) => {
      const qualifications = [...f.qualifications];
      qualifications[index] = row;
      return { ...f, qualifications };
    });
  }

  function addQualRow() {
    setForm((f) => ({
      ...f,
      qualifications: [...f.qualifications, emptyQual()],
    }));
  }

  function removeQualRow(index) {
    setForm((f) => {
      if (f.qualifications.length === 1) return f;
      return {
        ...f,
        qualifications: f.qualifications.filter((_, i) => i !== index),
      };
    });
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.age || form.age <= 0 || form.age > 120)
      e.age = "Enter a valid age.";
    if (!form.gender) e.gender = "Select a gender.";
    if (!form.language) e.language = "Select a language.";
    const badQual = form.qualifications.some(
      (q) => !q.qualification || !q.year || q.marks === "",
    );
    if (badQual) e.qual = "Complete every field in each qualification row.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    onSubmit({
      name: form.name.trim(),
      age: Number(form.age),
      gender: form.gender,
      language: form.language,
      qualifications: form.qualifications.map((q) => ({
        ...q,
        marks: Number(q.marks),
      })),
    });
  }

  return (
    <div className="bg-white border border-line rounded-lg p-7 mb-8">
      {editingRecord && (
        <div className="text-xs font-mono text-amber bg-[#FAEEDA] border border-[#F0D9A8] px-3 py-1.5 rounded mb-4">
          Editing record{" "}
          <span className="font-semibold">{editingRecord._id.slice(-6)}</span> —
          submit to save changes, or cancel below.
        </div>
      )}

      <h2 className="text-base flex items-center gap-2 mb-5">
        <span className="text-[11px] font-mono bg-navy text-white px-2 py-0.5 rounded">
          01
        </span>
        Candidate details
      </h2>

      <div className="mb-4">
        <label className="block text-[11px] font-mono uppercase tracking-wide text-inksoft mb-1">
          Name
        </label>
        <input
          type="text"
          placeholder="Full name"
          className={`w-full px-2.5 py-2 text-sm border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy ${errors.name ? "border-danger" : "border-line"}`}
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
        />
        <p className="text-[11px] font-mono text-danger mt-1 min-h-[14px]">
          {errors.name}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-1">
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wide text-inksoft mb-1">
            Age
          </label>
          <input
            type="number"
            placeholder="Age in years"
            className={`w-full px-2.5 py-2 text-sm border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy ${errors.age ? "border-danger" : "border-line"}`}
            value={form.age}
            onChange={(e) => updateField("age", e.target.value)}
          />
          <p className="text-[11px] font-mono text-danger mt-1 min-h-[14px]">
            {errors.age}
          </p>
        </div>
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wide text-inksoft mb-1">
            Gender
          </label>
          <select
            className={`w-full px-2.5 py-2 text-sm border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy ${errors.gender ? "border-danger" : "border-line"}`}
            value={form.gender}
            onChange={(e) => updateField("gender", e.target.value)}
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <p className="text-[11px] font-mono text-danger mt-1 min-h-[14px]">
            {errors.gender}
          </p>
        </div>
      </div>

      <div className="mb-2 max-w-xs">
        <label className="block text-[11px] font-mono uppercase tracking-wide text-inksoft mb-1">
          Language
        </label>
        <select
          className={`w-full px-2.5 py-2 text-sm border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy ${errors.language ? "border-danger" : "border-line"}`}
          value={form.language}
          onChange={(e) => updateField("language", e.target.value)}
        >
          <option value="">Select</option>
          <option>English</option>
          <option>Hindi</option>
          <option>Other</option>
        </select>
        <p className="text-[11px] font-mono text-danger mt-1 min-h-[14px]">
          {errors.language}
        </p>
      </div>

      <h2 className="text-base flex items-center gap-2 mt-6 mb-5">
        <span className="text-[11px] font-mono bg-navy text-white px-2 py-0.5 rounded">
          02
        </span>
        Qualifications
      </h2>

      <div className="grid grid-cols-[1fr_1fr_1fr_40px] gap-3 text-[11px] font-mono uppercase tracking-wide text-inksoft mb-1.5">
        <span>Qualification</span>
        <span>Passing year</span>
        <span>Marks (%)</span>
        <span></span>
      </div>

      {form.qualifications.map((row, i) => (
        <QualificationRow
          key={i}
          row={row}
          onChange={(r) => updateQualRow(i, r)}
          onRemove={() => removeQualRow(i)}
          canRemove={form.qualifications.length > 1}
        />
      ))}

      <button
        type="button"
        onClick={addQualRow}
        className="inline-flex items-center gap-1.5 border border-dashed border-teal text-tealdark font-mono text-xs px-3.5 py-2 rounded-md hover:bg-teal/10"
      >
        + Add qualification row
      </button>
      <p className="text-[11px] font-mono text-danger mt-1 min-h-[14px]">
        {errors.qual}
      </p>

      <div className="flex justify-end gap-2.5 mt-5 pt-4 border-t border-line">
        <button
          type="button"
          onClick={onCancel}
          className="border border-line text-inksoft px-5 py-2.5 rounded-md hover:bg-black/5"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-navy text-white px-6 py-2.5 rounded-md hover:bg-navydark"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
