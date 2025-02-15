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
        {fields.map((field) => {
          switch (field.type) {
            case "text":
              return (
                <FormItemText
                  field={field}
                  className="mb-4"
                  key={field.key}
                  value={formValues?.[field.key] as string}
                  onChange={(value) =>
                    setFormValues((prev) => ({ ...prev, [field.key]: value }))
                  }
                />
              );

            case "dropdown":
              return (
                <FormItemSelect
                  field={field}
                  className="mb-4"
                  key={field.key}
                  value={formValues?.[field.key] as string}
                  onChange={(value) =>
                    setFormValues((prev) => ({ ...prev, [field.key]: value }))
                  }
                />
              );

            case "checkbox":
              return (
                <FormItemCheckbox
                  field={field}
                  className="mb-4"
                  key={field.key}
                  value={!!formValues?.[field.key]}
                  onChange={(value) =>
                    setFormValues((prev) => ({ ...prev, [field.key]: value }))
                  }
                />
              );
          }
        })}
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
