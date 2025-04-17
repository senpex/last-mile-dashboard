
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { TowerControl } from "lucide-react";
import CommunicationPanel from "@/components/communication/CommunicationPanel";
import { CommunicationSidebar } from "@/components/communication/CommunicationSidebar";

const CommunicationTower = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-2 mb-6">
          <TowerControl className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Communication Tower</h1>
        </div>

        <div className="flex flex-1 overflow-hidden relative">
          <CommunicationSidebar 
            open={isFilterSidebarOpen}
            onClose={() => setIsFilterSidebarOpen(false)}
          />

          <div className="flex-1 overflow-hidden">
            <CommunicationPanel 
              isFilterSidebarOpen={isFilterSidebarOpen} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CommunicationTower;
