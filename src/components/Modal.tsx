import React from "react";
import { MenuItem } from "../types";
import Button from "./Button";
import { HiX } from "react-icons/hi";
import classNames from "classnames";
// import ReactDOM from "react-dom";

type Props = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  footerOptions?: Array<MenuItem>;
  onFooterOptionClick?: (option: MenuItem) => void;
};

export function Modal({
  title,
  children,
  onClose,
  footerOptions,
  isOpen,
  onFooterOptionClick,
}: Props) {
  return (
    <>
      {/* backdrop */}
      <div
        className={classNames(
          "fixed inset-0 bg-black/80 transition-opacity duration-200 flex items-center justify-center z-20",
          {
            "opacity-100": isOpen,
            "opacity-0 pointer-events-none": !isOpen,
          }
        )}
        onClick={onClose}
      >
        <div
          className={classNames(
            "bg-white dark:bg-gray-800",
            "p-4 rounded shadow w-96 z-50",
            "transform transition-transform duration-300",
            {
              "translate-y-full": !isOpen,
              "translate-y-0": isOpen,
            }
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button className="cursor-pointer" onClick={onClose}>
              <HiX />
            </button>
          </div>
          <div>{children}</div>
          {footerOptions && (
            <div className="flex justify-end gap-2 mt-4">
              {footerOptions.map((option, index) => (
                <Button
                  key={index}
                  size="sm"
                  mode={option.mode ?? "secondary"}
                  prefix={option.icon}
                  onClick={() => onFooterOptionClick?.(option)}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* modal */}
    </>
  );
}
