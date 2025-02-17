import { createContext, useContext, useState } from "react";
import { Field } from "../../types";

type TableContextProps = {
  columns: Array<Field>;
  data: any[];
  keyProp: string;
  selectedRows: Record<string, boolean>;
  setSelectedRows: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  onRecordOpen?: (record: any) => void;
  contextMenuOptions?: Array<{
    label: string;
    icon: React.ReactNode;
    onClick: (record: any) => void;
  }>;
  sortColumn: Field | null;
  setSortColumn: React.Dispatch<React.SetStateAction<Field | null>>;
  sortDirection: "asc" | "desc";
  setSortDirection: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  filter: Record<string, string | boolean>;
  setFilter: React.Dispatch<
    React.SetStateAction<Record<string, string | boolean>>
  >;
};

const TableContext = createContext<TableContextProps | null>(null);

export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable must be used within a TableProvider");
  }
  return context;
};

export const TableProvider = ({
  children,
  columns,
  data,
  keyProp,
  onRecordOpen,
  contextMenuOptions,
}: Omit<
  TableContextProps,
  | "selectedRows"
  | "setSelectedRows"
  | "sortColumn"
  | "setSortColumn"
  | "sortDirection"
  | "setSortDirection"
  | "filter"
  | "setFilter"
> & {
  children: React.ReactNode;
}) => {
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>(
    data.reduce((acc, row) => ({ ...acc, [row[keyProp]]: false }), {})
  );

  const [sortColumn, setSortColumn] = useState<Field | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filter, setFilter] = useState<Record<string, string | boolean>>({}); // key: column key, value: filter value

  return (
    <TableContext.Provider
      value={{
        columns,
        data,
        keyProp,
        selectedRows,
        setSelectedRows,
        onRecordOpen,
        contextMenuOptions,
        sortColumn,
        setSortColumn,
        sortDirection,
        setSortDirection,
        filter,
        setFilter,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
