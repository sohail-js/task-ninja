import FormItemCheckbox from "../Form/FormItemCheckbox";
import { useTable } from "./TableContext";

export default function RowSelectionCheckbox({ row }: { row: any }) {
  const { keyProp, selectedRows, setSelectedRows } = useTable();

  return (
    <FormItemCheckbox
      field={{ type: "checkbox", label: "", key: "checkbox" }}
      value={selectedRows[row[keyProp]]}
      onChange={(value) =>
        setSelectedRows((prev) => ({ ...prev, [row[keyProp]]: value }))
      }
    />
  );
}
