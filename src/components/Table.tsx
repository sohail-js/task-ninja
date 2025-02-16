import classNames from "classnames";
import { Field } from "../types";
import Button from "./Button";
import { HiDotsHorizontal } from "react-icons/hi";
import { useState } from "react";
import FormItemCheckbox from "./Form/FormItemCheckbox";
import Dropdown from "./Dropdown";

type Props = {
  columns: Array<Field>;
  data: any[];
  keyProp: string;
  className?: string;
  contextMenuOptions?: Array<{
    label: string;
    icon: React.ReactNode;
    onClick: (record: any) => void;
  }>;
  onRecordOpen?: (record: any) => void;
};

export default function Table({
  columns,
  data,
  keyProp,
  className,
  onRecordOpen,
  contextMenuOptions,
}: Props) {
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>(
    data.reduce((acc, row) => ({ ...acc, [row[keyProp]]: false }), {})
  );

  const recordCheckboxChangeHandler = (key: string, value: boolean) => {
    setSelectedRows((prev) => ({ ...prev, [key]: value }));
  };

  const selectedRowValues = Object.values(selectedRows);

  const allSelected =
    selectedRowValues.length > 0 && selectedRowValues.every((value) => value);
  const indeterminate =
    selectedRowValues.length > 0 &&
    selectedRowValues.some((value) => value) &&
    selectedRowValues.some((value) => !value);

  return (
    <table
      className={classNames("min-w-full divide-y divide-gray-200", className)}
    >
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-0.5">
            <FormItemCheckbox
              field={{
                type: "checkbox",
                label: "",
                key: "checkbox",
              }}
              value={allSelected}
              indeterminate={indeterminate}
              onChange={(value) => {
                const newSelectedRows = data.reduce(
                  (acc, row) => ({ ...acc, [row[keyProp]]: value }),
                  {}
                );
                setSelectedRows(newSelectedRows);
              }}
            />
          </th>
          {columns.map((column) => (
            <th
              key={column.key}
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider bg-gray-50"
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row) => (
          <tr key={row[keyProp]} className="group">
            <td
              className={classNames(
                "px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center justify-center w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-100",
                {
                  "opacity-100": selectedRows[row[keyProp]],
                }
              )}
            >
              <Dropdown
                menuItems={(contextMenuOptions ?? []).map((option) => ({
                  label: option.label,
                  icon: option.icon,
                }))}
                onItemClick={(item) => {
                  const option = contextMenuOptions?.find(
                    (option) => option.label === item.label
                  );
                  option?.onClick(row);
                }}
              >
                <Button mode="link" size="sm">
                  <HiDotsHorizontal />
                </Button>
              </Dropdown>
              <FormItemCheckbox
                field={{
                  type: "checkbox",
                  label: "",
                  key: "checkbox",
                }}
                value={selectedRows[row[keyProp]]}
                onChange={(value) => {
                  recordCheckboxChangeHandler(row[keyProp], value);
                }}
              />
            </td>
            {columns.map((column) => (
              <td
                key={column.key}
                className="px-6 py-4 whitespace-nowrap text-sm"
              >
                {row[column.key]}

                {column.key === "title" && (
                  <Button
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-100"
                    mode="secondary"
                    onClick={() => onRecordOpen?.(row)}
                  >
                    Open
                  </Button>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
