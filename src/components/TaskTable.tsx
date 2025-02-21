import React from "react";
import { Table } from "./Table";
import { Column, Task } from "../types";
import { DEFAULT_COLUMNS } from "../constants";

type TaskTableProps = {
  data: Task[];
  customColumns: Column[];
  onTaskOpen: (record: Task) => void;
  onDataChange: (data: Task[]) => void;
  newRowId?: string | number;
  toolbar?: React.ReactNode;
};

const TaskTable: React.FC<TaskTableProps> = ({
  data,
  customColumns,
  newRowId,
  toolbar,
  onTaskOpen,
  onDataChange,
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
        onRecordOpen={onTaskOpen}
        onDataChange={onDataChange}
        newRowId={newRowId}
        toolbar={toolbar}
        showActions
        allowSort
        selectable
        showPagination
        showFilters
      />
    </div>
  );
};

export default TaskTable;
