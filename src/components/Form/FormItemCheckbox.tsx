import { Field } from "../../types";
import FormItemWrapper from "./FormItemWrapper";

type Props = {
  field: Field;
  onChange: (value: boolean) => void;
  value?: boolean;
  className?: string;
  indeterminate?: boolean;
};

export default function FormItemCheckbox({
  field,
  value,
  indeterminate,
  onChange,
}: Props) {
  return (
    <FormItemWrapper field={field}>
      <input
        type="checkbox"
        checked={!!value}
        ref={(el) => {
          if (el) el.indeterminate = indeterminate ?? false;
        }}
        onChange={(e) => onChange(e.target.checked)}
        className="mr-2 leading-tight"
      />
    </FormItemWrapper>
  );
}
