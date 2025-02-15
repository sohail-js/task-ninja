import classNames from "classnames";
import { Field } from "../../types";

type Props<T> = {
  field: Field;
  onChange: (value: T) => void;
  value?: T;
  className?: string;
};

export default function withFormItem<T>(
  WrappedComponent: React.ComponentType<any>
) {
  return function FormItem({ field, value, onChange, className }: Props<T>) {
    return (
      <div className={classNames(className)}>
        {field.label && (
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {field.label}
          </label>
        )}
        <WrappedComponent field={field} value={value} onChange={onChange} />
      </div>
    );
  };
}
