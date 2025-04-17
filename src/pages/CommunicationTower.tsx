
import { Layout } from "@/components/layout/Layout";
import { TowerControl } from "lucide-react";
import CommunicationPanel from "@/components/communication/CommunicationPanel";
import { DriversSidebar } from "@/components/drivers/DriversSidebar";
import { useState } from "react";
import { DeliveryStatus } from "@/types/delivery";

const CommunicationTower = () => {
  // State for filters
  const [selectedStatuses, setSelectedStatuses] = useState<DeliveryStatus[]>([]);
  const [selectedZipcodes, setSelectedZipcodes] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [selectedTransports, setSelectedTransports] = useState<string[]>([]);
  const [selectedHireStatuses, setSelectedHireStatuses] = useState<string[]>([]);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(true);

  // Mock data for demonstration
  const allDriverStatuses: DeliveryStatus[] = [
    "Online",
    "Offline",
    "Busy",
    "Available",
    "On Break"
  ];

  const allZipcodes = ["12345", "23456", "34567", "45678", "56789"];
  const allCities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
  const allStates = ["NY", "CA", "IL", "TX", "AZ"];

  const handleFiltersAdd = (filters: {
    statuses: DeliveryStatus[];
    zipcodes: string[];
    cities: string[];
    states: string[];
    profiles?: string[];
    transports?: string[];
    hireStatuses?: string[];
  }) => {
    setSelectedStatuses(filters.statuses);
    setSelectedZipcodes(filters.zipcodes);
    setSelectedCities(filters.cities);
    setSelectedStates(filters.states);
    
    // Add support for new filter types
    if (filters.profiles) {
      setSelectedProfiles(filters.profiles);
    }
    
    if (filters.transports) {
      setSelectedTransports(filters.transports);
    }
    
    if (filters.hireStatuses) {
      setSelectedHireStatuses(filters.hireStatuses);
    }
  };

  return (
    <Layout>
      <div className="flex h-full">
        <div className="flex-1">
          <div className="container mx-auto p-6">
            <div className="flex items-center gap-2 mb-6">
              <TowerControl className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Communication Tower</h1>
            </div>

            <div className="flex gap-[10px] h-[calc(100vh-180px)]">
              <DriversSidebar
                selectedStatuses={selectedStatuses}
                setSelectedStatuses={setSelectedStatuses}
                allDeliveryStatuses={allDriverStatuses}
                allZipcodes={allZipcodes}
                selectedZipcodes={selectedZipcodes}
                setSelectedZipcodes={setSelectedZipcodes}
                allCities={allCities}
                selectedCities={selectedCities}
                setSelectedCities={setSelectedCities}
                allStates={allStates}
                selectedStates={selectedStates}
                setSelectedStates={setSelectedStates}
                open={isFilterSidebarOpen}
                onClose={() => setIsFilterSidebarOpen(false)}
                onFiltersAdd={handleFiltersAdd}
              />
              <div className="flex-1 h-full overflow-auto">
                <CommunicationPanel
                  selectedFilters={{
                    statuses: selectedStatuses,
                    zipcodes: selectedZipcodes,
                    cities: selectedCities,
                    states: selectedStates,
                    profiles: selectedProfiles,
                    transports: selectedTransports,
                    hireStatuses: selectedHireStatuses
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CommunicationTower;
