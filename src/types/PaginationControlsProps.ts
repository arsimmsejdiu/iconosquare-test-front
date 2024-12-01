export interface PaginationControlsProps {
  currentPage: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}
