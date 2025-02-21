import classNames from "classnames";
import React from "react";
import { HiX } from "react-icons/hi";
import Backdrop from "./Backdrop";

type Props = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function Drawer({ title, children, isOpen, onClose }: Props) {
  return (
    <Backdrop isOpen={isOpen} onClose={onClose}>
      <Container isOpen={isOpen}>
        <Head title={title} onClose={onClose} />
        <div className="p-4">{children}</div>
      </Container>
    </Backdrop>
  );
}

function Container({ isOpen, children }: Pick<Props, "isOpen" | "children">) {
  return (
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
      {children}
    </div>
  );
}

function Head({ title, onClose }: Pick<Props, "title" | "onClose">) {
  return (
    <div className="flex justify-between p-4 border-b">
      <h2>{title}</h2>
      <button className="cursor-pointer" onClick={onClose}>
        <HiX />
      </button>
    </div>
  );
}
