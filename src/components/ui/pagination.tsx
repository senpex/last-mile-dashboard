
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const paginationVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-secondary data-[state=open]:text-secondary-foreground",
  {
    defaultVariants: {
      size: "default",
    },
    variants: {
      size: {
        default: "h-9 px-4",
        sm: "h-8 px-3",
        lg: "h-10 px-5",
      },
    },
  }
)

export interface PaginationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof paginationVariants> {}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(paginationVariants({ size, className }))}
      {...props}
    />
  )
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<typeof Button>

const PaginationLink = React.forwardRef<
  HTMLButtonElement, 
  PaginationLinkProps
>(({ className, isActive, size = "icon", ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(
        "gap-1 rounded-none first:rounded-l-md last:rounded-r-md",
        className
      )}
      {...props}
    />
  )
})
PaginationLink.displayName = "PaginationLink"

const PaginationNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="outline"
    size="icon"
    className={cn(
      "inline-flex items-center justify-center rounded-md border border-border bg-background p-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
      className
    )}
    {...props}
  />
))
PaginationNext.displayName = "PaginationNext"

const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="outline"
    size="icon"
    className={cn(
      "inline-flex items-center justify-center rounded-md border border-border bg-background p-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
      className
    )}
    {...props}
  />
))
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("h-8 w-8 text-sm font-medium", className)} {...props} />
))
PaginationEllipsis.displayName = "PaginationEllipsis"

interface PaginationInfoProps {
  total: number;
  pageSize: number;
  currentPage: number;
}

const PaginationInfo = ({ total, pageSize, currentPage }: PaginationInfoProps) => {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);

  return (
    <div className="text-sm text-muted-foreground">
      Showing {start}-{end} of {total}
    </div>
  );
};
PaginationInfo.displayName = "PaginationInfo";

interface PaginationSizeProps {
  sizes: number[];
  pageSize: number;
  onChange: (size: number) => void;
}

const PaginationSize = ({ sizes, pageSize, onChange }: PaginationSizeProps) => {
  return (
    <div className="flex items-center space-x-2 text-sm">
      <label htmlFor="pageSize" className="text-muted-foreground">
        Rows per page
      </label>
      <select
        id="pageSize"
        className="border border-input bg-background text-sm rounded-md h-8 w-20 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        value={pageSize}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {sizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};
PaginationSize.displayName = "PaginationSize";

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationInfo,
  PaginationSize
}
