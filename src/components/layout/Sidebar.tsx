
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import ThemeToggle from "./ThemeToggle";
import LogoutButton from "./LogoutButton";
import { ChevronLeft, ChevronRight, Package, BookOpen, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const { theme } = useTheme();
  const location = useLocation();
  
  // Animation states
  const [mounting, setMounting] = useState(true);
  
  useEffect(() => {
    // Allow initial mounting animation
    const timer = setTimeout(() => setMounting(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen flex flex-col transition-all-300 z-10 bg-sidebar shadow-lg",
        collapsed ? "w-[70px]" : "w-[240px]",
        mounting ? "animate-slide-in-left" : ""
      )}
    >
      {/* Sidebar Header */}
      <div className="h-16 border-b border-sidebar-border flex items-center justify-between px-4">
        <h1 
          className={cn(
            "font-semibold text-sidebar-foreground transition-opacity-300",
            collapsed ? "opacity-0 w-0" : "opacity-100"
          )}
        >
          Dashboard
        </h1>
        <button 
          onClick={toggleSidebar}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-accent-foreground transition-all-200"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4 pointer-events-none" /> : <ChevronLeft className="w-4 h-4 pointer-events-none" />}
        </button>
      </div>
      
      {/* Sidebar Content - Menu Items */}
      <div className="flex-1 overflow-y-auto hide-scrollbar py-4">
        <nav>
          <ul className="space-y-1 px-2">
            <li>
              <Link 
                to="/deliveries" 
                className={cn(
                  "sidebar-item",
                  location.pathname === "/deliveries" ? "active" : ""
                )}
              >
                <Package className="sidebar-icon" />
                <span 
                  className={cn(
                    "menu-item-text",
                    collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                  )}
                >
                  Deliveries
                </span>
              </Link>
            </li>
            <li>
              <Link 
                to="/deliveries-ai" 
                className={cn(
                  "sidebar-item",
                  location.pathname === "/deliveries-ai" ? "active" : ""
                )}
              >
                <Zap className="sidebar-icon" />
                <span 
                  className={cn(
                    "menu-item-text relative",
                    collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                  )}
                >
                  Deliveries AI
                  <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                    Beta
                  </span>
                </span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dictionaries" 
                className={cn(
                  "sidebar-item",
                  location.pathname === "/dictionaries" ? "active" : ""
                )}
              >
                <BookOpen className="sidebar-icon" />
                <span 
                  className={cn(
                    "menu-item-text",
                    collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                  )}
                >
                  Dictionaries
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Sidebar Footer */}
      <div className="border-t border-sidebar-border p-4 space-y-2">
        <ThemeToggle collapsed={collapsed} />
        <LogoutButton collapsed={collapsed} />
      </div>
    </aside>
  );
};

export default Sidebar;
