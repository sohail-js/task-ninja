export interface Field {
  key: string;
  type: "text" | "dropdown" | "checkbox" | "number";
  label: string;
  dropdownOptions?: Array<{ value: string | number; label: string }>;
  required?: boolean;
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

export interface CustomField extends Field {
  visible?: boolean;
  editable?: boolean;
  unique?: boolean;
  pattern?: RegExp;
  min?: number;
  max?: number;
  tableColumnClassName?: string;
}
