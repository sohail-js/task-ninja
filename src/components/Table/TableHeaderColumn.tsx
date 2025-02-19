import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import { Field } from "../../types";
import FormItemText from "../Form/FormItemText";
import { useTable } from "./TableContext";
import FormItemCheckbox from "../Form/FormItemCheckbox";
import FormItemSelect from "../Form/FormItemSelect";

type Props = {
  column: Field;
};

export default function TableHeaderColumn({ column }: Props) {
  const {
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    showFilters,
    allowSort,
  } = useTable();
  return (
    <th
      key={column.key}
      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider bg-gray-50 dark:bg-gray-800 dark:text-gray-200"
    >
      <div
        className="flex items-center cursor-pointer"
        role="button"
        onClick={() => {
          if (!allowSort) return;
          if (sortColumn?.key === column.key) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
          } else {
            setSortColumn(column);
            setSortDirection("asc");
          }
        }}
      >
        <span>{column.label}</span>
        {allowSort && (
          <span
            className="ml-2"
            title={sortDirection === "asc" ? "Ascending" : "Descending"}
          >
            {sortColumn?.key === column.key &&
              (sortDirection === "asc" ? (
                <HiSortAscending />
              ) : (
                <HiSortDescending />
              ))}
          </span>
        )}
      </div>

      {showFilters && <TableFilter column={column} />}
    </th>
  );
}

const TableFilter = ({ column }: { column: Field }) => {
  const { filter, setFilter } = useTable();

  switch (column.type) {
    case "text":
      return (
        <FormItemText
          size="sm"
          field={{ ...column, label: "" }}
          className="mt-2"
          placeholder={`Filter ${column.label}`}
          onChange={(value) => {
            setFilter({ ...filter, [column.key]: value });
          }}
          value={(filter[column.key] as string) || ""}
        />
      );
    case "checkbox":
      return (
        <FormItemSelect
          size="sm"
          className="mt-2"
          field={{
            ...column,
            label: "",
            dropdownOptions: [
              {
                label: "true",
                value: "true",
              },
              {
                label: "false",
                value: "false",
              },
            ],
          }}
          showClear
          value={JSON.stringify(filter[column.key])}
          onChange={(value) => {
            setFilter({
              ...filter,
              [column.key]: value ? JSON.parse(value as string) : value,
            });
          }}
        />
      );

    case "dropdown":
      return (
        <FormItemSelect
          size="sm"
          className="mt-2"
          field={{ ...column, label: "" }}
          value={(filter[column.key] as string) || ""}
          onChange={(value) => {
            setFilter({ ...filter, [column.key]: value });
          }}
          showClear
        />
      );
  }
};
