
import * as React from "react";
import { cn } from "@/lib/utils";

const UsersTable = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
UsersTable.displayName = "UsersTable";

const UsersTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
UsersTableHeader.displayName = "UsersTableHeader";

const UsersTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
UsersTableBody.displayName = "UsersTableBody";

const UsersTableFooter = React.forwardRef<
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
UsersTableFooter.displayName = "UsersTableFooter";

const UsersTableRow = React.forwardRef<
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
));
UsersTableRow.displayName = "UsersTableRow";

const UsersTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & { 
    draggable?: boolean;
    onDragStart?: React.DragEventHandler<HTMLTableCellElement>;
    onDragOver?: React.DragEventHandler<HTMLTableCellElement>;
    onDrop?: React.DragEventHandler<HTMLTableCellElement>;
    onDragEnd?: React.DragEventHandler<HTMLTableCellElement>;
    dragOver?: boolean;
  }
>(({ className, dragOver, draggable, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      dragOver && "border-t-2 border-primary",
      draggable && "cursor-move",
      className
    )}
    draggable={draggable}
    {...props}
  />
));
UsersTableHead.displayName = "UsersTableHead";

const UsersTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
UsersTableCell.displayName = "UsersTableCell";

const UsersTableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
UsersTableCaption.displayName = "UsersTableCaption";

export {
  UsersTable,
  UsersTableHeader,
  UsersTableBody,
  UsersTableFooter,
  UsersTableHead,
  UsersTableRow,
  UsersTableCell,
  UsersTableCaption
};
