import classNames from "classnames";
import { Field } from "../../types";

type Props = {
  field: Field;
  children: React.ReactNode;
  className?: string;
};

export default function FormItemWrapper({ field, children, className }: Props) {
  return (
    <div className={classNames(className)}>
      {field.label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {field.label}
        </label>
      )}
      {children}
    </div>
  );
}
