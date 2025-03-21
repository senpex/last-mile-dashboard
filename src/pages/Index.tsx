
import { useState } from "react";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Sidebar from "@/components/layout/Sidebar";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background flex">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed} 
        />
        
        <main className={`flex-1 transition-all duration-300 p-6 ${sidebarCollapsed ? 'ml-[70px]' : 'ml-[240px]'}`}>
          <div className="animate-fade-in">
            <h1 className="text-3xl font-semibold mb-6">Deliveries Dashboard</h1>
            <p className="text-muted-foreground mb-8">
              Welcome to your last-mile delivery dashboard. Manage and monitor your deliveries efficiently.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder cards for dashboard content */}
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div 
                  key={item}
                  className="bg-card text-card-foreground rounded-lg shadow-sm border border-border p-6 hover:shadow-md transition-all-200"
                >
                  <h3 className="font-medium mb-2">Dashboard Card {item}</h3>
                  <p className="text-sm text-muted-foreground">
                    This is a placeholder for your delivery dashboard content.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
