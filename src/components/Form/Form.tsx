import { useEffect, useState } from "react";
import { Column } from "../../types";
import Button from "../Button";
import FormItemText from "./FormItemText";
import FormItemSelect from "./FormItemSelect";
import FormItemCheckbox from "./FormItemCheckbox";
import { useRef } from "react";

type Props = {
  fields: Column[];
  defaultValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
  onCancel?: () => void;
};

export default function Form({
  fields,
  defaultValues,
  onSubmit,
  onCancel,
}: Props) {
  const {
    formValues,
    showErrors,
    isValid,
    handleSubmit,
    handleCancel,
    generateFieldProps,
  } = useFormState({ fields, defaultValues, onSubmit, onCancel });

  const firstInputRef = useRef<HTMLElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      ref={(el) => {
        firstInputRef.current = el?.querySelector("input") as HTMLInputElement;
      }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xxl:grid-cols-3">
        {fields.map((field) => {
          switch (field.type) {
            case "text":
            case "number":
              return (
                <FormItemText
                  key={field.key}
                  type={field.type}
                  {...generateFieldProps(field)}
                  placeholder={"Enter " + field.type}
                  value={formValues?.[field.key] as string}
                />
              );

            case "dropdown":
              return (
                <FormItemSelect
                  value={formValues?.[field.key] as string}
                  key={field.key}
                  showClear
                  {...generateFieldProps(field)}
                />
              );

            case "checkbox":
              return (
                <FormItemCheckbox
                  value={!!formValues?.[field.key]}
                  key={field.key}
                  {...generateFieldProps(field)}
                />
              );
          }
        })}
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <Button mode="secondary" type="button" onClick={handleCancel}>
          Cancel
        </Button>
        <Button mode="primary" type="submit" disabled={showErrors && !isValid}>
          Submit
        </Button>
      </div>
    </form>
  );
}

function useFormState({ fields, defaultValues, onSubmit, onCancel }: Props) {
  const [formValues, setFormValues] = useState<Record<string, any>>(
    defaultValues || {}
  );

  const [fieldsValidationStatus, setFieldsValidationStatus] = useState<
    Record<string, boolean>
  >({});

  const [showErrors, setShowErrors] = useState(false);

  const isValid = fields.every((field) => fieldsValidationStatus[field.key]);

  useEffect(() => {
    setFormValues(defaultValues || {});
  }, [defaultValues]);

  const clearForm = () => {
    setFormValues({});
    setShowErrors(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);
    if (isValid) {
      onSubmit(formValues);
      clearForm();
    }
  };

  const handleCancel = () => {
    onCancel?.();
    clearForm();
  };

  function generateFieldProps(field: Column) {
    return {
      field,
      className: "mb-4",
      onChange: (value: string | number | boolean) => {
        setFormValues((prev) => ({
          ...prev,
          [field.key]: field.type == "number" ? Number(value) : value,
        }));
      },
      onValidityChange: (valid: boolean) =>
        setFieldsValidationStatus((prev) => ({ ...prev, [field.key]: valid })),
      showErrors,
    };
  }

  return {
    formValues,
    showErrors,
    isValid,
    handleSubmit,
    handleCancel,
    generateFieldProps,
  };
}
