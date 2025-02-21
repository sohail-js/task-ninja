import React from "react";
import Button from "./Button";
import ColumnsConfig from "./ColumnsConfig";
import { LuUndo, LuRedo } from "react-icons/lu";
import { HiPlus } from "react-icons/hi2";
import { DEFAULT_COLUMNS } from "../constants";
import { Field } from "../types";

type HeaderProps = {
  handleUndo: () => void;
  handleRedo: () => void;
  addTaskHandler: () => void;
  undoDisabled: boolean;
  redoDisabled: boolean;
  customColumns: Field[];
  handleColumnsChange: (columns: Field[]) => void;
};

const Header: React.FC<HeaderProps> = ({
  handleUndo,
  handleRedo,
  addTaskHandler,
  undoDisabled,
  redoDisabled,
  customColumns,
  handleColumnsChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        mode="secondary"
        onClick={handleUndo}
        prefix={<LuUndo />}
        title="Undo"
        disabled={undoDisabled}
      >
        <span className="hidden md:inline">Undo</span>
      </Button>

      <Button
        mode="secondary"
        onClick={handleRedo}
        prefix={<LuRedo />}
        title="Redo"
        disabled={redoDisabled}
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
  );
};

export default Header;
