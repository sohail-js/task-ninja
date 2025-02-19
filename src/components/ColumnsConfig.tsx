import { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import Drawer from "./Drawer";
import { Table } from "./Table";
import { HiPlus, HiViewColumns } from "react-icons/hi2";
import Button from "./Button";
import { CustomField } from "../types";

type Props = {
  columns: CustomField[];
  onColumnsChange: (columns: CustomField[]) => void;
};

export default function ColumnsConfig({ columns, onColumnsChange }: Props) {
  const [openColumnsConfig, setOpenColumnsConfig] = useState(false);
  const [data, setData] = useState(columns);

  useEffect(() => {
    setData(columns);
  }, [columns]);

  const handleCancel = () => {
    setOpenColumnsConfig(false);
    setData([]);
  };

  const handleSave = () => {
    setOpenColumnsConfig(false);
    onColumnsChange(data);
  };

  const handleOpenColumnsConfig = () => {
    setOpenColumnsConfig(true);
    setData(columns);
  };

  const handleAddColumn = () => {
    setData([
      ...data,
      {
        key: `custom-${crypto.randomUUID()}`,
        label: "Custom Field",
        type: "text",
        visible: true,
        editable: true,
      },
    ]);
  };

  return (
    <>
      <Button
        mode="secondary"
        onClick={handleOpenColumnsConfig}
        prefix={<HiViewColumns />}
      >
        Columns Config
      </Button>
      <Drawer
        title="Columns Config"
        isOpen={openColumnsConfig}
        onClose={() => setOpenColumnsConfig(false)}
      >
        <div className="flex items-center justify-end p-4">
          <Button mode="primary" prefix={<HiPlus />} onClick={handleAddColumn}>
            Add Column
          </Button>
        </div>
        <div className="content">
          <Table
            columns={[
              {
                key: "visible",
                label: "Visible",
                type: "checkbox",
              },
              {
                key: "label",
                label: "Label",
                type: "text",
              },
              {
                key: "type",
                label: "Type",
                type: "dropdown",
                dropdownOptions: [
                  { label: "Text", value: "text" },
                  { label: "Checkbox", value: "checkbox" },
                ],
              },
              {
                key: "required",
                label: "Required",
                type: "checkbox",
              },
            ]}
            actions={[
              {
                key: "delete",
                label: <HiTrash />,
              },
            ]}
            onActionClick={(action, record: CustomField) => {
              if (action === "delete" && record.editable) {
                setData((prevData) => {
                  return prevData.filter((item) => item.key !== record.key);
                });
              }
            }}
            data={data}
            keyProp="key"
            inlineEditable
            onDataChange={(data) => {
              setData(data);
            }}
          />
        </div>

        <div className="flex items-center justify-end gap-2 mt-2">
          <Button mode="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button mode="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Drawer>
    </>
  );
}
