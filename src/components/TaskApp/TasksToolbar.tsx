import React from "react";
import Button from "../Button";
import ColumnsConfig from "../ColumnsConfig";
import { LuUndo, LuRedo } from "react-icons/lu";
import { HiPlus } from "react-icons/hi2";
import { DEFAULT_COLUMNS } from "../../constants";
import { Column } from "../../types";

type HeaderProps = {
  onUndo: () => void;
  onRedo: () => void;
  onAddTaskClick: () => void;
  undoDisabled: boolean;
  redoDisabled: boolean;
  customColumns: Column[];
  onColumnsChange: (columns: Column[]) => void;
};

const TasksToolbar: React.FC<HeaderProps> = ({
  onUndo,
  onRedo,
  onAddTaskClick,
  undoDisabled,
  redoDisabled,
  customColumns,
  onColumnsChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        mode="secondary"
        onClick={onUndo}
        prefix={<LuUndo />}
        title="Undo"
        disabled={undoDisabled}
      >
        <span className="hidden md:inline">Undo</span>
      </Button>

      <Button
        mode="secondary"
        onClick={onRedo}
        prefix={<LuRedo />}
        title="Redo"
        disabled={redoDisabled}
      >
        <span className="hidden md:inline">Redo</span>
      </Button>
      <ColumnsConfig
        columns={[...DEFAULT_COLUMNS, ...customColumns]}
        onColumnsChange={onColumnsChange}
      />

      <Button
        mode="primary"
        onClick={onAddTaskClick}
        prefix={<HiPlus />}
        title="Create Task"
      >
        <span className="hidden md:inline">Create Task</span>
      </Button>
    </div>
  );
};

export default TasksToolbar;
