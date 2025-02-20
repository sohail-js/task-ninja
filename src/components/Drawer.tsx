import classNames from "classnames";
import React from "react";
import { HiX } from "react-icons/hi";

type Props = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function Drawer({ title, children, isOpen, onClose }: Props) {
  return (
    <div
      className={classNames(
        "fixed inset-0 bg-black/80 z-50 transition-opacity duration-200",
        {
          "opacity-100": isOpen,
          "opacity-0 pointer-events-none": !isOpen,
        }
      )}
      onClick={onClose}
    >
      <div
        className={classNames(
          `fixed inset-y-0 right-0 w-2xl bg-white z-50 shadow-lg transform transition-transform duration-300 dark:bg-gray-800`,
          {
            "translate-x-0": isOpen,
            "translate-x-full": !isOpen,
          }
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between p-4 border-b">
          <h2>{title}</h2>
          <button className="cursor-pointer" onClick={onClose}>
            <HiX />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
