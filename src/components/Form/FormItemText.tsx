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
  className,
  ...otherProps
}: Props) {
  return (
    <FormItemWrapper field={field} value={value} {...otherProps}>
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={classNames(
          className,
          "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        )}
      />
    </FormItemWrapper>
  );
}
