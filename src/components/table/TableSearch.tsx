
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TableSearchProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  minSearchLength?: number;
}

const TableSearch = ({ 
  onSearch, 
  placeholder = "Search...", 
  minSearchLength = 3 
}: TableSearchProps) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (searchValue.length >= minSearchLength || searchValue.length === 0) {
      const debounceTimer = setTimeout(() => {
        onSearch(searchValue);
      }, 300);
      
      return () => clearTimeout(debounceTimer);
    }
  }, [searchValue, onSearch, minSearchLength]);

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-[200px] pl-8 h-9 text-sm"
      />
    </div>
  );
};

export default TableSearch;
