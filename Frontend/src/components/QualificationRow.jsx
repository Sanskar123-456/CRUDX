const QUAL_OPTIONS = [
  "",
  "High School",
  "Diploma",
  "Bachelor's",
  "Master's",
  "PhD",
];
const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = [
  "",
  ...Array.from({ length: 41 }, (_, i) => String(currentYear - i)),
];

export default function QualificationRow({
  row,
  onChange,
  onRemove,
  canRemove,
}) {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_40px] gap-3 items-start mb-3">
      <select
        className="w-full px-2.5 py-2 text-sm border border-line rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
        value={row.qualification}
        onChange={(e) => onChange({ ...row, qualification: e.target.value })}
      >
        {QUAL_OPTIONS.map((o) => (
          <option key={o} value={o}>
            {o === "" ? "Select" : o}
          </option>
        ))}
      </select>

      <select
        className="w-full px-2.5 py-2 text-sm border border-line rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
        value={row.year}
        onChange={(e) => onChange({ ...row, year: e.target.value })}
      >
        {YEAR_OPTIONS.map((y) => (
          <option key={y} value={y}>
            {y === "" ? "Select" : y}
          </option>
        ))}
      </select>

      <input
        type="number"
        min="0"
        max="100"
        placeholder="e.g. 78"
        className="w-full px-2.5 py-2 text-sm border border-line rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
        value={row.marks}
        onChange={(e) => onChange({ ...row, marks: e.target.value })}
      />

      <button
        type="button"
        title="Remove this row"
        onClick={onRemove}
        disabled={!canRemove}
        className="w-9 h-9 rounded-full border border-line bg-white text-danger flex items-center justify-center hover:bg-dangerbg disabled:opacity-40 disabled:cursor-not-allowed"
      >
        −
      </button>
    </div>
  );
}
