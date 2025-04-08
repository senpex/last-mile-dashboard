
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarSubmenuProps {
  collapsed: boolean;
}

interface SubmenuItem {
  path: string;
  label: string;
}

export const SidebarSubmenu: React.FC<SidebarSubmenuProps> = ({ collapsed }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const submenuItems: SubmenuItem[] = [
    { path: "/users/drivers", label: "Drivers" },
    { path: "/users/clients", label: "Clients" }
  ];
  
  const isActive = submenuItems.some(item => location.pathname === item.path);
  
  const toggleSubmenu = () => {
    if (!collapsed) {
      setIsOpen(!isOpen);
    }
  };
  
  return (
    <li>
      <button
        onClick={toggleSubmenu}
        className={cn(
          "sidebar-item w-full text-left",
          isActive ? "active" : ""
        )}
      >
        <Users className="sidebar-icon" />
        <span 
          className={cn(
            "menu-item-text",
            collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          )}
        >
          User Management
        </span>
        {!collapsed && (
          <ChevronRight 
            className={cn(
              "ml-auto w-4 h-4 transition-transform",
              isOpen ? "rotate-90" : ""
            )} 
          />
        )}
      </button>
      {!collapsed && isOpen && (
        <ul className="mt-1 ml-6 space-y-1">
          {submenuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={cn(
                  "sidebar-item text-sm",
                  location.pathname === item.path ? "active" : ""
                )}
              >
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
