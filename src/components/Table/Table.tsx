import classNames from "classnames";
import { TableProvider } from "./TableContext";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { Column } from "../../types";
import TablePagination from "./TablePagination";
import TableSelection from "./TableSelection";

export type TableProps<T = any> = {
  columns: Array<Column>;
  data: T[];
  keyProp: keyof T;
  className?: string;
  onRecordOpen?: (record: T) => void;
  inlineEditable?: boolean;
  // disables the complete row along with actions
  disabledRowIds?: string[];
  showActions?: boolean;
  selectable?: boolean;
  showPagination?: boolean;
  showFilters?: boolean;
  allowSort?: boolean;
  onDataChange?: (data: T[]) => void;
  onValidityChange?: (valid: boolean) => void;
  newRowId?: string | number;
  toolbar?: React.ReactNode;
};

export default function Table<T>({
  className,
  showPagination,
  toolbar,
  ...props
}: TableProps<T>) {
  return (
    <TableProvider {...props}>
      {/* <TableMeta /> */}
      <div className="flex justify-between items-center mb-2">
        <div className="left">
          <TableSelection />
        </div>
        <div className="right">{toolbar}</div>
      </div>
      <div className="w-full overflow-x-auto">
        <table
          className={classNames(
            "min-w-full w-full divide-y divide-gray-200",
            className
          )}
        >
          <TableHead />
          <TableBody />
        </table>
      </div>
      {showPagination && <TablePagination className="mt-4" />}
    </TableProvider>
  );
}

// function TableMeta() {
//   const { sortColumn, sortDirection, filter, selectedRows } = useTable();
//   return (
//     <div className="flex flex-col">
//       <div>sortColumn: {sortColumn?.label}</div>
//       <div>sortDirection: {sortDirection}</div>
//       <div>filter: {JSON.stringify(filter)}</div>
//       <div>
//         selected rows:{" "}
//         {Object.keys(selectedRows)
//           .filter((x) => selectedRows[x])
//           .join(", ")}
//       </div>
//     </div>
//   );
// }
