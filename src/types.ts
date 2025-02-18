export interface Field {
  key: string;
  type: "text" | "dropdown" | "checkbox";
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
