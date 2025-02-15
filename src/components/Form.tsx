import { useEffect, useState } from "react";
import { Field } from "../types";
import FormItem from "./FormItem";
import Button from "./Button";

type Props = {
  fields: Field[];
  defaultValues?: Record<string, string>;
  onSubmit: (data: Record<string, string>) => void;
  onCancel?: () => void;
};

export default function Form({
  fields,
  defaultValues,
  onSubmit,
  onCancel,
}: Props) {
  const [formValues, setFormValues] = useState<Record<string, string>>(
    defaultValues || {}
  );

  useEffect(() => {
    setFormValues(defaultValues || {});
  }, [defaultValues]);

  return (
    <form
      className=""
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formValues);
        setFormValues({});
      }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xxl:grid-cols-3">
        {fields.map((field) => (
          <FormItem
            className=""
            key={field.key}
            field={field}
            onChange={(value) =>
              setFormValues((prev) => ({ ...prev, [field.key]: value }))
            }
            value={formValues?.[field.key]}
          />
        ))}
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <Button mode="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button mode="primary" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
