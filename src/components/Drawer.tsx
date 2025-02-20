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
          "w-full md:w-2xl h-full",
          "fixed bottom-0 right-0 z-50",
          "transform md:inset-y-0 md:right-0 md:translate-y-0 transition-transform duration-300",
          `bg-white shadow-lg dark:bg-gray-800`,
          {
            // Default for mobile: slide from bottom
            "translate-y-full": !isOpen,
            "translate-y-0": isOpen,

            // Medium screens and above: slide from right
            "md:translate-x-full": !isOpen,
            "md:translate-x-0": isOpen,
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
