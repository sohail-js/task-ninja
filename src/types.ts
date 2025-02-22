export interface Column {
  key: string;
  type: "text" | "dropdown" | "checkbox" | "number";
  label: string;
  dropdownOptions?: Array<{
    value: string | number;
    label: string;
    color?: string;
  }>;
  required?: boolean;
  visible?: boolean;
  editable?: boolean;
  unique?: boolean;
  pattern?: RegExp;
  min?: number;
  max?: number;
  tableColumnClassName?: string;
}

export type MenuItem = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  mode?: Mode;
};

export type Task = {
  id: string | number;
  title: string;
  priority: string;
  status: string;

  // for custom fields
  [key: string]: string | number | boolean;
};

export type HistoryItem = {
  tasks: Task[];
  columns: Column[];
};

export type Mode =
  | "primary"
  | "secondary"
  | "link"
  | "danger"
  | "warning"
  | "success";
