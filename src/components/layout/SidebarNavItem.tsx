
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SidebarNavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  collapsed: boolean;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  isActive, 
  collapsed 
}) => {
  return (
    <li>
      <Link 
        to={to} 
        className={cn(
          "sidebar-item",
          isActive ? "active" : ""
        )}
      >
        <Icon className="sidebar-icon" />
        <span 
          className={cn(
            "menu-item-text",
            collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          )}
        >
          {label}
        </span>
      </Link>
    </li>
  );
};
