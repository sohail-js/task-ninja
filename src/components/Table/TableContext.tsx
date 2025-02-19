import { createContext, useContext, useState } from "react";
import { Field } from "../../types";
import { TableProps } from "./Table";

interface TableContextProps extends TableProps {
  selectedRows: Record<string, boolean>;
  setSelectedRows: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  sortColumn: Field | null;
  setSortColumn: React.Dispatch<React.SetStateAction<Field | null>>;
  sortDirection: "asc" | "desc";
  setSortDirection: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  filter: Record<string, string | number | boolean>;
  setFilter: React.Dispatch<
    React.SetStateAction<Record<string, string | number | boolean>>
  >;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

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
  inlineEditable,
  disabledRowIds,
  actions,
  onActionClick,
  selectable,
  showFilters,
  allowSort,
  onRecordOpen,
  contextMenuOptions,
  onDataChange,
  onValidityChange,
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
  const [filter, setFilter] = useState<
    Record<string, string | number | boolean>
  >({}); // key: column key, value: filter value

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { filteredData } = useFilteredData({
    data,
    filter,
    sortColumn,
    sortDirection,
    columns,
  });
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>(
    filteredData.reduce((acc, row) => ({ ...acc, [row[keyProp]]: false }), {})
  );

  // Reset current page if the data changes and the current page is out of bounds.
  if (filteredData.length < pageSize * (currentPage - 1)) {
    setCurrentPage(1);
  }

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
        inlineEditable,
        disabledRowIds,
        actions,
        onActionClick,
        selectable,
        showFilters,
        allowSort,
        onDataChange,
        onValidityChange,
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
  columns,
}: {
  data: any[];
  filter: Record<string, string | number | boolean>;
  sortColumn?: Field | null;
  sortDirection?: "asc" | "desc";
  columns: Field[];
}) {
  const typeMap = columns.reduce((acc, column) => {
    acc[column.key] = column.type;
    return acc;
  }, {} as Record<string, string>);
  const filteredData = data.filter((record) =>
    Object.entries(filter).every(([key, value]) => {
      // If the filter value is an empty string, return true to include the record.
      if (value === "") {
        return true;
      }

      const type = typeMap[key];
      if (type === "checkbox") {
        return record[key] === value;
      }
      if (!record[key] && !value) {
        return true;
      }
      return record[key]
        ?.toLowerCase()
        .includes(typeof value == "string" ? value.toLowerCase() : value);
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
