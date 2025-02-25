import { useTable } from "./TableContext";
import Button from "../Button";
import { Column } from "../../types";
import FormItemCheckbox from "../Form/FormItemCheckbox";
import FormItemSelect from "../Form/FormItemSelect";
import FormItemText from "../Form/FormItemText";
import classNames from "classnames";
import { BsReverseLayoutSidebarInsetReverse } from "react-icons/bs";
import Pill from "../Pill";

type Props = {
  row: any;
  column: Column;
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

  function getDisplayValue(value: any) {
    if (typeof value === "boolean") {
      return value ? "true" : "false";
    }

    if (value instanceof Date) {
      return value.toLocaleDateString();
    }

    if (column.type === "dropdown") {
      const option = column.dropdownOptions?.find(
        (option) => option.value === value
      );
      return (
        <Pill color={option?.color ?? "gray"} label={option?.label ?? ""} />
      );
    }

    return value;
  }

  return (
    <td
      className={classNames(
        "px-3 py-2 whitespace-nowrap text-sm align-top",
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
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-100 ml-2 font-thin tracking-widest"
          mode="secondary"
          onClick={() => onRecordOpen(row)}
          prefix={<BsReverseLayoutSidebarInsetReverse />}
        >
          OPEN
        </Button>
      )}
    </td>
  );
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
  function getCommonProps(field: Column) {
    return {
      field: {
        ...field,
        label: "",
      },
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
      return <FormItemCheckbox {...getCommonProps(column)} className="p-2" />;
  }
}
