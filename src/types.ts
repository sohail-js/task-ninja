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

export interface ContextMenuOption {
  label: string;
  value: string;
  icon: string;
}

export type MenuItem = {
  label: string;
  icon: React.ReactNode;
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
