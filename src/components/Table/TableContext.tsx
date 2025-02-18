import { createContext, useContext, useEffect, useState } from "react";
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
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
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
  | "pageSize"
  | "setPageSize"
  | "currentPage"
  | "setCurrentPage"
> & {
  children: React.ReactNode;
}) => {
  const [sortColumn, setSortColumn] = useState<Field | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filter, setFilter] = useState<Record<string, string | boolean>>({}); // key: column key, value: filter value

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { filteredData } = useFilteredData({
    data,
    filter,
    sortColumn,
    sortDirection,
  });
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>(
    filteredData.reduce((acc, row) => ({ ...acc, [row[keyProp]]: false }), {})
  );

  // TODO: Reset selected rows when data changes.
  // useEffect(() => {
  //   setSelectedRows(
  //     filteredData.reduce((acc, row) => ({ ...acc, [row[keyProp]]: false }), {})
  //   );
  // }, [JSON.stringify(filteredData), keyProp]);

  return (
    <TableContext.Provider
      value={{
        columns,
        data: filteredData,
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
        pageSize,
        setPageSize,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

function useFilteredData({
  data,
  filter,
  sortColumn,
  sortDirection,
}: {
  data: any[];
  filter: Record<string, string | boolean>;
  sortColumn?: Field | null;
  sortDirection?: "asc" | "desc";
}) {
  const filteredData = data.filter((record) =>
    Object.entries(filter).every(([key, value]) => {
      if (typeof value === "boolean") {
        return record[key] === value;
      }
      return record[key].toLowerCase().includes(value.toLowerCase());
    })
  );

  if (sortColumn) {
    filteredData.sort((a, b) => {
      if (a[sortColumn.key] < b[sortColumn.key]) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (a[sortColumn.key] > b[sortColumn.key]) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  return { filteredData };
}
