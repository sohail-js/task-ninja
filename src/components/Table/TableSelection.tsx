import { useState } from "react";
import { Modal } from "../Modal";
import { useTable } from "./TableContext";
import { MenuItem } from "../../types";
import Button from "../Button";
import { HiTrash } from "react-icons/hi";

type Props = {};

export default function TableSelection({}: Props) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { selectedRows, setSelectedRows, data, onDataChange, keyProp } =
    useTable();
  const selectedRowsArray = Object.entries(selectedRows)
    .filter(([_, value]) => value)
    .map(([key]) => key);

  const handleConfirmDelete = (option: MenuItem) => {
    if (option.value === "cancel") {
      handleClose();
      return;
    }

    // Delete the selected rows
    onDataChange?.(data.filter((row) => !selectedRows[row[keyProp]]));
    setSelectedRows({});
    setDeleteModalOpen(false);
  };

  const handleClose = () => {
    setDeleteModalOpen(false);
    setSelectedRows({});
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  return (
    <div className="ml-6">
      {selectedRowsArray.length > 0 && (
        <div className="flex">
          <Button mode="primary" onClick={() => setSelectedRows({})}>
            {selectedRowsArray.length} rows selected
          </Button>
          <Button mode="danger" onClick={handleDelete}>
            <HiTrash />
          </Button>
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
