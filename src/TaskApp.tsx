import { useState, useRef } from "react";
import "./App.css";
import { LOCAL_STORAGE_KEYS } from "./constants";
import { Column, Task, HistoryItem } from "./types";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import Header from "./components/Header";
import TaskDrawer from "./components/TaskDrawer";
import TaskTable from "./components/TaskTable";

function TaskApp() {
  const {
    isTaskDrawerOpen,
    newRowId,
    customColumns,
    tasksData,
    currentTaskEditData,
    undoStack,
    redoStack,
    handleAddTaskClick,
    handleDrawerClose,
    handleTaskSave,
    handleUndo,
    handleRedo,
    handleColumnsChange,
    setCurrentTaskEditData,
    setIsTaskDrawerOpen,
    setTasksData,
  } = useTaskManager();

  return (
    <>
      <h1 className="text-2xl font-bold m-4">Task Ninja</h1>
      <TaskDrawer
        isOpen={isTaskDrawerOpen}
        onDrawerClose={handleDrawerClose}
        onTaskSave={handleTaskSave}
        editData={currentTaskEditData}
        customColumns={customColumns}
      />

      <TaskTable
        data={tasksData}
        customColumns={customColumns}
        setEditData={setCurrentTaskEditData}
        setOpen={setIsTaskDrawerOpen}
        setData={setTasksData}
        undoStack={undoStack}
        newRowId={newRowId}
        toolbar={
          <Header
            onUndo={handleUndo}
            onRedo={handleRedo}
            onAddTaskClick={handleAddTaskClick}
            undoDisabled={undoStack.current.length === 0}
            redoDisabled={redoStack.current.length === 0}
            customColumns={customColumns}
            handleColumnsChange={handleColumnsChange}
          />
        }
      />
    </>
  );
}

export default TaskApp;

function useTaskManager() {
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);

  // to highlight the newly added row
  const [newRowId, setNewRowId] = useState<string | number>();
  const [currentTaskEditData, setCurrentTaskEditData] = useState<Task>();

  const { data: customColumns, setData: setCustomColumns } =
    useLocalStorageState<Column[]>({
      localStorageKey: LOCAL_STORAGE_KEYS.columns,
      defaultValue: [],
    });

  const { data: tasksData, setData: setTasksData } = useLocalStorageState<
    Task[]
  >({
    localStorageKey: LOCAL_STORAGE_KEYS.tasks,
    defaultValue: [],
  });

  const undoStack = useRef<HistoryItem[]>([]);
  const redoStack = useRef<HistoryItem[]>([]);

  const handleAddTaskClick = () => {
    setIsTaskDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsTaskDrawerOpen(false);
    setCurrentTaskEditData(undefined);
  };

  const handleTaskSave = (values: Task) => {
    undoStack.current.push({
      tasks: [...tasksData],
      columns: [...customColumns],
    });

    // if edit mode
    if (currentTaskEditData) {
      setTasksData((prevData) => {
        const index = prevData.findIndex(
          (item) => item.id === currentTaskEditData.id
        );
        prevData[index] = {
          ...values,
          id: currentTaskEditData.id,
        };
        return [...prevData];
      });
      setNewRowId(currentTaskEditData.id);
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
    handleDrawerClose();
  };

  const handleUndo = () => {
    if (undoStack.current.length > 0) {
      redoStack.current.push({ tasks: tasksData, columns: customColumns });

      const stackItem = undoStack.current.pop();
      setTasksData(stackItem?.tasks!);
      setCustomColumns(stackItem?.columns!);
    }
  };

  const handleRedo = () => {
    if (redoStack.current.length > 0) {
      undoStack.current.push({ tasks: tasksData, columns: customColumns });

      const stackItem = redoStack.current.pop();
      setTasksData(stackItem?.tasks!);
      setCustomColumns(stackItem?.columns!);
    }
  };

  const handleColumnsChange = (columns: Column[]) => {
    undoStack.current.push({ columns: customColumns, tasks: tasksData });

    // editable true will be set on custom columns and we only need to save those columns in local storage
    setCustomColumns(columns.filter((col) => col.editable));
  };

  return {
    isTaskDrawerOpen,
    newRowId,
    customColumns,
    tasksData,
    currentTaskEditData,
    undoStack,
    redoStack,
    handleAddTaskClick,
    handleDrawerClose,
    handleTaskSave,
    handleUndo,
    handleRedo,
    handleColumnsChange,
    setCurrentTaskEditData,
    setIsTaskDrawerOpen,
    setTasksData,
  };
}
