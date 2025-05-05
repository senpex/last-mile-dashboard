
import * as React from "react";
import { cn } from "@/lib/utils";

// Basic table components
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn("w-full caption-bottom text-sm", className)}
    {...props}
  />
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    dragOver?: boolean;
  }
>(({ className, dragOver, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      dragOver ? "border-primary/30 bg-primary/10" : "",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & {
    dragOver?: boolean;
    sortable?: boolean;
    sortDirection?: "ascending" | "descending" | null;
    onSort?: () => void;
  }
>(({ className, children, dragOver, sortable, sortDirection, onSort, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      dragOver ? "border-primary/30 bg-primary/10" : "",
      sortable ? "cursor-pointer select-none" : "",
      className
    )}
    onClick={sortable ? onSort : undefined}
    {...props}
  >
    {sortable ? (
      <div className="flex items-center gap-1">
        {children}
        {sortDirection ? (
          sortDirection === 'ascending' ? (
            <ArrowUp className="ml-1 h-3.5 w-3.5 text-muted-foreground/70" />
          ) : (
            <ArrowDown className="ml-1 h-3.5 w-3.5 text-muted-foreground/70" />
          )
        ) : (
          <div className="ml-1 h-3.5 w-3.5" />
        )}
      </div>
    ) : (
      children
    )}
  </th>
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

// Container for the table component
export interface TableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  stickyHeader?: boolean;
  filterSidebarOpen?: boolean;
  className?: string;
  independent?: boolean;
}

export const TableContainer = ({
  children,
  className,
  stickyHeader = true,
  filterSidebarOpen = false,
  independent = false,
  ...props
}: TableContainerProps) => {
  return (
    <div 
      className={cn(
        "relative border rounded-md overflow-hidden", 
        "transition-all duration-300 shadow-sm w-full", 
        filterSidebarOpen ? "opacity-50" : "opacity-100",
        independent ? "mx-auto" : "-ml-[10px]",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

const ArrowUp = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);

const ArrowDown = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </svg>
);

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell
};
