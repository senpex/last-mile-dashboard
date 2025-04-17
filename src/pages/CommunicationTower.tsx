import { Layout } from "@/components/layout/Layout";
import { TowerControl } from "lucide-react";
const CommunicationTower = () => {
  return <Layout>
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-2 mb-6">
          <TowerControl className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Communication Tower</h1>
        </div>

        <div className="grid gap-6">
          
        </div>
      </div>
    </Layout>;
};
export default CommunicationTower;