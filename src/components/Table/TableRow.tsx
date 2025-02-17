import { useTable } from "./TableContext";
import TableCheckbox from "./TableCheckbox";
import TableDropdown from "./TableDropdown";
import TableCell from "./TableCell";

export default function TableRow({ row }: { row: any }) {
  const { keyProp, columns } = useTable();

  return (
    <tr key={row[keyProp]} className="group">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center justify-center w-0.5">
        <TableDropdown row={row} />
        <TableCheckbox row={row} />
      </td>
      {columns.map((column) => (
        <TableCell key={column.key} row={row} columnKey={column.key} />
      ))}
    </tr>
  );
}
