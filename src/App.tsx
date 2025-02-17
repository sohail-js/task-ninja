import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Drawer from "./components/Drawer";
import { Table } from "./components/Table";
import { Form } from "./components/Form";
import { OPTIONS_PRIORITY, OPTIONS_STATUS } from "./constants";
import { HiTrash } from "react-icons/hi2";

type RecordItem = {
  id: string | number;
  title: string;
  priority: string;
  status: string;
};

function App() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<RecordItem[]>(DATA);
  const [editData, setEditData] = useState<RecordItem>();

  const addTaskHandler = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
    setEditData(undefined);
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 pb-0.5">
        <h1 className="text-2xl font-bold">Task Ninja</h1>
        <Button mode="primary" onClick={addTaskHandler}>
          Create Task
        </Button>
      </div>

      <Drawer title="Create Task" isOpen={open} onClose={closeDrawer}>
        {open && (
          <Form
            fields={[
              { key: "title", label: "Title", type: "text", required: true },
              {
                key: "priority",
                label: "Priority",
                type: "dropdown",
                dropdownOptions: OPTIONS_PRIORITY,
              },
              {
                key: "status",
                label: "Status",
                type: "dropdown",
                dropdownOptions: OPTIONS_STATUS,
              },
            ]}
            defaultValues={editData}
            onSubmit={(values) => {
              if (editData) {
                setData((prevData) => {
                  const index = prevData.findIndex(
                    (item) => item.id === editData.id
                  );
                  prevData[index] = {
                    id: editData.id,
                    title: values.title,
                    priority: values.priority,
                    status: values.status,
                  };
                  return [...prevData];
                });
              } else {
                setData((prevData) => [
                  ...prevData,
                  {
                    id: crypto.randomUUID(),
                    title: values.title,
                    priority: values.priority,
                    status: values.status,
                  },
                ]);
              }
              closeDrawer();
            }}
            onCancel={() => {
              closeDrawer();
            }}
          />
        )}
      </Drawer>

      <div className="w-full p-4">
        <Table
          className="w-full p-4"
          columns={[
            { key: "title", label: "Title", type: "text" },
            {
              key: "priority",
              label: "Priority",
              type: "dropdown",
              dropdownOptions: OPTIONS_PRIORITY,
            },
            {
              key: "status",
              label: "Status",
              type: "dropdown",
              dropdownOptions: OPTIONS_STATUS,
            },
          ]}
          keyProp="id"
          data={data}
          onRecordOpen={(record) => {
            setEditData(record);
            setOpen(true);
          }}
          contextMenuOptions={[
            {
              label: "Delete",
              onClick: (record) => {
                if (confirm("Are you sure you want to delete this record?")) {
                  setData((prevData) =>
                    prevData.filter((item) => item.id !== record.id)
                  );
                }
              },
              icon: <HiTrash />,
            },
          ]}
        />
      </div>
    </>
  );
}

export default App;

const DATA = [
  {
    id: 1,
    title: "Write project proposal",
    status: "in_progress",
    priority: "high",
  },
  {
    id: 2,
    title: "Fix login page bug",
    status: "not_started",
    priority: "none",
  },
];
