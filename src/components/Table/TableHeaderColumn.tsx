import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import { Field } from "../../types";
import FormItemText from "../Form/FormItemText";
import { useTable } from "./TableContext";
import FormItemSelect from "../Form/FormItemSelect";
import classNames from "classnames";

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
      className={classNames(
        "px-3 py-2 text-left text-xs font-medium uppercase tracking-wider bg-gray-50 dark:bg-gray-800 dark:text-gray-200",
        column.tableColumnClassName
      )}
    >
      <div
        className={classNames("flex items-center", {
          "cursor-pointer": allowSort,
        })}
        title={allowSort ? "Click to sort" : undefined}
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
    case "number":
      return (
        <FormItemText
          size="sm"
          type={column.type}
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
