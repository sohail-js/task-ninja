import { CustomField } from "./types";

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

export const DEFAULT_COLUMNS: CustomField[] = [
  { key: "title", visible: true, label: "Title", type: "text" },
  {
    key: "priority",
    visible: true,
    label: "Priority",
    type: "dropdown",
    dropdownOptions: OPTIONS_PRIORITY,
  },
  {
    key: "status",
    visible: true,
    label: "Status",
    type: "dropdown",
    dropdownOptions: OPTIONS_STATUS,
  },
];
