
import React, { ReactNode } from 'react';

interface UserFiltersLayoutProps {
  children?: ReactNode;
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
  filterContent?: ReactNode;
  title: string;
  icon?: ReactNode;
  buttonContent?: ReactNode;
  showFilterToggle?: boolean;
  filterIcon?: ReactNode;
  filterToggleText?: string;
  timezoneInfo?: string;
  filterControls?: ReactNode;
  searchControls?: ReactNode;
  viewControls?: ReactNode;
  className?: string;
}

export function UserFiltersLayout({
  children,
  sidebarOpen,
  onSidebarToggle,
  filterContent,
  title,
  icon,
  buttonContent,
  showFilterToggle,
  filterIcon,
  filterToggleText,
  timezoneInfo,
  filterControls,
  searchControls,
  viewControls,
  className = ''
}: UserFiltersLayoutProps) {
  return (
    <div className="flex h-full">
      {/* Sidebar for filters */}
      {sidebarOpen && filterContent && (
        <div className="w-80 bg-background border-r flex-shrink-0">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              {showFilterToggle && onSidebarToggle && (
                <button
                  onClick={onSidebarToggle}
                  className="p-1 hover:bg-muted rounded"
                >
                  {filterIcon}
                </button>
              )}
            </div>
          </div>
          <div className="p-4">
            {filterContent}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <div className={`px-4 py-4 flex-shrink-0 border-b space-y-0.5 pb-4 ${className}`}>
          <div className="flex flex-col space-y-1">
            <div className="flex justify-between items-start py-[10px]">
              <div className="flex items-center gap-2">
                {icon}
                <h1 className="text-2xl font-semibold text-foreground text-left">{title}</h1>
              </div>
              <div className="flex items-center gap-2">
                {timezoneInfo && (
                  <span className="text-sm text-muted-foreground text-right">
                    {timezoneInfo}
                  </span>
                )}
                {buttonContent}
              </div>
            </div>
            
            <div className="flex flex-wrap justify-between items-center gap-4 mt-5">
              <div className="flex items-center space-x-2">
                {filterControls}
                {showFilterToggle && onSidebarToggle && (
                  <button
                    onClick={onSidebarToggle}
                    className="flex items-center gap-2 px-3 py-2 text-sm border rounded hover:bg-muted"
                  >
                    {filterIcon}
                    <span>{filterToggleText}</span>
                  </button>
                )}
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

        {/* Children content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
