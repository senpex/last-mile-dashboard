
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

interface UsersTableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string;
  stickyHeader?: boolean;
}

const UsersTableContainer = React.forwardRef<
  HTMLDivElement,
  UsersTableContainerProps
>(({ 
  className, 
  height = "h-[calc(100vh-230px)]", 
  stickyHeader = true,
  ...props 
}, ref) => (
  <div 
    ref={ref}
    className={cn(
      "relative border rounded-md overflow-hidden",
      "transition-all duration-300 shadow-sm", 
      "w-full",
      height,
      className
    )}
    style={{
      scrollbarWidth: 'thin',
      scrollbarColor: '#cbd5e1 transparent',
    }}
    {...props} 
  >
    <UsersScrollArea orientation="both" className="h-full w-full">
      {props.children}
    </UsersScrollArea>
  </div>
));
UsersTableContainer.displayName = "UsersTableContainer";

// Creating a separate ScrollArea component specifically for users pages
const UsersScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    orientation?: "vertical" | "horizontal" | "both";
  }
>(({
  className,
  children,
  orientation = "vertical",
  ...props
}, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    
    {(orientation === "vertical" || orientation === "both") && (
      <UsersScrollBar orientation="vertical" />
    )}
    
    {(orientation === "horizontal" || orientation === "both") && (
      <UsersScrollBar orientation="horizontal" />
    )}
    
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));

UsersScrollArea.displayName = "UsersScrollArea";

const UsersScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({
  className,
  orientation = "vertical",
  ...props
}, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && 
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && 
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));

UsersScrollBar.displayName = "UsersScrollBar";

export { UsersTableContainer };
