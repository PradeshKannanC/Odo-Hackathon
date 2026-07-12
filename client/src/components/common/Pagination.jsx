import Button from "./Button";

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const goTo = (nextPage) => {
    if (nextPage >= 1 && nextPage <= totalPages) onPageChange(nextPage);
  };

  return (
    <div className="flex items-center justify-between gap-4 text-sm text-text/70 mt-4">
      <span>
        Page {page} of {totalPages}
      </span>
      <div className="flex gap-2">
        <Button variant="neutral" className="px-3 py-1.5" onClick={() => goTo(page - 1)} disabled={page <= 1}>
          Previous
        </Button>
        <Button
          variant="neutral"
          className="px-3 py-1.5"
          onClick={() => goTo(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
