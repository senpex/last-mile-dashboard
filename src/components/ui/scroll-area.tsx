import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";
interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  orientation?: "vertical" | "horizontal" | "both";
  independentPanel?: boolean;
}
const ScrollArea = React.forwardRef<React.ElementRef<typeof ScrollAreaPrimitive.Root>, ScrollAreaProps>(({
  className,
  children,
  orientation = "vertical",
  independentPanel = false,
  ...props
}, ref) => <ScrollAreaPrimitive.Root ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
    <ScrollAreaPrimitive.Viewport className="h-full w-full mt-[10px] my-0">
      {children}
    </ScrollAreaPrimitive.Viewport>
    {(orientation === "vertical" || orientation === "both") && <ScrollBar orientation="vertical" />}
    {(orientation === "horizontal" || orientation === "both") && <ScrollBar orientation="horizontal" />}
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>);
const ScrollBar = React.forwardRef<React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>, React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>>(({
  className,
  orientation = "vertical",
  ...props
}, ref) => <ScrollAreaPrimitive.ScrollAreaScrollbar ref={ref} orientation={orientation} className={cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className)} {...props}>
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>);
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
export { ScrollArea, ScrollBar };