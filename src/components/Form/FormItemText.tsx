import classNames from "classnames";
import FormItemWrapper, { FormItemWrapperProps } from "./FormItemWrapper";
import { HTMLInputTypeAttribute } from "react";

interface Props
  extends Omit<FormItemWrapperProps<string | number>, "children"> {
  type?: HTMLInputTypeAttribute;
}

export default function FormItemText(props: Props) {
  const { value, onChange, placeholder, size = "md", disabled, type } = props;
  return (
    <FormItemWrapper {...props}>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={classNames(
          "shadow appearance-none border rounded w-full text-gray-700 leading-tight dark:bg-gray-700 dark:text-gray-200",
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
