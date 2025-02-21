import classNames from "classnames";
import { TableProvider } from "./TableContext";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { Field } from "../../types";
import TablePagination from "./TablePagination";

export type TableProps = {
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
  inlineEditable?: boolean;
  disabledRowIds?: string[];
  actions?: Array<{
    label: string | React.ReactNode;
    key: string;
  }>;
  onActionClick?: (action: string, record: any) => void;
  selectable?: boolean;
  showPagination?: boolean;
  showFilters?: boolean;
  allowSort?: boolean;
  onDataChange?: (data: any[]) => void;
  onValidityChange?: (valid: boolean) => void;
  newRowId?: string | number;
};

export default function Table({
  className,
  showPagination,
  ...props
}: TableProps) {
  return (
    <TableProvider {...props}>
      {/* <TableMeta /> */}
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
