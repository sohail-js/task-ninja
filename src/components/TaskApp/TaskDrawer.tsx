import React from "react";
import Drawer from "../Drawer";
import { Form } from "../Form";
import { Column, Task } from "../../types";
import { DEFAULT_COLUMNS } from "../../constants";

type TaskDrawerProps = {
  isOpen: boolean;
  onDrawerClose: () => void;
  onTaskSave: (values: Task) => void;
  editData?: Task;
  customColumns: Column[];
};

const TaskDrawer: React.FC<TaskDrawerProps> = ({
  isOpen,
  onDrawerClose,
  onTaskSave: onSaveTask,
  editData,
  customColumns,
}) => {
  return (
    <Drawer
      title={editData ? "Edit Task" : "Create Task"}
      isOpen={isOpen}
      onClose={onDrawerClose}
    >
      {isOpen && (
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
