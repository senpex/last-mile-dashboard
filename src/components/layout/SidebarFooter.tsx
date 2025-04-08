
import React from 'react';
import ThemeToggle from "./ThemeToggle";
import ZoomControl from "./ZoomControl";
import LogoutButton from "./LogoutButton";

interface SidebarFooterProps {
  collapsed: boolean;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ collapsed }) => {
  return (
    <div className="border-t border-sidebar-border p-4 space-y-2">
      <ZoomControl collapsed={collapsed} />
      <ThemeToggle collapsed={collapsed} />
      <LogoutButton collapsed={collapsed} />
    </div>
  );
};
