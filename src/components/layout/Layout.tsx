
import { useState } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const Layout = ({ children, showFooter = true }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main 
        className="flex-1 flex flex-col overflow-hidden transition-all"
        style={{ 
          marginLeft: collapsed ? "70px" : "240px",
          height: "100vh",
          width: "calc(100vw - (var(--sidebar-width, 240px)))",
          overflow: "auto"
        }}
      >
        <div 
          className="zoom-content w-full h-full"
          style={{
            transformOrigin: "top left",
            transform: `scale(var(--zoom-level, 1))`
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export { Layout };
export default Layout;
