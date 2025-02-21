import { useTable } from "./TableContext";

type Props = {};

export default function TableSelection({}: Props) {
  const { selectedRows } = useTable();
  const selectedRowsArray = Object.entries(selectedRows)
    .filter(([_, value]) => value)
    .map(([key]) => key);
  return (
    <div className="ml-6">
      {selectedRowsArray.length > 0 && (
        <div className="flex">
          <div className="text-sm text-gray-500">
            {selectedRowsArray.length} rows selected
          </div>
        </div>
      )}
    </div>
  );
}
