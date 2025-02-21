import classNames from "classnames";
import React from "react";
import { Mode } from "../types";

type Props = {
  onClick?: () => void;
  children?: React.ReactNode;
  mode: Mode;
  className?: string;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
  title?: string;
};

export default function Button({
  onClick,
  mode,
  children,
  className,
  type,
  size = "md",
  disabled,
  prefix,
  postfix,
  title,
}: Props) {
  return (
    <button
      title={title}
      disabled={disabled}
      type={type}
      className={classNames(
        "rounded",
        className,
        {
          "bg-blue-500 text-white": mode === "primary",
          "bg-gray-500 text-white": mode === "secondary",
          "text-blue-500": mode === "link",
          "bg-red-500 text-white": mode === "danger",
          "bg-yellow-500 text-white": mode === "warning",
          "bg-green-500 text-white": mode === "success",
        },
        {
          "hover:bg-blue-600": !disabled && mode === "primary",
          "hover:bg-gray-600": !disabled && mode === "secondary",
          "hover:text-blue-600": !disabled && mode === "link",
          "hover:bg-red-600": !disabled && mode === "danger",
          "hover:bg-yellow-600": !disabled && mode === "warning",
          "hover:bg-green-600": !disabled && mode === "success",
        },
        {
          "opacity-50 cursor-not-allowed": disabled,
          "cursor-pointer": !disabled,
        },
        {
          "text-xs px-2 py-1": size === "sm",
          "px-4 py-2": size === "md",
          "text-lg px-6 py-4": size === "lg",
        }
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-1">
        {prefix}
        {children}
        {postfix}
      </div>
    </button>
  );
}
