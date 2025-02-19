import classNames from "classnames";
import FormItemWrapper, { FormItemWrapperProps } from "./FormItemWrapper";

interface Props extends Omit<FormItemWrapperProps, "children"> {
  onChange: (value: string) => void;
  value?: string;
}

export default function FormItemText({
  field,
  value,
  onChange,
  placeholder,
  size = "md",
  disabled,
  ...otherProps
}: Props) {
  return (
    <FormItemWrapper
      field={field}
      value={value}
      disabled={disabled}
      {...otherProps}
    >
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={classNames(
          "shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200",
          {
            "text-sm py-0.5 px-1": size === "sm",
            "text-lg py-2 px-3": size === "lg",
            "py-2 px-3": size === "md",
          }
        )}
        placeholder={placeholder}
        disabled={disabled}
      />
    </FormItemWrapper>
  );
}
