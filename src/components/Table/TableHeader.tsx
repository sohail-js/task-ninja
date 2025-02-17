import FormItemCheckbox from "../Form/FormItemCheckbox";
import { useTable } from "./TableContext";

export default function TableHeader() {
  const { columns, data, keyProp, selectedRows, setSelectedRows } = useTable();

  const selectedRowValues = Object.values(selectedRows);
  const allSelected =
    selectedRowValues.length > 0 && selectedRowValues.every((value) => value);
  const indeterminate =
    selectedRowValues.some((value) => value) &&
    selectedRowValues.some((value) => !value);

  return (
    <thead>
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-0.5">
          <FormItemCheckbox
            field={{ type: "checkbox", label: "", key: "checkbox" }}
            value={allSelected}
            indeterminate={indeterminate}
            onChange={(value) => {
              setSelectedRows(
                data.reduce(
                  (acc, row) => ({ ...acc, [row[keyProp]]: value }),
                  {}
                )
              );
            }}
          />
        </th>
        {columns.map((column) => (
          <th
            key={column.key}
            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider bg-gray-50 dark:bg-gray-800 dark:text-gray-200"
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
