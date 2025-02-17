import classNames from "classnames";
import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function Drawer({ title, children, isOpen, onClose }: Props) {
  return (
    <div
      hidden={!isOpen}
      className={`fixed inset-0 bg-black/80 z-50 transition-opacity`}
      onClick={onClose}
    >
      <div
        className={classNames(
          `fixed inset-y-0 right-0 w-2xl bg-white z-50 shadow-lg transform transition-transform dark:bg-gray-800`,
          {
            "translate-x-0": isOpen,
            "translate-x-full": !isOpen,
          }
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between p-4 border-b">
          <h2>{title}</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
