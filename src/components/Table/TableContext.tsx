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
}: Omit<TableContextProps, "selectedRows" | "setSelectedRows"> & {
  children: React.ReactNode;
}) => {
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>(
    data.reduce((acc, row) => ({ ...acc, [row[keyProp]]: false }), {})
  );

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
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
