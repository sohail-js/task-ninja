import classNames from "classnames";
import { CustomField } from "../../types";
import { useEffect } from "react";

export type FormItemWrapperProps = {
  field: CustomField;
  children: React.ReactNode;
  className?: string;
  value?: any;
  showErrors?: boolean;
  onValidityChange?: (valid: boolean) => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  data?: any[];
  keyProp?: string;
};

export default function FormItemWrapper({
  field,
  children,
  className,
  showErrors,
  value,
  data,
  keyProp,
  onValidityChange,
}: FormItemWrapperProps) {
  const errors = getErrors(field, value, data, keyProp);

  useEffect(() => {
    onValidityChange?.(errors.length === 0);
  }, [JSON.stringify(errors)]);

  return (
    <div className={classNames(className)}>
      {field.label && (
        <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
          {field.label}
          {field?.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}

      {/* error messages */}
      {showErrors && errors.length > 0 && (
        <div className="text-red-500 text-xs italic mt-1">
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function getErrors(
  field: FormItemWrapperProps["field"],
  value: any,
  data: any[] = [],
  keyProp: string = ""
) {
  const errors = [];
  if (field?.required && !value) {
    errors.push("This field is required");
  }
  if (field?.min && value < field.min) {
    errors.push(`Minimum value is ${field.min}`);
  }
  if (field?.max && value > field.max) {
    errors.push(`Maximum value is ${field.max}`);
  }
  if (field?.pattern && !field.pattern.test(value)) {
    errors.push("Invalid value");
  }
  if (field?.unique && data?.find((item) => item[keyProp] === value)) {
    errors.push("Value must be unique");
  }
  return errors;
}
