import { useTable } from "./TableContext";
import Button from "../Button";

type Props = {
  row: any;
  columnKey: string;
};

export default function TableCell({ row, columnKey }: Props) {
  const { onRecordOpen } = useTable();

  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm">
      {row[columnKey]}

      {columnKey === "title" && onRecordOpen && (
        <Button
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-100"
          mode="secondary"
          onClick={() => onRecordOpen(row)}
        >
          Open
        </Button>
      )}
    </td>
  );
}
