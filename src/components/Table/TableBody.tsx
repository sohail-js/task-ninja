import { useTable } from "./TableContext";
import Empty from "./Empty";
import TableRow from "./TableRow";
import { useEffect, useState } from "react";

export default function TableBody() {
  const { data, columns, keyProp, onDataChange, disabledRowIds } = useTable();

  const { setRowsValidityStatus, currentPageData } = useTableBodyState();

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
            setRowsValidityStatus((prev) => {
              const newStatus = [...prev];
              newStatus[index] = valid;
              return newStatus;
            });
          }}
          data={data.filter((r) => r[keyProp] !== row[keyProp])}
          disabled={disabledRowIds?.includes(row[keyProp])}
        />
      ))}
    </tbody>
  );
}

function useTableBodyState() {
  const { data, pageSize, currentPage, onValidityChange } = useTable();
  const [rowsValidityStatus, setRowsValidityStatus] = useState(
    Array(data.length).fill(true)
  );

  useEffect(() => {
    onValidityChange?.(rowsValidityStatus.every((valid) => valid));
  }, [rowsValidityStatus]);

  const currentPageData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return {
    setRowsValidityStatus,
    currentPageData,
  };
}
