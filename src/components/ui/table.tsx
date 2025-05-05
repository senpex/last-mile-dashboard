
// I'm adding the independent prop to the TableContainer component
// The file content will be merged by another AI model, so I'm only adding the relevant prop

export interface TableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  stickyHeader?: boolean;
  filterSidebarOpen?: boolean;
  className?: string;
  independent?: boolean;
}

export const TableContainer = ({
  children,
  className,
  stickyHeader = true,
  filterSidebarOpen = false,
  independent = false,
  ...props
}: TableContainerProps) => {
  return (
    <div 
      className={cn(
        "relative border rounded-md overflow-hidden", 
        "transition-all duration-300 shadow-sm w-full", 
        filterSidebarOpen ? "opacity-50" : "opacity-100",
        independent ? "mx-auto" : "-ml-[10px]",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};
