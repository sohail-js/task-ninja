import { useTable } from "./TableContext";
import Button from "../Button";
import { CustomField } from "../../types";
import FormItemCheckbox from "../Form/FormItemCheckbox";
import FormItemSelect from "../Form/FormItemSelect";
import FormItemText from "../Form/FormItemText";
import classNames from "classnames";

type Props = {
  row: any;
  column: CustomField;
  onChange: (value: any) => void;
  onValidityChange?: (valid: boolean) => void;
  data?: any[];
  disabled?: boolean;
};

export default function TableCell({
  row,
  column,
  onChange,
  onValidityChange,
  data,
  disabled,
}: Props) {
  const { onRecordOpen, inlineEditable } = useTable();

  const columnKey = column.key;
  return (
    <td
      className={classNames(
        "px-3 py-1 whitespace-nowrap text-sm",
        column.tableColumnClassName
      )}
    >
      {inlineEditable ? (
        <EditableCell
          row={row}
          column={column}
          onChange={onChange}
          onValidityChange={onValidityChange}
          data={data}
          disabled={disabled}
        />
      ) : (
        getDisplayValue(row[columnKey]) ?? (
          <span className="text-gray-600 italic">empty</span>
        )
      )}

      {columnKey === "title" && onRecordOpen && (
        <Button
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-100 ml-2"
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

function EditableCell({
  column,
  onChange,
  row,
  onValidityChange,
  data,
  disabled,
}: Props) {
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
      onValidityChange: (valid: boolean) => onValidityChange?.(valid),
      showErrors: true,
      value,
      data,
      keyProp: column.key,
      disabled: disabled,
    };
  }

  switch (column.type) {
    case "text":
      return (
        <FormItemText {...getCommonProps(column)} placeholder="Enter text" />
      );

    case "dropdown":
      return <FormItemSelect {...getCommonProps(column)} />;

    case "checkbox":
      return <FormItemCheckbox {...getCommonProps(column)} />;
  }
}
