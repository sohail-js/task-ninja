import { useEffect, useState } from "react";
import { useTable } from "./TableContext";
import TableCheckbox from "./TableCheckbox";
import TableCell from "./TableCell";
import Button from "../Button";
import classNames from "classnames";
import { HiTrash } from "react-icons/hi2";

export default function TableRow({
  row,
  onChange,
  onValidityChange,
  data,
  disabled,
}: {
  row: any;
  onChange: (value: any) => void;
  onValidityChange?: (valid: boolean) => void;
  data?: any[];
  disabled?: boolean;
}) {
  const {
    keyProp,
    columns,
    selectable,
    internalNewRowId,
    setInternalNewRowId,
    showActions,
    data: tableData,
    onDataChange,
  } = useTable();
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    // Highlight the newly added row
    if (internalNewRowId === row[keyProp]) {
      setHighlight(true);
      const timer = setTimeout(() => {
        setHighlight(false);
        setInternalNewRowId("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [internalNewRowId]);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this record?")) {
      onDataChange?.(tableData.filter((r) => r[keyProp] !== row[keyProp]));
    }
  };

  return (
    <tr
      key={row[keyProp]}
      className={classNames("transition-colors duration-1000 group", {
        "bg-yellow-300/40": highlight,
      })}
    >
      {selectable && (
        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium flex items-center justify-center">
          <TableCheckbox row={row} />
        </td>
      )}
      {columns.map((column) => (
        <TableCell
          key={column.key}
          row={row}
          column={column}
          onChange={(data) => {
            onChange(data);
          }}
          onValidityChange={(valid) => {
            onValidityChange?.(valid);
          }}
          data={data}
          disabled={disabled}
        />
      ))}

      {showActions && (
        <td className="px-3 py-2 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex items-center gap-2">
            <Button
              key="delete"
              mode="danger"
              size="sm"
              onClick={handleDelete}
              disabled={disabled}
              prefix={<HiTrash />}
            />
          </div>
        </td>
      )}
    </tr>
  );
}
