import classNames from "classnames";
import React from "react";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  mode: "primary" | "secondary" | "link" | "danger" | "warning" | "success";
  className?: string;
};

export default function Button({ onClick, mode, children, className }: Props) {
  return (
    <button
      className={classNames("px-4 py-2 rounded cursor-pointer", className, {
        "bg-blue-500 text-white hover:bg-blue-600": mode === "primary",
        "bg-gray-500 text-white hover:bg-gray-600": mode === "secondary",
        "text-blue-500 hover:text-blue-600": mode === "link",
        "bg-red-500 text-white hover:bg-red-600": mode === "danger",
        "bg-yellow-500 text-white hover:bg-yellow-600": mode === "warning",
        "bg-green-500 text-white hover:bg-green-600": mode === "success",
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
