import { useTable } from "./TableContext";
import TableCheckbox from "./TableCheckbox";
import TableDropdown from "./TableDropdown";
import TableCell from "./TableCell";
import Button from "../Button";

export default function TableRow({ row }: { row: any }) {
  const { keyProp, columns, selectable, actions, onActionClick } = useTable();

  return (
    <tr key={row[keyProp]} className="group">
      {selectable && (
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center justify-center w-0.5">
          <TableDropdown row={row} />
          <TableCheckbox row={row} />
        </td>
      )}
      {columns.map((column) => (
        <TableCell key={column.key} row={row} columnKey={column.key} />
      ))}

      {actions && (
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex items-center gap-2">
            {actions.map((action) => (
              <Button
                key={action.key}
                mode="danger"
                size="sm"
                onClick={() => onActionClick?.(action.key, row)}
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
