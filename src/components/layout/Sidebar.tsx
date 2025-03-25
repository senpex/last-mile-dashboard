
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import ThemeToggle from "./ThemeToggle";
import LogoutButton from "./LogoutButton";
import { ChevronLeft, ChevronRight, Package, BookOpen } from "lucide-react";
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
        collapsed ? "w-[56px]" : "w-[192px]", // Reduced from 70px to 56px and 240px to 192px
        mounting ? "animate-slide-in-left" : ""
      )}
    >
      {/* Sidebar Header */}
      <div className="h-12 border-b border-sidebar-border flex items-center justify-between px-3"> {/* Reduced padding */}
        <h1 
          className={cn(
            "font-semibold text-sidebar-foreground transition-opacity-300 text-sm", // Reduced font size
            collapsed ? "opacity-0 w-0" : "opacity-100"
          )}
        >
          Dashboard
        </h1>
        <button 
          onClick={toggleSidebar}
          className="w-6 h-6 rounded-full flex items-center justify-center bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-accent-foreground transition-all-200"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-3 h-3 pointer-events-none" /> : <ChevronLeft className="w-3 h-3 pointer-events-none" />}
        </button>
      </div>
      
      {/* Sidebar Content - Menu Items */}
      <div className="flex-1 overflow-y-auto hide-scrollbar py-3"> {/* Reduced padding */}
        <nav>
          <ul className="space-y-1 px-1"> {/* Reduced padding */}
            <li>
              <Link 
                to="/" 
                className={cn(
                  "sidebar-item text-sm", // Added text-sm
                  location.pathname === "/" ? "active" : ""
                )}
              >
                <Package className="sidebar-icon w-4 h-4" /> {/* Reduced icon size */}
                <span 
                  className={cn(
                    "menu-item-text text-sm", // Added text-sm
                    collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                  )}
                >
                  Deliveries
                </span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dictionaries" 
                className={cn(
                  "sidebar-item text-sm", // Added text-sm
                  location.pathname === "/dictionaries" ? "active" : ""
                )}
              >
                <BookOpen className="sidebar-icon w-4 h-4" /> {/* Reduced icon size */}
                <span 
                  className={cn(
                    "menu-item-text text-sm", // Added text-sm
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
      <div className="border-t border-sidebar-border p-3 space-y-2"> {/* Reduced padding */}
        <ThemeToggle collapsed={collapsed} />
        <LogoutButton collapsed={collapsed} />
      </div>
    </aside>
  );
};

export default Sidebar;
