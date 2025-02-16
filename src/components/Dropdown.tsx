import React, { useState } from "react";
import { MenuItem } from "../types";

type Props = {
  menuItems: Array<MenuItem>;
  children: React.ReactNode;
  onItemClick: (item: MenuItem) => void;
};

export default function Dropdown({ menuItems, onItemClick, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
      )}

      <div className="relative">
        <div className="relative" onClick={() => setOpen(!open)} role="button">
          {children}
        </div>
        <div
          hidden={!open}
          className="absolute left-3 bg-white border rounded shadow p-2 z-20"
        >
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="p-1 flex items-center gap-2 cursor-pointer"
              onClick={() => {
                onItemClick(item);
                setOpen(false);
              }}
              role="button"
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
