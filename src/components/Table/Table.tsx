import classNames from "classnames";
import { TableProvider, useTable } from "./TableContext";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { Field } from "../../types";
import TablePagination from "./TablePagination";

type Props = {
  columns: Array<Field>;
  data: any[];
  keyProp: string;
  className?: string;
  contextMenuOptions?: Array<{
    label: string;
    icon: React.ReactNode;
    onClick: (record: any) => void;
  }>;
  onRecordOpen?: (record: any) => void;
};

export default function Table({
  columns,
  data,
  keyProp,
  className,
  onRecordOpen,
  contextMenuOptions,
}: Props) {
  return (
    <TableProvider
      columns={columns}
      data={data}
      keyProp={keyProp}
      onRecordOpen={onRecordOpen}
      contextMenuOptions={contextMenuOptions}
    >
      <TableMeta />
      <table
        className={classNames("min-w-full divide-y divide-gray-200", className)}
      >
        <TableHeader />
        <TableBody />
      </table>
      <TablePagination className="mt-4" />
    </TableProvider>
  );
}

function TableMeta() {
  const { sortColumn, sortDirection, filter, selectedRows } = useTable();
  return (
    <div className="flex flex-col">
      <div>sortColumn: {sortColumn?.label}</div>
      <div>sortDirection: {sortDirection}</div>
      <div>filter: {JSON.stringify(filter)}</div>
      <div>
        selected rows:{" "}
        {Object.keys(selectedRows)
          .filter((x) => selectedRows[x])
          .join(", ")}
      </div>
    </div>
  );
}
