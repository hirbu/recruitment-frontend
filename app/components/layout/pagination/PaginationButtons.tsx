import Pagination from "@/interfaces/Pagination";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { IconButton } from "@mui/material";

interface PaginationButtonsProps {
  pagination: Pagination;
  updateCurrentPage: (page: number) => void;
}

const PaginationButtons = ({
  pagination,
  updateCurrentPage,
}: PaginationButtonsProps) => {
  if (!pagination.current) {
    return null;
  }

  const handleFirstPage = () => {
    if (!pagination.first) return;

    updateCurrentPage(pagination.first);
  };

  const handleLastPage = () => {
    if (!pagination.last) return;

    updateCurrentPage(pagination.last);
  };

  const handlePreviousPage = () => {
    if (!pagination.previous) return;

    updateCurrentPage(pagination.previous);
  };

  const handleNextPage = () => {
    if (!pagination.next) return;

    updateCurrentPage(pagination.next);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <IconButton
        aria-label="First Page"
        onClick={handleFirstPage}
        disabled={!pagination.first || pagination.current === pagination.first}
      >
        <FirstPageIcon />
      </IconButton>

      <IconButton
        aria-label="Previous Page"
        onClick={handlePreviousPage}
        disabled={!pagination.previous}
      >
        <NavigateBeforeIcon />
      </IconButton>

      <div className="font-bold">
        {pagination.current} / {pagination.last}
      </div>

      <IconButton
        aria-label="Next Page"
        onClick={handleNextPage}
        disabled={!pagination.next}
      >
        <NavigateNextIcon />
      </IconButton>

      <IconButton
        aria-label="Last Page"
        onClick={handleLastPage}
        disabled={!pagination.last || pagination.current === pagination.last}
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
};

export default PaginationButtons;
