import TablePageSize from "./TablePageSize";
import TablePageNumbers from "./TablePageNumbers";
import classNames from "classnames";

type Props = {
  className?: string;
};

export default function TablePagination({ className }: Props) {
  return (
    <div
      className={classNames(className, "flex items-center gap-3 justify-end")}
    >
      <TablePageSize />
      <TablePageNumbers />
    </div>
  );
}
