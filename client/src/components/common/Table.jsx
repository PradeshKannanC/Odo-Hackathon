// Generic table shell - columns: [{ key, label, render? }], rows: array of data objects
const Table = ({ columns = [], rows = [], emptyMessage = "No data available" }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-border/10">
      <table className="min-w-full text-left text-sm text-text">
        <thead className="bg-border/5">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-medium text-text/70">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-text/50">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => (
              <tr key={row._id || rowIndex} className="border-t border-border/10">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
