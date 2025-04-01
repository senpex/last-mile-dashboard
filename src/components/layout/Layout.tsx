
import { useState } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

// Changed from export const Layout to export default function Layout
export default function Layout({ children }: LayoutProps) {
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
}
