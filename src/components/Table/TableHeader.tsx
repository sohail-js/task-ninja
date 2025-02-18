import FormItemCheckbox from "../Form/FormItemCheckbox";
import { useTable } from "./TableContext";
import TableHeaderColumn from "./TableHeaderColumn";

export default function TableHeader() {
  const {
    columns,
    data,
    keyProp,
    selectedRows,
    setSelectedRows,
    selectable,
    actions,
  } = useTable();

  const selectedRowValues = Object.values(selectedRows);
  const allSelected =
    selectedRowValues.length > 0 && selectedRowValues.every((value) => value);
  const indeterminate =
    selectedRowValues.some((value) => value) &&
    selectedRowValues.some((value) => !value);

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
          <TableHeaderColumn key={column.key} column={column} />
        ))}

        {Boolean(actions?.length) && <th className="px-6 py-3"></th>}
      </tr>
    </thead>
  );
}
