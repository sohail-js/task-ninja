import classNames from "classnames";
import { Field } from "../../types";
import { useEffect } from "react";

export type FormItemWrapperProps = {
  field: Field;
  children: React.ReactNode;
  className?: string;
  validations?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
    unique?: boolean;
  };
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
  validations,
  value,
  data,
  keyProp,
  onValidityChange,
}: FormItemWrapperProps) {
  const errors = getErrors(validations, value, data, keyProp);

  useEffect(() => {
    onValidityChange?.(errors.length === 0);
  }, [JSON.stringify(errors)]);

  return (
    <div className={classNames(className)}>
      {field.label && (
        <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
          {field.label}
          {validations?.required && (
            <span className="text-red-500 ml-1">*</span>
          )}
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
  validations: FormItemWrapperProps["validations"],
  value: any,
  data: any[] = [],
  keyProp: string = ""
) {
  const errors = [];
  if (validations?.required && !value) {
    errors.push("This field is required");
  }
  if (validations?.min && value < validations.min) {
    errors.push(`Minimum value is ${validations.min}`);
  }
  if (validations?.max && value > validations.max) {
    errors.push(`Maximum value is ${validations.max}`);
  }
  if (validations?.pattern && !validations.pattern.test(value)) {
    errors.push("Invalid value");
  }
  if (validations?.unique && data?.find((item) => item[keyProp] === value)) {
    errors.push("Value must be unique");
  }
  return errors;
}
