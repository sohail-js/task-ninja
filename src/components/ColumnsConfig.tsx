import { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import Drawer from "./Drawer";
import { Table } from "./Table";
import { HiPlus, HiViewColumns } from "react-icons/hi2";
import Button from "./Button";
import { Field } from "../types";
import { DEFAULT_COLUMNS } from "../constants";

type Props = {
  columns: Field[];
  onColumnsChange: (columns: Field[]) => void;
};

export default function ColumnsConfig({ columns, onColumnsChange }: Props) {
  const [openColumnsConfig, setOpenColumnsConfig] = useState(false);
  const [data, setData] = useState(columns);
  const [valid, setValid] = useState(true);

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
        title="Columns Config"
      >
        <span className="hidden md:inline">Columns Config</span>
      </Button>
      <Drawer
        title="Columns Config"
        isOpen={openColumnsConfig}
        onClose={() => setOpenColumnsConfig(false)}
      >
        <div className="flex items-center justify-end py-4">
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
                required: true,
                unique: true,
                pattern: /^[a-zA-Z0-9_ ]+$/,
                tableColumnClassName: "min-w-40 max-w-40",
              },
              {
                key: "type",
                label: "Type",
                type: "dropdown",
                dropdownOptions: [
                  { label: "Text", value: "text" },
                  { label: "Number", value: "number" },
                  { label: "Checkbox", value: "checkbox" },
                ],
                tableColumnClassName: "min-w-35 max-w-35",
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
            onActionClick={(action, record: Field) => {
              if (action === "delete" && record.editable) {
                setData((prevData) => {
                  return prevData.filter((item) => item.key !== record.key);
                });
              }
            }}
            data={data}
            keyProp="key"
            inlineEditable
            disabledRowIds={DEFAULT_COLUMNS.map((item) => item.key)}
            onDataChange={(data) => {
              setData(data);
            }}
            onValidityChange={(valid) => {
              setValid(valid);
            }}
          />
        </div>

        <div className="flex items-center justify-end gap-2 mt-2">
          <Button mode="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button mode="primary" onClick={handleSave} disabled={!valid}>
            Save
          </Button>
        </div>
      </Drawer>
    </>
  );
}
