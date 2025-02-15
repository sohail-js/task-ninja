import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Drawer from "./components/Drawer";
import Table from "./components/Table";
import Form from "./components/Form";
import { OPTIONS_PRIORITY, OPTIONS_STATUS } from "./constants";

function App() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(DATA);

  const addTaskHandler = () => {
    setOpen(true);
  };
  return (
    <>
      <div className="flex justify-between items-center p-4 pb-0.5">
        <h1 className="text-2xl font-bold">Task Ninja</h1>
        <Button mode="primary" onClick={addTaskHandler}>
          Create Task
        </Button>
      </div>

      <Drawer
        title="Create Task"
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Form
          fields={[
            { key: "title", label: "Title", type: "text" },
            {
              key: "priority",
              label: "Priority",
              type: "dropdown",
              dropdownOptions: [
                { value: "none", label: "None" },
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
                { value: "urgent", label: "Urgent" },
              ],
            },
            {
              key: "status",
              label: "Status",
              type: "dropdown",
              dropdownOptions: [
                { value: "not_started", label: "Not Started" },
                { value: "in_progress", label: "In Progress" },
                { value: "completed", label: "Completed" },
              ],
            },
          ]}
          onSubmit={(values) => {
            console.log(values);
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
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
