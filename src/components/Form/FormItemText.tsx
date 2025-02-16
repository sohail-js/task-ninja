import classNames from "classnames";
import { Field } from "../../types";
import FormItemWrapper from "./FormItemWrapper";

type Props = {
  field: Field;
  onChange: (value: string) => void;
  value?: string;
  className?: string;
};

export default function FormItemText({
  field,
  value,
  onChange,
  className,
}: Props) {
  return (
    <FormItemWrapper field={field}>
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
