
import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const UsersTableContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    height?: string;
    stickyHeader?: boolean;
  }
>(({ 
  className, 
  height = "h-[calc(100vh-220px)]", // Reduced height by 10px 
  stickyHeader = true,
  ...props 
}, ref) => (
  <div 
    ref={ref}
    className={cn(
      "relative border rounded-md overflow-hidden flex-shrink-0 w-full sticky top-0",
      "transition-all duration-300 shadow-sm", 
      "px-0 mt-0 mb-[5px]", // Remove top margin
      height, 
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

UsersTableContainer.displayName = "UsersTableContainer"

export { UsersTableContainer }
