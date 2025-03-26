
import { useState } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main 
        className="flex-1 overflow-auto transition-all ml-[70px]"
        style={{ marginLeft: collapsed ? "70px" : "240px" }}
      >
        {children}
      </main>
    </div>
  );
};
