import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type TablePaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
};

export default function TablePagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize = 10,
  onPageChange,
}: TablePaginationProps) {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const end =
    totalItems !== undefined ? Math.min(currentPage * pageSize, totalItems) : 0;

  return (
    <div className="flex items-center justify-between border-t px-6 py-4">
      <p className="text-sm text-muted-foreground">
        {totalItems !== undefined ? (
          <>
            Showing{" "}
            <span className="font-medium text-foreground">
              {start}–{end}
            </span>{" "}
            of <span className="font-medium text-foreground">{totalItems}</span>
          </>
        ) : (
          <>
            Page{" "}
            <span className="font-medium text-foreground">{currentPage}</span>{" "}
            of <span className="font-medium text-foreground">{totalPages}</span>
          </>
        )}
      </p>

      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              aria-disabled={currentPage <= 1}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
              }
              onClick={(e) => {
                e.preventDefault();

                if (currentPage > 1) {
                  onPageChange(currentPage - 1);
                }
              }}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              aria-disabled={currentPage >= totalPages}
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
              onClick={(e) => {
                e.preventDefault();

                if (currentPage < totalPages) {
                  onPageChange(currentPage + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
