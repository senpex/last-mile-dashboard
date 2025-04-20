import * as React from "react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronUp, ChevronDown } from "lucide-react"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b-0 mt-0", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

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
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & { 
    dragOver?: boolean;
    sortable?: boolean;
    sortDirection?: 'ascending' | 'descending' | null;
    onSort?: () => void;
  }
>(({ className, dragOver, sortable, sortDirection, onSort, children, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      dragOver && "border-t-2 border-primary",
      sortable && "cursor-pointer select-none",
      className
    )}
    onClick={sortable ? onSort : undefined}
    {...props}
  >
    <div className="flex items-center gap-1">
      {children}
      {sortable && sortDirection === 'ascending' && (
        <ChevronUp className="h-4 w-4 text-red-500" />
      )}
      {sortable && sortDirection === 'descending' && (
        <ChevronDown className="h-4 w-4 text-red-500" />
      )}
    </div>
  </th>
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

const TableContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    height?: string;
    stickyHeader?: boolean;
    filterSidebarOpen?: boolean;
  }
>(({ 
  className, 
  height = "h-[calc(100vh-280px)]", 
  stickyHeader = true,
  filterSidebarOpen = false,
  ...props 
}, ref) => (
  <div 
    ref={ref}
    className={cn(
      "relative border rounded-md overflow-hidden flex-shrink-0",
      "transition-all duration-300 shadow-sm", 
      filterSidebarOpen ? "w-full" : "w-full", 
      height, 
      "mr-[5px]", 
      className
    )} 
    style={{
      scrollbarWidth: 'thin',
      scrollbarColor: '#cbd5e1 transparent',
    }}
    {...props} 
  >
    <ScrollArea orientation="both" className="h-full w-full">
      <div className="min-w-max">
        {props.children}
      </div>
    </ScrollArea>
  </div>
))
TableContainer.displayName = "TableContainer"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableContainer
}
