
import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Pagination = ({
  className,
  ...props
}: React.ComponentProps<"nav">) => <nav role="navigation" aria-label="pagination" className={cn("mx-auto flex w-full justify-between items-center", className)} {...props} />;

Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(({
  className,
  ...props
}, ref) => <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />);

PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({
  className,
  ...props
}, ref) => <li ref={ref} className={cn("", className)} {...props} />);

PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & Pick<ButtonProps, "size"> & React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  disabled,
  size = "icon",
  ...props
}: PaginationLinkProps) => <a 
  aria-current={isActive ? "page" : undefined} 
  className={cn(
    buttonVariants({
      variant: isActive ? "outline" : "ghost",
      size
    }),
    disabled && "pointer-events-none opacity-50",
    className
  )} 
  {...props} 
/>;

PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => <PaginationLink aria-label="Go to previous page" size="default" className={cn("gap-1 pl-2.5", className)} {...props}>
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>;

PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => <PaginationLink aria-label="Go to next page" size="default" className={cn("gap-1 pr-2.5", className)} {...props}>
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>;

PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => <span aria-hidden className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>;

PaginationEllipsis.displayName = "PaginationEllipsis";

interface PaginationSizeProps {
  sizes: number[];
  pageSize: number;
  onChange: (size: number) => void;
  className?: string;
}

const PaginationSize = ({
  sizes,
  pageSize,
  onChange,
  className
}: PaginationSizeProps) => {
  // Guard against undefined or invalid pageSize
  const validPageSize = pageSize && sizes.includes(pageSize) ? pageSize.toString() : sizes[0].toString();
  
  return (
    <div className={cn("flex items-center gap-2 mx-[22px]", className)}>
      <span className="text-sm text-muted-foreground">Items per page</span>
      <Select value={validPageSize} onValueChange={value => onChange(parseInt(value))}>
        <SelectTrigger className="h-8 w-16">
          <SelectValue placeholder={validPageSize} />
        </SelectTrigger>
        <SelectContent>
          {sizes.map(size => (
            <SelectItem key={size} value={size.toString()}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

PaginationSize.displayName = "PaginationSize";

interface PaginationInfoProps {
  total: number;
  pageSize?: number;
  currentPage?: number;
}

const PaginationInfo = ({
  total,
  pageSize,
  currentPage
}: PaginationInfoProps) => {
  return (
    <div className="text-sm text-muted-foreground mx-[22px]">
      Total: <span className="bg-muted px-2 py-1 rounded">{total}</span>
    </div>
  );
};

PaginationInfo.displayName = "PaginationInfo";

export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationSize, PaginationInfo };
