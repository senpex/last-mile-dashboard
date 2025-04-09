
const TableContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    height?: string;
    stickyHeader?: boolean;
    filterSidebarOpen?: boolean;
  }
>(({ 
  className, 
  height = "h-[calc(100vh-230px)]", 
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
      "mr-[3px] ml-[3px] mt-[3px]", // Adjusted margins to 3px on right, left, and top
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
