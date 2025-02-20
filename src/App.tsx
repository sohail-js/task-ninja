import { useEffect, useState, useRef } from "react";
import "./App.css";
import Button from "./components/Button";
import Drawer from "./components/Drawer";
import { Table } from "./components/Table";
import { Form } from "./components/Form";
import { DEFAULT_COLUMNS, LOCAL_STORAGE_KEYS } from "./constants";
import { HiPlus, HiTrash } from "react-icons/hi2";
import { LuUndo, LuRedo } from "react-icons/lu";

import { getLocalStorage, setLocalStorage } from "./services/localStorage";
import ColumnsConfig from "./components/ColumnsConfig";
import { CustomField } from "./types";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

type RecordItem = {
  id: string | number;
  title: string;
  priority: string;
  status: string;
};

type HistoryItem = {
  data: RecordItem[];
  columns: CustomField[];
};

function App() {
  const [open, setOpen] = useState(false);
  const [newRowId, setNewRowId] = useState<string | number>();
  const { data: customColumns, setData: setCustomColumns } =
    useLocalStorageState<CustomField[]>({
      localStorageKey: LOCAL_STORAGE_KEYS.columns,
      defaultValue: DEFAULT_COLUMNS,
    });

  const [data, setData] = useState<RecordItem[]>(
    getLocalStorage(LOCAL_STORAGE_KEYS.tasks) ?? []
  );
  const [editData, setEditData] = useState<RecordItem>();

  const undoStack = useRef<HistoryItem[]>([]);
  const redoStack = useRef<HistoryItem[]>([]);

  useEffect(() => {
    console.log("Data changed");
    setLocalStorage(LOCAL_STORAGE_KEYS.tasks, data);
  }, [data]);

  const addTaskHandler = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
    setEditData(undefined);
  };

  const handleAddTask = (values: RecordItem) => {
    undoStack.current.push({
      data: [...data],
      columns: [...customColumns],
    });
    if (editData) {
      setData((prevData) => {
        const index = prevData.findIndex((item) => item.id === editData.id);
        prevData[index] = {
          ...values,
          id: editData.id,
        };
        return [...prevData];
      });
      setNewRowId(editData.id);
    } else {
      const id = crypto.randomUUID();
      setData((prevData) => [
        ...prevData,
        {
          ...values,
          id,
        },
      ]);
      setNewRowId(id);
    }
    closeDrawer();
  };

  const handleUndo = () => {
    if (undoStack.current.length > 0) {
      redoStack.current.push({ data, columns: customColumns });
      const stackItem = undoStack.current.pop();
      setData(stackItem?.data!);
      setCustomColumns(stackItem?.columns!);
    }
  };

  const handleRedo = () => {
    if (redoStack.current.length > 0) {
      undoStack.current.push({ data, columns: customColumns });
      const stackItem = redoStack.current.pop();
      setData(stackItem?.data!);
      setCustomColumns(stackItem?.columns!);
    }
  };

  const handleColumnsChange = (columns: CustomField[]) => {
    undoStack.current.push({ columns: customColumns, data });
    setCustomColumns(columns.filter((col) => col.editable));
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 pb-0.5">
        <h1 className="text-2xl font-bold">Task Ninja</h1>

        <div className="flex items-center gap-2">
          <Button
            mode="secondary"
            onClick={handleUndo}
            prefix={<LuUndo />}
            title="Undo"
            disabled={undoStack.current.length === 0}
          >
            <span className="hidden md:inline">Undo</span>
          </Button>

          <Button
            mode="secondary"
            onClick={handleRedo}
            prefix={<LuRedo />}
            title="Redo"
            disabled={redoStack.current.length === 0}
          >
            <span className="hidden md:inline">Redo</span>
          </Button>
          <ColumnsConfig
            columns={[...DEFAULT_COLUMNS, ...customColumns]}
            onColumnsChange={handleColumnsChange}
          />

          <Button
            mode="primary"
            onClick={addTaskHandler}
            prefix={<HiPlus />}
            title="Create Task"
          >
            <span className="hidden md:inline">Create Task</span>
          </Button>
        </div>
      </div>

      <Drawer title="Create Task" isOpen={open} onClose={closeDrawer}>
        {open && (
          <Form
            fields={[...DEFAULT_COLUMNS, ...customColumns]}
            defaultValues={editData}
            onSubmit={handleAddTask as any}
            onCancel={() => {
              closeDrawer();
            }}
          />
        )}
      </Drawer>

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
          contextMenuOptions={[
            {
              label: "Delete",
              onClick: (record) => {
                if (confirm("Are you sure you want to delete this record?")) {
                  undoStack.current.push({ data, columns: customColumns });
                  setData((prevData) =>
                    prevData.filter((item) => item.id !== record.id)
                  );
                }
              },
              icon: <HiTrash />,
            },
          ]}
          allowSort
          selectable
          showPagination
          showFilters
          newRowId={newRowId}
        />
      </div>
    </>
  );
}

export default App;
