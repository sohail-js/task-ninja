import classNames from "classnames";
import { TableProvider } from "./TableContext";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { Field, MenuItem } from "../../types";
import TablePagination from "./TablePagination";
import TableSelection from "./TableSelection";

export type TableProps = {
  columns: Array<Field>;
  data: any[];
  keyProp: string;
  className?: string;
  onRecordOpen?: (record: any) => void;
  inlineEditable?: boolean;
  disabledRowIds?: string[];
  actions?: Array<MenuItem>;
  onActionClick?: (action: string, record: any) => void;
  selectable?: boolean;
  showPagination?: boolean;
  showFilters?: boolean;
  allowSort?: boolean;
  onDataChange?: (data: any[]) => void;
  onValidityChange?: (valid: boolean) => void;
  newRowId?: string | number;
  toolbar?: React.ReactNode;
};

export default function Table({
  className,
  showPagination,
  toolbar,
  ...props
}: TableProps) {
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
          <TableHeader />
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
