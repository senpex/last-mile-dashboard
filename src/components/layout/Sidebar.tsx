
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import ThemeToggle from "./ThemeToggle";
import ZoomControl from "./ZoomControl";
import LogoutButton from "./LogoutButton";
import { ChevronLeft, ChevronRight, Package, BookOpen, Bot, LayoutDashboard, UserRound, Users, TowerControl } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}
const Sidebar = ({
  collapsed,
  setCollapsed
}: SidebarProps) => {
  const {
    theme
  } = useTheme();
  const location = useLocation();
  const [mounting, setMounting] = useState(true);
  const [usersMenuOpen, setUsersMenuOpen] = useState(false);
  const [communicationMenuOpen, setCommunicationMenuOpen] = useState(false);
  const [deliveriesMenuOpen, setDeliveriesMenuOpen] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setMounting(false), 300);
    return () => clearTimeout(timer);
  }, []);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const toggleUsersMenu = () => {
    setUsersMenuOpen(!usersMenuOpen);
  };
  
  const toggleCommunicationMenu = () => {
    setCommunicationMenuOpen(!communicationMenuOpen);
  };
  
  const toggleDeliveriesMenu = () => {
    setDeliveriesMenuOpen(!deliveriesMenuOpen);
  };
  
  return <aside className={cn("fixed left-0 top-0 h-screen flex flex-col transition-all-300 z-10 bg-sidebar shadow-lg", "border-r border-sidebar-border", collapsed ? "w-[70px]" : "w-[240px]", mounting ? "animate-slide-in-left" : "")}>
      <div className="h-16 border-b border-sidebar-border flex items-center justify-between px-4">
        <h1 className={cn("font-semibold text-sidebar-foreground transition-opacity-300", collapsed ? "opacity-0 w-0" : "opacity-100")}>
          Deliveries
        </h1>
        <button onClick={toggleSidebar} className="w-8 h-8 rounded-full flex items-center justify-center bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-accent-foreground transition-all-200" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {collapsed ? <ChevronRight className="w-4 h-4 pointer-events-none" /> : <ChevronLeft className="w-4 h-4 pointer-events-none" />}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto hide-scrollbar py-4">
        <nav>
          <ul className="space-y-1 px-2">
            <li>
              <Link to="/dashboard" className={cn("sidebar-item", location.pathname === "/dashboard" ? "active" : "")}>
                <LayoutDashboard className="sidebar-icon" />
                <span className={cn("menu-item-text", collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100")}>
                  Dashboard
                </span>
              </Link>
            </li>

            <li>
              <button onClick={toggleDeliveriesMenu} className={cn("sidebar-item w-full text-left", location.pathname === "/" || location.pathname === "/ezcater-orders" ? "active" : "")}>
                <Package className="sidebar-icon" />
                <span className={cn("menu-item-text", collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100")}>
                  Deliveries
                </span>
                {!collapsed && <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", deliveriesMenuOpen ? "rotate-90" : "")} />}
              </button>
              {!collapsed && deliveriesMenuOpen && <ul className="mt-1 ml-6 space-y-1">
                <li>
                  <Link to="/" className={cn("sidebar-item text-sm", location.pathname === "/" ? "active" : "")}>
                    <span>All Deliveries</span>
                  </Link>
                </li>
                <li>
                  <Link to="/ezcater-orders" className={cn("sidebar-item text-sm", location.pathname === "/ezcater-orders" ? "active" : "")}>
                    <span>eZcater Orders</span>
                  </Link>
                </li>
              </ul>}
            </li>
            
            <li>
              <button onClick={toggleCommunicationMenu} className={cn("sidebar-item w-full text-left", location.pathname.includes("/communication") ? "active" : "")}>
                <TowerControl className="sidebar-icon" />
                <span className={cn("menu-item-text", collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100")}>Comm Tower</span>
                {!collapsed && <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", communicationMenuOpen ? "rotate-90" : "")} />}
              </button>
              {!collapsed && communicationMenuOpen && <ul className="mt-1 ml-6 space-y-1">
                  <li>
                    <Link to="/communication/push" className={cn("sidebar-item text-sm", location.pathname === "/communication/push" ? "active" : "")}>
                      <span>Push Communication</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/communication/support" className={cn("sidebar-item text-sm", location.pathname === "/communication/support" ? "active" : "")}>
                      <span>Customer Support</span>
                    </Link>
                  </li>
                </ul>}
            </li>
            
            <li>
              <button onClick={toggleUsersMenu} className={cn("sidebar-item w-full text-left", location.pathname.includes("/users") ? "active" : "")}>
                <Users className="sidebar-icon" />
                <span className={cn("menu-item-text", collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100")}>
                  User Management
                </span>
                {!collapsed && <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", usersMenuOpen ? "rotate-90" : "")} />}
              </button>
              {!collapsed && usersMenuOpen && <ul className="mt-1 ml-6 space-y-1">
                  <li>
                    <Link to="/users/drivers" className={cn("sidebar-item text-sm", location.pathname === "/users/drivers" ? "active" : "")}>
                      <span>Drivers</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/users/clients" className={cn("sidebar-item text-sm", location.pathname === "/users/clients" ? "active" : "")}>
                      <span>Clients</span>
                    </Link>
                  </li>
                </ul>}
            </li>
            
            <li>
              <Link to="/agent-ai" className={cn("sidebar-item", location.pathname === "/agent-ai" ? "active" : "")}>
                <Bot className="sidebar-icon" />
                <span className={cn("menu-item-text", collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100")}>
                  Agent AI
                </span>
              </Link>
            </li>
            <li>
              <Link to="/dictionaries" className={cn("sidebar-item", location.pathname === "/dictionaries" ? "active" : "")}>
                <BookOpen className="sidebar-icon" />
                <span className={cn("menu-item-text", collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100")}>
                  Dictionaries
                </span>
              </Link>
            </li>
            <li>
              <Link to="/profile" className={cn("sidebar-item", location.pathname === "/profile" ? "active" : "")}>
                <UserRound className="sidebar-icon" />
                <span className={cn("menu-item-text", collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100")}>
                  Profile
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="border-t border-sidebar-border p-4 space-y-2">
        <ZoomControl collapsed={collapsed} />
        <ThemeToggle collapsed={collapsed} />
        <LogoutButton collapsed={collapsed} />
      </div>
    </aside>;
};
export default Sidebar;
