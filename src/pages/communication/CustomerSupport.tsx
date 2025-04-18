
import { Layout } from "@/components/layout/Layout";
import { Headphones } from "lucide-react";

const CustomerSupport = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2">
            <Headphones className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Customer Support</h1>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            {/* Initial placeholder content */}
            <p>Customer Support dashboard will be implemented here.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerSupport;
