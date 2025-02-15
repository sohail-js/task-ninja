export interface Field {
  key: string;
  type: "text" | "dropdown";
  label: string;
  dropdownOptions?: Array<{ value: string; label: string }>;
}
