import { createContext, useContext, useEffect, useState } from "react";
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
  internalNewRowId: string | number;
  setInternalNewRowId: React.Dispatch<React.SetStateAction<string | number>>;
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
  onDataChange,
  onValidityChange,
  newRowId,
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
  | "internalNewRowId"
  | "setInternalNewRowId"
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
  // This state is used to highlight the newly added row.
  const [internalNewRowId, setInternalNewRowId] = useState<string | number>("");

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

  useEffect(() => {
    if (newRowId) {
      setInternalNewRowId(newRowId);
    }
  }, [newRowId]);

  useEffect(() => {
    if (internalNewRowId) {
      const rowNumber = filteredData.findIndex(
        (row) => row[keyProp] === internalNewRowId
      );
      const pageNumber = Math.ceil((rowNumber + 1) / pageSize);

      pageNumber > 0 && setCurrentPage(pageNumber);
    }
  }, [internalNewRowId]);

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
        internalNewRowId,
        setInternalNewRowId,
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
      if (type === "number") {
        return record[key] === Number(value);
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
      const type = sortColumn.type;
      if (type === "text") {
        const compare = a[sortColumn.key].localeCompare(b[sortColumn.key]);
        return sortDirection === "asc" ? compare : -compare;
      }
      if (type === "dropdown") {
        const compare = a[sortColumn.key].localeCompare(b[sortColumn.key]);
        return sortDirection === "asc" ? compare : -compare;
      }

      const aValue = a[sortColumn.key] ?? Number.MIN_SAFE_INTEGER;
      const bValue = b[sortColumn.key] ?? Number.MIN_SAFE_INTEGER;

      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  return { filteredData };
}
