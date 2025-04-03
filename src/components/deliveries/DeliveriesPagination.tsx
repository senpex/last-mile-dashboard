
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationInfo,
  PaginationSize
} from "@/components/ui/pagination";

interface DeliveriesPaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  pageSizeOptions: number[];
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (size: number) => void;
}

const DeliveriesPagination: React.FC<DeliveriesPaginationProps> = ({
  totalItems,
  pageSize,
  currentPage,
  pageSizeOptions,
  handlePageChange,
  handlePageSizeChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 3) {
        end = Math.min(4, totalPages - 1);
      }
      
      if (currentPage >= totalPages - 2) {
        start = Math.max(totalPages - 3, 2);
      }
      
      if (start > 2) {
        pages.push(-1); // Add ellipsis after first page
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push(-2); // Add ellipsis before last page
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="border-t bg-background px-4 py-3 flex justify-between items-center shadow-sm flex-shrink-0">
      {/* Updated to show "Total: X" instead of "Showing X-Y of Z items" */}
      <div className="text-sm text-muted-foreground">
        Total: {totalItems}
      </div>
      
      <Pagination className="flex-1 flex justify-center">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(1);
              }}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              aria-disabled={currentPage === 1}
            >
              <span className="sr-only">First page</span>
              ⟪
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>
          
          {getPageNumbers().map((page, i) => (
            <PaginationItem key={i}>
              {page === -1 || page === -2 ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink 
                  href="#" 
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              aria-disabled={currentPage === totalPages}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(totalPages);
              }}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              aria-disabled={currentPage === totalPages}
            >
              <span className="sr-only">Last page</span>
              ⟫
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
      <PaginationSize
        sizes={pageSizeOptions}
        pageSize={pageSize}
        onChange={handlePageSizeChange}
      />
    </div>
  );
};

export default DeliveriesPagination;
