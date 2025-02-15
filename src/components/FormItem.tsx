import classNames from "classnames";
import { Field } from "../types";
import { useEffect } from "react";

type Props = {
  field: Field;
  onChange: (value: string) => void;
  value?: string;
  className?: string;
};

export default function FormItem({
  field,
  value = "",
  onChange,
  className,
}: Props) {
  useEffect(() => {
    if (field.type === "dropdown" && !value && field.dropdownOptions?.length) {
      onChange(field.dropdownOptions[0].value);
    }
  }, [field, value, onChange]);

  switch (field.type) {
    case "text":
      return (
        <div className={classNames("mb-4", className)}>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {field.label}
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      );
    case "dropdown":
      return (
        <div className={classNames("mb-4", className)}>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {field.label}
          </label>
          <div className="relative">
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {field.dropdownOptions?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      );
  }
}
