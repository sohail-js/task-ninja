import { useEffect, useState } from "react";
import { Field } from "../../types";
import Button from "../Button";
import FormItemText from "./FormItemText";
import FormItemSelect from "./FormItemSelect";
import FormItemCheckbox from "./FormItemCheckbox";

type Props = {
  fields: Field[];
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
  const [formValues, setFormValues] = useState<Record<string, any>>(
    defaultValues || {}
  );

  const [formValid, setFormValid] = useState(
    fields.reduce((acc, field) => ({
      ...acc,
      [field.key]: true,
    }))
  );

  const [showErrors, setShowErrors] = useState(false);

  const valid = Object.values(formValid).every((v) => v);

  useEffect(() => {
    setFormValues(defaultValues || {});
  }, [defaultValues]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);
    if (valid) {
      onSubmit(formValues);
      close();
    }
  };

  const cancelHandler = () => {
    onCancel?.();
    close();
  };

  const close = () => {
    setFormValues({});
    setShowErrors(false);
  };

  function getCommonProps(field: Field) {
    return {
      field,
      className: "mb-4",
      onChange: (value: any) =>
        setFormValues((prev) => ({ ...prev, [field.key]: value })),
      validations: {
        required: field.required,
      },
      onValidityChange: (valid: boolean) =>
        setFormValid((prev) => ({ ...prev, [field.key]: valid })),
      showErrors: showErrors,
    };
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xxl:grid-cols-3">
        {fields.map((field) => {
          switch (field.type) {
            case "text":
              return (
                <FormItemText
                  key={field.key}
                  {...getCommonProps(field)}
                  placeholder="Enter text"
                  value={formValues?.[field.key] as string}
                />
              );

            case "dropdown":
              return (
                <FormItemSelect
                  value={formValues?.[field.key] as string}
                  key={field.key}
                  showClear
                  {...getCommonProps(field)}
                />
              );

            case "checkbox":
              return (
                <FormItemCheckbox
                  value={!!formValues?.[field.key]}
                  key={field.key}
                  {...getCommonProps(field)}
                />
              );
          }
        })}
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <Button mode="secondary" type="button" onClick={cancelHandler}>
          Cancel
        </Button>
        <Button mode="primary" type="submit" disabled={showErrors && !valid}>
          Submit
        </Button>
      </div>
    </form>
  );
}
