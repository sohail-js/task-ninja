type Props = {
  columns: Array<{
    key: string;
    title: string;
    type: "text" | "dropdown";
    dropdownOptions?: Array<{ value: string; label: string }>;
  }>;
  data: any[];
};

export default function Table({ columns, data }: Props) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((column) => (
              <td key={column.key}>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
