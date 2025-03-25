
import { useState } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";

import Layout from "@/components/layout/Layout";

const DeliveriesAI = () => {
  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Deliveries AI</h1>
        <p className="text-muted-foreground">This feature is coming soon.</p>
      </div>
    </Layout>
  );
};

export default DeliveriesAI;
