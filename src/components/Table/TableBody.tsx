import { useTable } from "./TableContext";
import Empty from "./Empty";
import TableRow from "./TableRow";
import { useEffect, useState } from "react";

export default function TableBody() {
  const {
    data,
    columns,
    keyProp,
    pageSize,
    currentPage,
    onDataChange,
    onValidityChange,
  } = useTable();

  const [validatyStatus, setValidityStatus] = useState(
    Array(data.length).fill(true)
  );

  useEffect(() => {
    onValidityChange?.(validatyStatus.every((valid) => valid));
  }, [validatyStatus]);

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
      {currentPageData.map((row, index) => (
        <TableRow
          key={row[keyProp]}
          row={row}
          onChange={(changedRow) => {
            const newData = data.map((r) =>
              r[keyProp] === changedRow[keyProp] ? changedRow : r
            );
            onDataChange?.(newData);
          }}
          onValidityChange={(valid) => {
            setValidityStatus((prev) => {
              const newStatus = [...prev];
              newStatus[index] = valid;
              return newStatus;
            });
          }}
          data={data.filter((r) => r[keyProp] !== row[keyProp])}
        />
      ))}
    </tbody>
  );
}
