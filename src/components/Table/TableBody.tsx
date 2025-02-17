import { useTable } from "./TableContext";
import Empty from "./Empty";
import TableRow from "./TableRow";

export default function TableBody() {
  const { data, columns, keyProp } = useTable();

  return (
    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
      {data.length === 0 && (
        <tr>
          <td colSpan={columns.length + 1}>
            <Empty />
          </td>
        </tr>
      )}
      {data.map((row) => (
        <TableRow key={row[keyProp]} row={row} />
      ))}
    </tbody>
  );
}
