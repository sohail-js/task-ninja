import FormItemSelect from "../Form/FormItemSelect";
import { useTable } from "./TableContext";

type Props = {};

export default function TablePageSize({}: Props) {
  const { pageSize, setPageSize, setCurrentPage } = useTable();
  return (
    <div className="flex items-center">
      <div className="mr-2">Rows per page:</div>
      <FormItemSelect
        className="w-20"
        field={{
          label: "",
          key: "pageSize",
          type: "dropdown",
          dropdownOptions: [
            { label: "10", value: 10 },
            { label: "25", value: 25 },
            { label: "50", value: 50 },
            { label: "100", value: 100 },
          ],
        }}
        value={pageSize}
        onChange={(value) => {
          setPageSize(value as number);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}
