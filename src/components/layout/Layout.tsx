
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
          className="zoom-content w-full h-full flex flex-col"
          style={{
            transformOrigin: "top left",
            transform: `scale(var(--zoom-level, 1))`
          }}
        >
          {children}
          {showFooter && (
            <footer className="bg-muted/50 px-6 py-4 mt-auto border-t">
              <div className="container mx-auto flex justify-between items-center text-sm text-muted-foreground">
                <div>
                  © {new Date().getFullYear()} Delivery Management Platform
                </div>
                <div className="space-x-4">
                  <a href="/terms" className="hover:underline">Terms of Service</a>
                  <a href="/privacy" className="hover:underline">Privacy Policy</a>
                </div>
              </div>
            </footer>
          )}
        </div>
      </main>
    </div>
  );
};

export { Layout };
export default Layout;
