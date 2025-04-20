import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Slider } from "./slider";

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
}, ref) => {
  const [padding, setPadding] = React.useState(8); // 8px default padding
  const [margin, setMargin] = React.useState(0);

  return (
    <ScrollAreaPrimitive.Root 
      ref={ref} 
      className={cn("relative overflow-hidden", className)} 
      {...props}
    >
      <div className={cn(
        "isolate relative w-full h-full",
        "transition-all duration-200",
        independentPanel && "flex flex-col"
      )} style={{ padding: `${padding}px`, margin: `${margin}px` }}>
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="absolute top-2 right-2 z-50"
            >
              Edit Layout
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Padding ({padding}px)</h4>
                <Slider
                  value={[padding]}
                  onValueChange={(value) => setPadding(value[0])}
                  min={0}
                  max={32}
                  step={2}
                />
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Margin ({margin}px)</h4>
                <Slider
                  value={[margin]}
                  onValueChange={(value) => setMargin(value[0])}
                  min={0}
                  max={32}
                  step={2}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <ScrollAreaPrimitive.Viewport 
          className={cn(
            "absolute z-0 inset-0 h-full w-full rounded-[inherit]",
            independentPanel && "relative flex-1 overflow-y-auto"
          )}
        >
          {children}
        </ScrollAreaPrimitive.Viewport>
      </div>
      {(orientation === "vertical" || orientation === "both") && <ScrollBar orientation="vertical" />}
      {(orientation === "horizontal" || orientation === "both") && <ScrollBar orientation="horizontal" />}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>, React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>>(({
  className,
  orientation = "vertical",
  ...props
}, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
