import { Column } from "./types";

export const OPTIONS_PRIORITY = [
  { value: "none", label: "None", color: "gray" },
  { value: "low", label: "Low", color: "green" },
  { value: "medium", label: "Medium", color: "blue" },
  { value: "high", label: "High", color: "orange" },
  { value: "urgent", label: "Urgent", color: "red" },
];

export const OPTIONS_STATUS = [
  { value: "not_started", label: "Not Started", color: "gray" },
  { value: "in_progress", label: "In Progress", color: "orange" },
  { value: "completed", label: "Completed", color: "green" },
];

export const LOCAL_STORAGE_KEYS = {
  tasks: "tasks",
  columns: "columns",
};

export const DEFAULT_COLUMNS: Column[] = [
  {
    key: "title",
    visible: true,
    label: "Title",
    type: "text",
    required: true,
    tableColumnClassName: "min-w-64 max-w-64",
  },
  {
    key: "priority",
    visible: true,
    label: "Priority",
    type: "dropdown",
    dropdownOptions: OPTIONS_PRIORITY,
    required: true,
    tableColumnClassName: "min-w-30 max-w-30",
  },
  {
    key: "status",
    visible: true,
    label: "Status",
    type: "dropdown",
    dropdownOptions: OPTIONS_STATUS,
    required: true,
    tableColumnClassName: "min-w-35 max-w-35",
  },
];
