import { Field } from "../../types";
import withFormItem from "./FormItem";

type Props = {
  field: Field;
  onChange: (value: boolean) => void;
  value?: boolean;
  className?: string;
};

function FormItemCheckbox({ value, onChange }: Props) {
  return (
    <input
      type="checkbox"
      checked={!!value}
      onChange={(e) => onChange(e.target.checked)}
      className="mr-2 leading-tight"
    />
  );
}

export default withFormItem<boolean>(FormItemCheckbox);
