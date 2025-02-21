import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Button from "../Button";
import { useTable } from "./TableContext";
import React from "react";

type Props = {};

export default function TablePageNumbers({}: Props) {
  const { totalPages, pageNumbers, setCurrentPage, currentPage } =
    useTablePageNumbers();

  return (
    <div className="flex items-center gap-2">
      <Button
        mode="secondary"
        className="border border-gray-200 rounded px-2"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        prefix={<HiChevronDoubleLeft />}
      >
        Prev
      </Button>

      {pageNumbers.map((page, index) => (
        <React.Fragment key={page}>
          {index > 0 && page !== pageNumbers[index - 1] + 1 && (
            <span className="px-2">...</span>
          )}
          <Button
            mode={currentPage === page ? "primary" : "secondary"}
            className="border border-gray-200 rounded px-2"
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        </React.Fragment>
      ))}

      <Button
        mode="secondary"
        className="border border-gray-200 rounded px-2"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        postfix={<HiChevronDoubleRight />}
      >
        Next
      </Button>
    </div>
  );
}

function useTablePageNumbers() {
  const { pageSize, data, currentPage, setCurrentPage } = useTable();
  const totalRecords = data.length;
  const totalPages = Math.ceil(totalRecords / pageSize);

  const getPageNumbers = () => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages = new Set<number>();

    pages.add(1);
    pages.add(2);
    pages.add(totalPages);
    pages.add(totalPages - 1);
    pages.add(currentPage);
    pages.add(currentPage - 1);
    pages.add(currentPage + 1);

    return [...pages]
      .filter((page) => page >= 1 && page <= totalPages)
      .sort((a, b) => a - b);
  };

  const pageNumbers = getPageNumbers();

  return {
    totalPages,
    pageNumbers,
    setCurrentPage,
    currentPage,
  };
}
