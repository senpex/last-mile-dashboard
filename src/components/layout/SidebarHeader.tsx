
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarHeaderProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed, toggleSidebar }) => {
  return (
    <div className="h-16 border-b border-sidebar-border flex items-center justify-between px-4">
      <h1 
        className={cn(
          "font-semibold text-sidebar-foreground transition-opacity-300",
          collapsed ? "opacity-0 w-0" : "opacity-100"
        )}
      >
        Deliveries
      </h1>
      <button 
        onClick={toggleSidebar}
        className="w-8 h-8 rounded-full flex items-center justify-center bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-accent-foreground transition-all-200"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight className="w-4 h-4 pointer-events-none" /> : <ChevronLeft className="w-4 h-4 pointer-events-none" />}
      </button>
    </div>
  );
};
