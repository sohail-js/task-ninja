import FormItemCheckbox from "../Form/FormItemCheckbox";
import { useTable } from "./TableContext";
import TableHeadColumn from "./TableHeadColumn";

export default function TableHead() {
  const { columns, data, keyProp, setSelectedRows, selectable, showActions } =
    useTable();

  const { allSelected, indeterminate } = useTableHead();

  return (
    <thead>
      <tr>
        {selectable && (
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
        )}
        {columns.map((column) => (
          <TableHeadColumn key={column.key} column={column} />
        ))}

        {showActions && (
          <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider bg-gray-50 dark:bg-gray-800 dark:text-gray-200">
            ACTIONS
          </th>
        )}
      </tr>
    </thead>
  );
}

function useTableHead() {
  const { selectedRows } = useTable();
  const selectedRowValues = Object.values(selectedRows);
  const allSelected =
    selectedRowValues.length > 0 && selectedRowValues.every((value) => value);
  const indeterminate =
    selectedRowValues.some((value) => value) &&
    selectedRowValues.some((value) => !value);
  return {
    allSelected,
    indeterminate,
  };
}
