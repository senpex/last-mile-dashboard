
import React from 'react';
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

interface DeliveryPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  pageNumbers: number[];
  pageSizeOptions: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function DeliveryPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  pageNumbers,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange
}: DeliveryPaginationProps) {
  return (
    <div className="border-t bg-background px-4 py-3 flex justify-between items-center shadow-sm flex-shrink-0">
      <PaginationInfo 
        total={totalItems} 
        pageSize={pageSize} 
        currentPage={currentPage} 
      />
      
      <Pagination className="flex-1 flex justify-center">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(1);
              }}
              disabled={currentPage === 1}
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
                onPageChange(currentPage - 1);
              }}
              disabled={currentPage === 1}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>
          
          {pageNumbers.map((page, i) => (
            <PaginationItem key={i}>
              {page === -1 || page === -2 ? (
                <PaginationEllipsis />
              ) : (
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
              )}
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage + 1);
              }}
              disabled={currentPage === totalPages}
              aria-disabled={currentPage === totalPages}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(totalPages);
              }}
              disabled={currentPage === totalPages}
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
        onChange={onPageSizeChange}
      />
    </div>
  );
}
