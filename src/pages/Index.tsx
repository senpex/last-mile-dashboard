import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DeliveriesGrid, { Delivery } from "@/components/data/DeliveriesGrid";
import { Download, Filter, Search, RotateCw, Columns } from "lucide-react";
import "../components/data/ag-grid-theme.css";

// Sample data to show in the grid
const sampleDeliveries: Delivery[] = [
  {
    id: 1,
    status: "Dropoff Complete",
    pickupTime: "2023-06-10 09:30 AM",
    pickupLocation: {
      name: "Coffee Shop",
      address: "123 Main St, San Francisco"
    },
    dropoffTime: "2023-06-10 10:15 AM",
    dropoffLocation: {
      name: "Office Building",
      address: "456 Market St, San Francisco"
    },
    price: "$15.50",
    tip: "$3.00",
    fees: "$2.50",
    courier: "John Smith",
    organization: "SpeedDelivery",
    distance: "2.3 miles"
  },
  {
    id: 2,
    status: "Canceled By Customer",
    pickupTime: "2023-06-10 11:00 AM",
    pickupLocation: {
      name: "Sandwich Shop",
      address: "789 Mission St, San Francisco"
    },
    dropoffTime: "N/A",
    dropoffLocation: {
      name: "Apartment Complex",
      address: "101 Harrison St, San Francisco"
    },
    price: "$0.00",
    tip: "$0.00",
    fees: "$1.50",
    courier: "Jane Doe",
    organization: "FastFood",
    distance: "1.8 miles"
  },
  {
    id: 3,
    status: "In Transit",
    pickupTime: "2023-06-10 12:15 PM",
    pickupLocation: {
      name: "Grocery Store",
      address: "222 Valencia St, San Francisco"
    },
    dropoffTime: "Estimated 1:00 PM",
    dropoffLocation: {
      name: "Residential Home",
      address: "333 Dolores St, San Francisco"
    },
    price: "$22.75",
    tip: "$4.50",
    fees: "$3.25",
    courier: "Mike Johnson",
    organization: "QuickMart",
    distance: "3.5 miles"
  }
];

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  
  // Load sample data when the component mounts
  useEffect(() => {
    console.log("Setting sample deliveries:", sampleDeliveries);
    setDeliveries([...sampleDeliveries]); // Create a new array to force state update
  }, []);
  
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background flex flex-col relative">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed} 
        />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-[70px]' : 'ml-[240px]'} pb-20`}>
          <div className="animate-fade-in px-4 py-6">
            <div className="flex flex-col space-y-4">
              {/* Header and timezone */}
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Deliveries</h1>
                <span className="text-sm text-muted-foreground">All times are displayed using PDT timezone</span>
              </div>
              
              {/* Filters and actions row */}
              <div className="flex flex-wrap justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="flex items-center gap-2 text-sm h-9">
                    <span>03/24/2025 12:00 AM - 03/24/2025 11:59 PM</span>
                  </Button>
                  
                  <Button variant="outline" className="flex items-center gap-2 text-sm h-9">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Type to search"
                      className="pl-8 h-9 w-[240px]"
                    />
                  </div>
                  
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Download className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <RotateCw className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Columns className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Display debug info */}
              <div className="p-2 mb-4 bg-muted rounded text-sm">
                <p>Debug: {deliveries.length} deliveries loaded</p>
              </div>
              
              {/* AG Grid Table */}
              {deliveries.length > 0 ? (
                <DeliveriesGrid deliveries={deliveries} />
              ) : (
                <div className="text-center py-10 bg-muted/50 rounded border">
                  Loading deliveries...
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
