
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import ThemeToggle from "./ThemeToggle";
import LogoutButton from "./LogoutButton";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useTheme();
  
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
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
      
      {/* Sidebar Content - Menu Items */}
      <div className="flex-1 overflow-y-auto hide-scrollbar py-4">
        <nav>
          <ul className="space-y-1 px-2">
            <li>
              <a 
                href="#" 
                className={cn(
                  "sidebar-item",
                  "active" // Since this is the only item, mark it as active
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
              </a>
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
