import React from "react";
import { Table } from "./Table";
import { Field, HistoryItem, RecordItem } from "../types";
import { DEFAULT_COLUMNS } from "../constants";

type TaskTableProps = {
  data: RecordItem[];
  customColumns: Field[];
  setEditData: (record: RecordItem) => void;
  setOpen: (open: boolean) => void;
  setData: React.Dispatch<React.SetStateAction<RecordItem[]>>;
  undoStack: React.MutableRefObject<HistoryItem[]>;
  newRowId?: string | number;
  toolbar?: React.ReactNode;
};

const TaskTable: React.FC<TaskTableProps> = ({
  data,
  customColumns,
  setEditData,
  setOpen,
  setData,
  undoStack,
  newRowId,
  toolbar,
}) => {
  return (
    <div className="w-full p-4">
      <Table
        columns={[
          ...DEFAULT_COLUMNS,
          ...customColumns.filter((col) => col.visible),
        ]}
        keyProp="id"
        data={data}
        onRecordOpen={(record) => {
          setEditData(record);
          setOpen(true);
        }}
        showActions
        onDataChange={(newData) => {
          undoStack.current.push({ data, columns: customColumns });
          setData(newData);
        }}
        allowSort
        selectable
        showPagination
        showFilters
        newRowId={newRowId}
        toolbar={toolbar}
      />
    </div>
  );
};

export default TaskTable;
