
import * as React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DataTableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string;
  stickyHeader?: boolean;
}

const DataTableContainer = React.forwardRef<
  HTMLDivElement,
  DataTableContainerProps
>(({
  className,
  height = "auto",
  stickyHeader = false,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative border rounded-md overflow-hidden flex-shrink-0",
      "transition-all duration-300 shadow-sm",
      "w-full",
      height !== "auto" && height,
      className
    )}
    style={{
      scrollbarWidth: 'thin',
      scrollbarColor: '#cbd5e1 transparent',
    }}
    {...props}
  >
    <ScrollArea orientation="both" className="h-full w-full">
      {props.children}
    </ScrollArea>
  </div>
))

DataTableContainer.displayName = "DataTableContainer";

export { DataTableContainer };
