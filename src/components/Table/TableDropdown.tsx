import Dropdown from "../Dropdown";
import Button from "../Button";
import { HiDotsHorizontal } from "react-icons/hi";
import { useTable } from "./TableContext";

export default function TableDropdown({ row }: { row: any }) {
  const { contextMenuOptions } = useTable();

  return (
    <Dropdown
      menuItems={(contextMenuOptions ?? []).map((option) => ({
        label: option.label,
        icon: option.icon,
      }))}
      onItemClick={(item) => {
        const option = contextMenuOptions?.find(
          (option) => option.label === item.label
        );
        option?.onClick(row);
      }}
    >
      <Button mode="link" size="sm">
        <HiDotsHorizontal />
      </Button>
    </Dropdown>
  );
}
