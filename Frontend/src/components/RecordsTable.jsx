export default function RecordsTable({ records, onEdit, onDelete }) {
  if (records.length === 0) {
    return (
      <div className="text-center py-9 text-inksoft font-mono text-xs">
        No records yet. Submit the form above to create one.
      </div>
    );
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr>
          {[
            "ID",
            "Name",
            "Age",
            "Gender",
            "Language",
            "Qualifications",
            "",
          ].map((h) => (
            <th
              key={h}
              className="text-left text-[10.5px] font-mono uppercase tracking-wide text-inksoft border-b-2 border-ink py-2 px-2"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {records.map((r) => (
          <tr key={r._id} className="hover:bg-black/[0.02]">
            <td className="py-2.5 px-2 border-b border-line font-mono text-[10.5px] text-inksoft align-top">
              {r._id.slice(-6)}
            </td>
            <td className="py-2.5 px-2 border-b border-line align-top">
              {r.name}
            </td>
            <td className="py-2.5 px-2 border-b border-line align-top">
              {r.age}
            </td>
            <td className="py-2.5 px-2 border-b border-line align-top">
              {r.gender}
            </td>
            <td className="py-2.5 px-2 border-b border-line align-top">
              {r.language}
            </td>
            <td className="py-2.5 px-2 border-b border-line align-top">
              {r.qualifications.map((q, i) => (
                <span
                  key={i}
                  className="inline-block text-[11.5px] bg-teal/10 text-tealdark px-2 py-0.5 rounded-full mr-1 mb-1"
                >
                  {q.qualification} · {q.year} · {q.marks}%
                </span>
              ))}
            </td>
            <td className="py-2.5 px-2 border-b border-line align-top whitespace-nowrap">
              <button
                onClick={() => onEdit(r._id)}
                className="font-mono text-xs text-navy px-2 py-1 rounded hover:bg-navy/10"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(r._id)}
                className="font-mono text-xs text-danger px-2 py-1 rounded hover:bg-dangerbg"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
