import React from "react";
import { Table } from "./Table";
import { HiTrash } from "react-icons/hi2";
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
};

const TaskTable: React.FC<TaskTableProps> = ({
  data,
  customColumns,
  setEditData,
  setOpen,
  setData,
  undoStack,
  newRowId,
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
        actions={[
          {
            label: "",
            value: "delete",
            icon: <HiTrash />,
            mode: "danger",
          },
        ]}
        onActionClick={(action, record) => {
          if (action === "delete") {
            if (confirm("Are you sure you want to delete this record?")) {
              undoStack.current.push({ data, columns: customColumns });
              setData((prevData) =>
                prevData.filter((item) => item.id !== record.id)
              );
            }
          }
        }}
        allowSort
        selectable
        showPagination
        showFilters
        newRowId={newRowId}
      />
    </div>
  );
};

export default TaskTable;
