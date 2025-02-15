import classNames from "classnames";
import { Field } from "../types";
import Button from "./Button";
import { HiDotsHorizontal } from "react-icons/hi";
import { useState } from "react";
import FormItemCheckbox from "./Form/FormItemCheckbox";

type Props = {
  columns: Array<Field>;
  data: any[];
  keyProp: string;
  className?: string;
  contextMenuOptions?: Array<{}>;
};

export default function Table({ columns, data, keyProp, className }: Props) {
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  const recordCheckboxChangeHandler = (key: string, value: boolean) => {
    setSelectedRows((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <table
      className={classNames("min-w-full divide-y divide-gray-200", className)}
    >
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-0.5"></th>
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
          <tr key={row[keyProp]}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center justify-center w-0.5">
              <Button mode="link" size="sm">
                <HiDotsHorizontal />
              </Button>
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
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
