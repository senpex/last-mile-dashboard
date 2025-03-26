
import { Layout } from "@/components/layout/Layout";
import { TowerControl } from "lucide-react";

const CommunicationTower = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-2 mb-6">
          <TowerControl className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Communication Tower</h1>
        </div>

        <div className="grid gap-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Tower Management</h2>
            <p className="text-muted-foreground mb-4">
              Use this dashboard to manage and monitor your communication towers network.
              View tower status, maintenance schedules, and real-time data.
            </p>
            <div className="p-8 flex items-center justify-center border border-dashed rounded-md">
              <span className="text-muted-foreground">Tower data visualization will appear here</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CommunicationTower;
