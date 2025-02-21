import React from "react";
import Drawer from "./Drawer";
import { Form } from "./Form";
import { Field, RecordItem } from "../types";
import { DEFAULT_COLUMNS } from "../constants";

type TaskDrawerProps = {
  open: boolean;
  closeDrawer: () => void;
  handleAddTask: (values: RecordItem) => void;
  editData?: RecordItem;
  customColumns: Field[];
};

const TaskDrawer: React.FC<TaskDrawerProps> = ({
  open,
  closeDrawer,
  handleAddTask,
  editData,
  customColumns,
}) => {
  return (
    <Drawer title="Create Task" isOpen={open} onClose={closeDrawer}>
      {open && (
        <Form
          fields={[...DEFAULT_COLUMNS, ...customColumns]}
          defaultValues={editData}
          onSubmit={handleAddTask as any}
          onCancel={closeDrawer}
        />
      )}
    </Drawer>
  );
};

export default TaskDrawer;
