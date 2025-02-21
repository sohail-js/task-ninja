export interface Field {
  key: string;
  type: "text" | "dropdown" | "checkbox" | "number";
  label: string;
  dropdownOptions?: Array<{ value: string | number; label: string }>;
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

export type RecordItem = {
  id: string | number;
  title: string;
  priority: string;
  status: string;
};

export type HistoryItem = {
  data: RecordItem[];
  columns: Field[];
};

export type Mode =
  | "primary"
  | "secondary"
  | "link"
  | "danger"
  | "warning"
  | "success";
