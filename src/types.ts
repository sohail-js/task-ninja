export interface Field {
  key: string;
  type: "text" | "dropdown" | "checkbox";
  label: string;
  dropdownOptions?: Array<{ value: string; label: string }>;
  required?: boolean;
}

export interface ContextMenuOption {
  label: string;
  value: string;
  icon: string;
}
