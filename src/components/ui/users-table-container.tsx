
import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const UsersTableContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
  height?: string;
  stickyHeader?: boolean;
  independent?: boolean;
  filterSidebarOpen?: boolean;
}>(({
  className,
  height = "h-[calc(100vh-220px)]",
  stickyHeader = true,
  independent = false,
  filterSidebarOpen,
  ...props
}, ref) => (
  <div 
    ref={ref} 
    className={cn(
      "relative border rounded-md overflow-hidden flex-1", 
      "transition-all duration-300 shadow-sm", 
      "px-0 mt-0 mb-[5px]", 
      independent ? "mx-0" : "-ml-[10px]", 
      "w-full", 
      height, 
      className
    )}
  >
    <ScrollArea 
      orientation="both" 
      className={cn(
        "h-full w-full", 
        independent ? "mx-0" : "mx-0"
      )}
      independentPanel={true}
    >
      <div className="w-full">
        {props.children}
      </div>
    </ScrollArea>
  </div>
));

UsersTableContainer.displayName = "UsersTableContainer";

export { UsersTableContainer };
