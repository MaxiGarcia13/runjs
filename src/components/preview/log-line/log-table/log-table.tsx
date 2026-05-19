interface LogTableProps {
  columns: string[];
  rows: string[][];
}

export function LogTable({ columns, rows }: LogTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-md bg-surface/30">
      <table className="w-full border-collapse text-foreground">
        <thead>
          <tr className="border-b border-border">
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="px-2 py-1 text-left font-medium text-muted"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-border/50 last:border-b-0"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-2 py-1 whitespace-pre-wrap"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
