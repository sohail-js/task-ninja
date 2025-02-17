import classNames from "classnames";
import { TableProvider } from "./TableContext";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { Field } from "../../types";

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
      <table
        className={classNames("min-w-full divide-y divide-gray-200", className)}
      >
        <TableHeader />
        <TableBody />
      </table>
    </TableProvider>
  );
}
