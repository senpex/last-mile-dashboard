
import React, { ReactNode } from 'react';

interface UserFiltersLayoutProps {
  title: string;
  timezoneInfo: string;
  filterControls: ReactNode;
  searchControls: ReactNode;
  viewControls?: ReactNode;
  className?: string;
}

export function UserFiltersLayout({
  title,
  timezoneInfo,
  filterControls,
  searchControls,
  viewControls,
  className = ''
}: UserFiltersLayoutProps) {
  return (
    <div className={`px-4 py-4 flex-shrink-0 border-b space-y-0.5 pb-4 ${className}`}>
      <div className="flex flex-col space-y-1">
        <div className="flex justify-between items-start py-[10px]">
          <h1 className="text-2xl font-semibold text-foreground text-left">{title}</h1>
          <span className="text-sm text-muted-foreground text-right">
            {timezoneInfo}
          </span>
        </div>
        
        <div className="flex flex-wrap justify-between items-center gap-4 mt-5">
          <div className="flex items-center space-x-2">
            {filterControls}
          </div>
          
          <div className="flex items-center space-x-2">
            {searchControls}
          </div>
        </div>
        
        {viewControls && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {viewControls}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
