import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Drawer from "./components/Drawer";
import { Table } from "./components/Table";
import { Form } from "./components/Form";
import { DEFAULT_COLUMNS, LOCAL_STORAGE_KEYS } from "./constants";
import { HiPlus, HiTrash } from "react-icons/hi2";
import { getLocalStorage, setLocalStorage } from "./services/localStorage";
import ColumnsConfig from "./components/ColumnsConfig";
import { CustomField } from "./types";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

type RecordItem = {
  id: string | number;
  title: string;
  priority: string;
  status: string;
};

function App() {
  const [open, setOpen] = useState(false);
  const { data: customColumns, setData: setCustomColumns } =
    useLocalStorageState<CustomField[]>({
      localStorageKey: LOCAL_STORAGE_KEYS.columns,
      defaultValue: DEFAULT_COLUMNS,
    });

  const [data, setData] = useState<RecordItem[]>(
    getLocalStorage(LOCAL_STORAGE_KEYS.tasks) ?? []
  );
  const [editData, setEditData] = useState<RecordItem>();

  const addTaskHandler = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
    setEditData(undefined);
  };

  useEffect(() => {
    console.log("Data changed");
    setLocalStorage(LOCAL_STORAGE_KEYS.tasks, data);
  }, [data]);

  return (
    <>
      <div className="flex justify-between items-center p-4 pb-0.5">
        <h1 className="text-2xl font-bold">Task Ninja</h1>

        <div className="flex items-center gap-2">
          <ColumnsConfig
            columns={[...DEFAULT_COLUMNS, ...customColumns]}
            onColumnsChange={(columns) => {
              // saving only custom columns
              setCustomColumns(columns.filter((col) => col.editable));
            }}
          />

          <Button mode="primary" onClick={addTaskHandler} prefix={<HiPlus />}>
            Create Task
          </Button>
        </div>
      </div>

      <Drawer title="Create Task" isOpen={open} onClose={closeDrawer}>
        {open && (
          <Form
            fields={[...DEFAULT_COLUMNS, ...customColumns]}
            defaultValues={editData}
            onSubmit={(values: any) => {
              if (editData) {
                setData((prevData) => {
                  const index = prevData.findIndex(
                    (item) => item.id === editData.id
                  );
                  prevData[index] = {
                    id: editData.id,
                    ...values,
                  };
                  return [...prevData];
                });
              } else {
                setData((prevData) => [
                  ...prevData,
                  {
                    id: crypto.randomUUID(),
                    ...values,
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
          columns={[...DEFAULT_COLUMNS, ...customColumns]}
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
          allowSort
          selectable
          showPagination
          showFilters
        />
      </div>
    </>
  );
}

export default App;
