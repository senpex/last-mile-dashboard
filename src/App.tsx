
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/layout/ThemeProvider";
import Index from "./pages/Index";
import AgentAI from "./pages/AgentAI";
import Dictionaries from "./pages/Dictionaries";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import DriversPage from "./pages/users/Drivers";
import ClientsPage from "./pages/users/Clients";
import PushCommunication from "./pages/communication/PushCommunication";
import CustomerSupport from "./pages/communication/CustomerSupport";
import EZcaterOrders from "./pages/EZcaterOrders";
import NotFound from "./pages/NotFound";

// Create a client outside the component to avoid re-initialization on re-renders
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Index />} />
              <Route path="/agent-ai" element={<AgentAI />} />
              <Route path="/dictionaries" element={<Dictionaries />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/users/drivers" element={<DriversPage />} />
              <Route path="/users/clients" element={<ClientsPage />} />
              <Route path="/communication/push" element={<PushCommunication />} />
              <Route path="/communication/support" element={<CustomerSupport />} />
              <Route path="/ezcater-orders" element={<EZcaterOrders />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
