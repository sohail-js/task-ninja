import { useState } from "react";
import { Modal } from "../Modal";
import { useTable } from "./TableContext";
import { MenuItem } from "../../types";
import { HiTrash } from "react-icons/hi";

type Props = {};

export default function TableSelection({}: Props) {
  const {
    selectedRowsArray,
    handleDelete,
    deleteModalOpen,
    handleClose,
    handleConfirmDelete,
  } = useTableSelection();

  const { setSelectedRows } = useTable();

  return (
    <div className="ml-6">
      {selectedRowsArray.length > 0 && (
        <div className="flex items-center rounded-md overflow-hidden">
          <div
            role="button"
            className="border-r-1 px-2 py-1 bg-blue-300 hover:bg-blue-400 transition-colors text-gray-900 cursor-pointer whitespace-nowrap"
            onClick={() => setSelectedRows({})}
          >
            {selectedRowsArray.length} rows selected
          </div>
          <div
            role="button"
            className="px-2 py-2 bg-red-300 hover:bg-red-400 transition-colors text-gray-900 h-full cursor-pointer"
            onClick={handleDelete}
          >
            <HiTrash />
          </div>
        </div>
      )}

      <Modal
        title="Delete"
        isOpen={deleteModalOpen}
        onClose={handleClose}
        footerOptions={[
          {
            label: "Cancel",
            mode: "secondary",
            value: "cancel",
          },
          {
            label: "Delete",
            mode: "danger",
            value: "delete",
          },
        ]}
        onFooterOptionClick={handleConfirmDelete}
      >
        Are you sure you want to delete the selected rows?
      </Modal>
    </div>
  );
}

function useTableSelection() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { selectedRows, setSelectedRows, data, onDataChange, keyProp } =
    useTable();
  const selectedRowsArray = Object.entries(selectedRows)
    .filter(([_, value]) => value)
    .map(([key]) => key);

  const handleConfirmDelete = (option: MenuItem) => {
    if (option.value === "delete") {
      // Delete the selected rows
      onDataChange?.(data.filter((row) => !selectedRows[row[keyProp]]));
    }

    handleClose();
  };

  const handleClose = () => {
    setDeleteModalOpen(false);
    setSelectedRows({});
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  return {
    selectedRowsArray,
    handleDelete,
    deleteModalOpen,
    handleClose,
    handleConfirmDelete,
  };
}
