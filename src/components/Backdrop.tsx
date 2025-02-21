import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
};

export default function Backdrop({
  children,
  isOpen,
  onClose,
  className,
}: Props) {
  return (
    <div
      className={classNames(
        className,
        "fixed inset-0 bg-black/80 transition-opacity duration-200 z-50",
        {
          "opacity-100": isOpen,
          "opacity-0 pointer-events-none": !isOpen,
        }
      )}
      onClick={onClose}
    >
      {children}
    </div>
  );
}
