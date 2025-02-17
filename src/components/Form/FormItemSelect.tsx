import FormItemWrapper, { FormItemWrapperProps } from "./FormItemWrapper";
import { HiChevronDown } from "react-icons/hi2";
import { useEffect } from "react";
import classNames from "classnames";
import Button from "../Button";
import { HiX } from "react-icons/hi";

interface Props extends Omit<FormItemWrapperProps, "children"> {
  onChange: (value: string) => void;
  value?: string;
}

export default function FormItemSelect({
  field,
  value,
  onChange,
  size = "md",
  ...otherProps
}: Props) {
  return (
    <FormItemWrapper field={field} value={value} {...otherProps}>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={classNames(
            "shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 cursor-pointer",
            {
              "text-sm py-0.5 px-1": size === "sm",
              "text-lg py-2 px-3": size === "lg",
              "py-2 px-3": size === "md",
            }
          )}
        >
          <option value="">Un selected</option>
          {field.dropdownOptions?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-200">
          <HiChevronDown className="fill-current h-4 w-4" />
        </div>
        {value && (
          <Button
            type="button"
            mode="link"
            onClick={() => onChange("")}
            className="absolute inset-y-0 right-3 flex items-center px-2 text-gray-700 dark:text-gray-200"
          >
            <HiX className="fill-current h-4 w-4" />
          </Button>
        )}
      </div>
    </FormItemWrapper>
  );
}
