import { useTable } from "./TableContext";
import Empty from "./Empty";
import TableRow from "./TableRow";

export default function TableBody() {
  const { data, columns, keyProp, pageSize, currentPage, onDataChange } =
    useTable();

  const currentPageData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
      {data.length === 0 && (
        <tr>
          <td colSpan={columns.length + 1}>
            <Empty />
          </td>
        </tr>
      )}
      {currentPageData.map((row) => (
        <TableRow
          key={row[keyProp]}
          row={row}
          onChange={(changedRow) => {
            const newData = data.map((r) =>
              r[keyProp] === changedRow[keyProp] ? changedRow : r
            );
            onDataChange?.(newData);
          }}
        />
      ))}
    </tbody>
  );
}
