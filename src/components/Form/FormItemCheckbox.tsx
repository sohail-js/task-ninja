import FormItemWrapper, { FormItemWrapperProps } from "./FormItemWrapper";

interface Props extends Omit<FormItemWrapperProps<boolean>, "children"> {
  indeterminate?: boolean;
}

export default function FormItemCheckbox(props: Props) {
  const { indeterminate, value, onChange, disabled } = props;
  return (
    <FormItemWrapper {...props}>
      <input
        type="checkbox"
        checked={value}
        ref={(el) => {
          if (el) el.indeterminate = indeterminate ?? false;
        }}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
    </FormItemWrapper>
  );
}
