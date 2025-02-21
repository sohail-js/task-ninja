import { Field } from "./types";

export const OPTIONS_PRIORITY = [
  { value: "none", label: "None" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

export const OPTIONS_STATUS = [
  { value: "not_started", label: "Not Started" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export const LOCAL_STORAGE_KEYS = {
  tasks: "tasks",
  columns: "columns",
};

export const DEFAULT_COLUMNS: Field[] = [
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
