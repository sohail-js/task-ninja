import classNames from "classnames";

type Props = {
  color: string;
  label: string;
};

const colorClassMap: Record<string, string> = {
  gray: "bg-gray-500 text-white",
  green: "bg-green-500/50 text-white",
  blue: "bg-blue-500/50 text-white",
  orange: "bg-orange-500/50 text-white",
  red: "bg-red-500/50 text-white",
};

export default function Pill({ color, label }: Props) {
  return (
    <span
      className={classNames(
        `px-2 py-1 text-xs font-semibold rounded-full`,
        colorClassMap[color]
      )}
    >
      {label}
    </span>
  );
}
