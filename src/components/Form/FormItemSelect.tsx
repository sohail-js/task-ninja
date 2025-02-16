import FormItemWrapper, { FormItemWrapperProps } from "./FormItemWrapper";
import { HiChevronDown } from "react-icons/hi2";
import { useEffect } from "react";

interface Props extends Omit<FormItemWrapperProps, "children"> {
  onChange: (value: string) => void;
  value?: string;
}

export default function FormItemSelect({
  field,
  value,
  onChange,
  ...otherProps
}: Props) {
  useEffect(() => {
    if (!value && field.dropdownOptions?.length) {
      onChange(field.dropdownOptions[0].value);
    }
  }, [field, value, onChange]);
  return (
    <FormItemWrapper field={field} value={value} {...otherProps}>
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
          <HiChevronDown className="fill-current h-4 w-4" />
        </div>
      </div>
    </FormItemWrapper>
  );
}
