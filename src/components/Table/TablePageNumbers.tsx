import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Button from "../Button";
import { useTable } from "./TableContext";

type Props = {};

export default function TablePageNumbers({}: Props) {
  const { pageSize, data, currentPage, setCurrentPage } = useTable();
  const totalRecords = data.length;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex items-center gap-2">
      {/* <div>Page {currentPage}</div>
      <div>of {Math.ceil(totalRecords / pageSize)}</div> */}
      <Button
        mode="secondary"
        className="border border-gray-200 rounded px-2"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        prefix={<HiChevronDoubleLeft />}
      >
        Prev
      </Button>
      {totalPagesArray.map((page) => (
        <Button
          key={page}
          mode={currentPage === page ? "primary" : "secondary"}
          className="border border-gray-200 rounded px-2"
          onClick={() => setCurrentPage(page)}
          // disabled={currentPage === page}
        >
          {page}
        </Button>
      ))}
      <Button
        mode="secondary"
        className="border border-gray-200 rounded px-2"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === Math.ceil(totalRecords / pageSize)}
        postfix={<HiChevronDoubleRight />}
      >
        Next
      </Button>
    </div>
  );
}
