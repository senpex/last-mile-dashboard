
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Package, BookOpen, Bot, LayoutDashboard, 
  UserRound, TowerControl 
} from "lucide-react";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNavItem } from "./SidebarNavItem";
import { SidebarSubmenu } from "./SidebarSubmenu";
import { SidebarFooter } from "./SidebarFooter";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const location = useLocation();
  const [mounting, setMounting] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setMounting(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/", label: "Deliveries", icon: Package },
    { path: "/communication-tower", label: "Communication Tower", icon: TowerControl },
    { path: "/agent-ai", label: "Agent AI", icon: Bot },
    { path: "/dictionaries", label: "Dictionaries", icon: BookOpen },
    { path: "/profile", label: "Profile", icon: UserRound },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen flex flex-col transition-all-300 z-10 bg-sidebar shadow-lg",
        collapsed ? "w-[70px]" : "w-[240px]",
        mounting ? "animate-slide-in-left" : ""
      )}
    >
      <SidebarHeader collapsed={collapsed} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 overflow-y-auto hide-scrollbar py-4">
        <nav>
          <ul className="space-y-1 px-2">
            {navItems.map(item => (
              <SidebarNavItem 
                key={item.path}
                to={item.path}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.path}
                collapsed={collapsed}
              />
            ))}
            
            <SidebarSubmenu collapsed={collapsed} />
          </ul>
        </nav>
      </div>
      
      <SidebarFooter collapsed={collapsed} />
    </aside>
  );
};

export default Sidebar;
