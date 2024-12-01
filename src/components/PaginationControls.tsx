// src/components/PaginationControls.tsx
import React from "react";
import { PaginationControlsProps } from "../types";

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  handlePreviousPage,
  handleNextPage,
  isPreviousDisabled,
  isNextDisabled,
}) => (
  <div className="flex justify-between mt-4">
    <button
      onClick={handlePreviousPage}
      className={`p-2 text-white border-none rounded ${
        isPreviousDisabled ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-400"
      }`}
      disabled={isPreviousDisabled}
    >
      Previous
    </button>
    <button
      onClick={handleNextPage}
      className={`p-2 text-white border-none rounded ${
        isNextDisabled ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-400"
      }`}
      disabled={isNextDisabled}
    >
      Next
    </button>
  </div>
);

export default PaginationControls;
