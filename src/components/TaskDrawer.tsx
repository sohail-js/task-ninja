import React from "react";
import Drawer from "./Drawer";
import { Form } from "./Form";
import { Column, Task } from "../types";
import { DEFAULT_COLUMNS } from "../constants";

type TaskDrawerProps = {
  open: boolean;
  onDrawerClose: () => void;
  onSaveTask: (values: Task) => void;
  editData?: Task;
  customColumns: Column[];
};

const TaskDrawer: React.FC<TaskDrawerProps> = ({
  open,
  onDrawerClose,
  onSaveTask,
  editData,
  customColumns,
}) => {
  return (
    <Drawer
      title={editData ? "Edit Task" : "Create Task"}
      isOpen={open}
      onClose={onDrawerClose}
    >
      {open && (
        <Form
          fields={[...DEFAULT_COLUMNS, ...customColumns]}
          defaultValues={editData}
          onSubmit={onSaveTask as any}
          onCancel={onDrawerClose}
        />
      )}
    </Drawer>
  );
};

export default TaskDrawer;
