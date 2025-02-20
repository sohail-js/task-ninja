import { useEffect, useState } from "react";
import { useTable } from "./TableContext";
import TableCheckbox from "./TableCheckbox";
import TableDropdown from "./TableDropdown";
import TableCell from "./TableCell";
import Button from "../Button";
import classNames from "classnames";

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
    actions,
    onActionClick,
    internalNewRowId,
    setInternalNewRowId,
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

  return (
    <tr
      key={row[keyProp]}
      className={classNames("transition-colors duration-1000 group", {
        "bg-yellow-300/40": highlight,
      })}
    >
      {selectable && (
        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium flex items-center justify-center w-0.5">
          <TableDropdown row={row} />
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

      {actions && (
        <td className="px-3 py-2 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex items-center gap-2">
            {actions.map((action) => (
              <Button
                key={action.key}
                mode="danger"
                size="sm"
                onClick={() => onActionClick?.(action.key, row)}
                disabled={disabled}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </td>
      )}
    </tr>
  );
}
