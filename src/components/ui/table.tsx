
const TableContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    height?: string;
    stickyHeader?: boolean;
  }
>(({ className, height = "h-[calc(100vh-230px)]", stickyHeader = true, ...props }, ref) => (
  <div 
    ref={ref}
    className={cn(
      "relative w-full border rounded-md overflow-x-auto", // Added overflow-x-auto 
      height, 
      className
    )} 
    {...props} 
  />
))
TableContainer.displayName = "TableContainer"
