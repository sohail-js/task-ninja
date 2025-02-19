import { useTable } from "./TableContext";
import Button from "../Button";
import { CustomField } from "../../types";
import FormItemCheckbox from "../Form/FormItemCheckbox";
import FormItemSelect from "../Form/FormItemSelect";
import FormItemText from "../Form/FormItemText";

type Props = {
  row: any;
  column: CustomField;
  onChange: (value: any) => void;
  onValidityChange?: (valid: boolean) => void;
  showErrors?: boolean;
};

export default function TableCell({ row, column, onChange }: Props) {
  const { onRecordOpen, inlineEditable } = useTable();

  const columnKey = column.key;
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm">
      {inlineEditable ? (
        <EditableCell row={row} column={column} onChange={onChange} />
      ) : (
        getDisplayValue(row[columnKey]) ?? (
          <span className="text-gray-600 italic">empty</span>
        )
      )}

      {columnKey === "title" && onRecordOpen && (
        <Button
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-100"
          mode="secondary"
          onClick={() => onRecordOpen(row)}
        >
          Open
        </Button>
      )}
    </td>
  );
}

function getDisplayValue(value: any) {
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }

  if (value instanceof Date) {
    return value.toLocaleDateString();
  }

  return value;
}

function EditableCell({ column, showErrors, onChange, row }: Props) {
  const value = row[column.key];
  function getCommonProps(field: CustomField) {
    return {
      field: {
        ...field,
        label: "",
      },
      className: "mb-4",
      onChange: (newValue: any) =>
        onChange({
          ...row,
          [field.key]: newValue,
        }),
      validations: {
        required: field.required,
      },
      // onValidityChange: (valid: boolean) =>
      // setFormValid((prev) => ({ ...prev, [field.key]: valid })),
      showErrors: showErrors,
      value,
    };
  }

  switch (column.type) {
    case "text":
      return (
        <FormItemText
          key={column.key}
          {...getCommonProps(column)}
          placeholder="Enter text"
        />
      );

    case "dropdown":
      return <FormItemSelect key={column.key} {...getCommonProps(column)} />;

    case "checkbox":
      return <FormItemCheckbox key={column.key} {...getCommonProps(column)} />;
  }
}
