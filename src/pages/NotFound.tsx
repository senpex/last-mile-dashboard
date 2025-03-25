import { Link } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NotFound = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      {/* Main content area - adjusted margin to match smaller sidebar */}
      <div 
        className={cn(
          "flex-1 transition-all duration-300 overflow-auto",
          collapsed ? "ml-[56px]" : "ml-[192px]" // Updated from 70px/240px to 56px/192px
        )}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-muted-foreground mt-2">Page not found</p>
          <Link to="/" className="mt-4 text-primary hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
