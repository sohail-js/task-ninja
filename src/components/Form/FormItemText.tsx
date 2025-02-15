import classNames from "classnames";
import { Field } from "../../types";
import withFormItem from "./FormItem";

type Props = {
  field: Field;
  onChange: (value: string) => void;
  value?: string;
  className?: string;
};

function FormItemText({ value, onChange, className }: Props) {
  return (
    <input
      type="text"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className={classNames(
        className,
        "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      )}
    />
  );
}

export default withFormItem<string>(FormItemText);
