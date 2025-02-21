import { useEffect, useState, useRef } from "react";
import "./App.css";
import { DEFAULT_COLUMNS, LOCAL_STORAGE_KEYS } from "./constants";
import { getLocalStorage, setLocalStorage } from "./services/localStorage";
import { Field, RecordItem, HistoryItem } from "./types";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import Header from "./components/Header";
import TaskDrawer from "./components/TaskDrawer";
import TaskTable from "./components/TaskTable";

function TaskApp() {
  const [openTaskDrawer, setOpenTaskDrawer] = useState(false);
  const [newRowId, setNewRowId] = useState<string | number>();
  const { data: customColumns, setData: setCustomColumns } =
    useLocalStorageState<Field[]>({
      localStorageKey: LOCAL_STORAGE_KEYS.columns,
      defaultValue: DEFAULT_COLUMNS,
    });

  const [tasksData, setTasksData] = useState<RecordItem[]>(
    getLocalStorage(LOCAL_STORAGE_KEYS.tasks) ?? []
  );
  const [editData, setEditData] = useState<RecordItem>();

  const undoStack = useRef<HistoryItem[]>([]);
  const redoStack = useRef<HistoryItem[]>([]);

  useEffect(() => {
    console.log("Data changed");
    setLocalStorage(LOCAL_STORAGE_KEYS.tasks, tasksData);
  }, [tasksData]);

  const addTaskHandler = () => {
    setOpenTaskDrawer(true);
  };

  const closeDrawer = () => {
    setOpenTaskDrawer(false);
    setEditData(undefined);
  };

  const handleAddTask = (values: RecordItem) => {
    undoStack.current.push({
      data: [...tasksData],
      columns: [...customColumns],
    });
    if (editData) {
      setTasksData((prevData) => {
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
      setTasksData((prevData) => [
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
      redoStack.current.push({ data: tasksData, columns: customColumns });
      const stackItem = undoStack.current.pop();
      setTasksData(stackItem?.data!);
      setCustomColumns(stackItem?.columns!);
    }
  };

  const handleRedo = () => {
    if (redoStack.current.length > 0) {
      undoStack.current.push({ data: tasksData, columns: customColumns });
      const stackItem = redoStack.current.pop();
      setTasksData(stackItem?.data!);
      setCustomColumns(stackItem?.columns!);
    }
  };

  const handleColumnsChange = (columns: Field[]) => {
    undoStack.current.push({ columns: customColumns, data: tasksData });
    setCustomColumns(columns.filter((col) => col.editable));
  };

  return (
    <>
      <Header
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        addTaskHandler={addTaskHandler}
        undoDisabled={undoStack.current.length === 0}
        redoDisabled={redoStack.current.length === 0}
        customColumns={customColumns}
        handleColumnsChange={handleColumnsChange}
      />

      <TaskDrawer
        open={openTaskDrawer}
        closeDrawer={closeDrawer}
        handleAddTask={handleAddTask}
        editData={editData}
        customColumns={customColumns}
      />

      <TaskTable
        data={tasksData}
        customColumns={customColumns}
        setEditData={setEditData}
        setOpen={setOpenTaskDrawer}
        setData={setTasksData}
        undoStack={undoStack}
        newRowId={newRowId}
      />
    </>
  );
}

export default TaskApp;
