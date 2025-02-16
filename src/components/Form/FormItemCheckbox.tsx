import FormItemWrapper, { FormItemWrapperProps } from "./FormItemWrapper";

interface Props extends Omit<FormItemWrapperProps, "children"> {
  onChange: (value: boolean) => void;
  value?: boolean;
  indeterminate?: boolean;
}

export default function FormItemCheckbox({
  field,
  value,
  indeterminate,
  onChange,
  ...otherProps
}: Props) {
  return (
    <FormItemWrapper field={field} value={value} {...otherProps}>
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
