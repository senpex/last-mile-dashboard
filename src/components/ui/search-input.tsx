
"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./input";

interface SearchInputProps extends React.ComponentProps<typeof Input> {
  placeholder?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(({
  className,
  placeholder = "Search...",
  ...props
}, ref) => {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input 
        ref={ref} 
        placeholder={placeholder} 
        className={cn("pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input", className)} 
        {...props} 
      />
    </div>
  );
});

SearchInput.displayName = "SearchInput";

export { SearchInput };
