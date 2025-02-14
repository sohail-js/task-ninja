import classNames from "classnames";

type Props = {
  columns: Array<{
    key: string;
    title: string;
    type: "text" | "dropdown";
    dropdownOptions?: Array<{ value: string; label: string }>;
  }>;
  data: any[];
  keyProp: string;
  className?: string;
};

export default function Table({ columns, data, keyProp, className }: Props) {
  return (
    <table className={classNames("table-auto", className)}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={row[keyProp]}>
            {columns.map((column) => (
              <td key={column.key}>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
