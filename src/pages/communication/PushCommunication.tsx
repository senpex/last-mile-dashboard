import { Layout } from "@/components/layout/Layout";
import { TowerControl, Filter } from "lucide-react";
import CommunicationPanel from "@/components/communication/CommunicationPanel";
import { CommunicationFiltersSidebar } from "@/components/communication/CommunicationFiltersSidebar";
import { useState } from "react";
import { DeliveryStatus } from "@/types/delivery";
import { Button } from "@/components/ui/button";

const CommunicationTower = () => {
  // Driver filters state
  const [driverFilterSidebarOpen, setDriverFilterSidebarOpen] = useState(true);
  const [selectedStatuses, setSelectedStatuses] = useState<DeliveryStatus[]>([]);
  const [selectedZipcodes, setSelectedZipcodes] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [selectedTransports, setSelectedTransports] = useState<string[]>([]);
  const [selectedHireStatuses, setSelectedHireStatuses] = useState<string[]>([]);
  
  // Client filters state
  const [clientFilterSidebarOpen, setClientFilterSidebarOpen] = useState(true);
  const [selectedClientCities, setSelectedClientCities] = useState<string[]>([]);
  const [selectedClientStates, setSelectedClientStates] = useState<string[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
  
  // Dispatcher filters state
  const [dispatcherFilterSidebarOpen, setDispatcherFilterSidebarOpen] = useState(true);
  const [selectedDispatchers, setSelectedDispatchers] = useState<string[]>([]);
  
  const [activeTab, setActiveTab] = useState("drivers");

  // Mock data
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
  const allClientStatuses = ["active", "inactive", "pending"];
  const allClientProfiles = ["Business", "Individual", "Enterprise"];
  const allOrganizations = ["Acme Corp", "Globex Corp", "Initech"];
  const allDispatchers = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "Tom Brown"];

  const handleFiltersAdd = (filters: any) => {
    if (activeTab === "drivers") {
      setSelectedStatuses(filters.statuses || []);
      setSelectedZipcodes(filters.zipcodes || []);
      setSelectedCities(filters.cities || []);
      setSelectedStates(filters.states || []);
      setSelectedProfiles(filters.profiles || []);
      setSelectedTransports(filters.transports || []);
      setSelectedHireStatuses(filters.hireStatuses || []);
    } else if (activeTab === "clients") {
      setSelectedClientCities(filters.cities || []);
      setSelectedClientStates(filters.states || []);
      setSelectedOrganizations(filters.organizations || []);
    } else if (activeTab === "groups") {
      setSelectedDispatchers(filters.dispatchers || []);
    }
  };

  const toggleFilterSidebar = () => {
    if (activeTab === "drivers") {
      setDriverFilterSidebarOpen(!driverFilterSidebarOpen);
    } else if (activeTab === "clients") {
      setClientFilterSidebarOpen(!clientFilterSidebarOpen);
    } else if (activeTab === "groups") {
      setDispatcherFilterSidebarOpen(!dispatcherFilterSidebarOpen);
    }
  };

  const getCurrentSidebarState = () => {
    if (activeTab === "drivers") return driverFilterSidebarOpen;
    if (activeTab === "clients") return clientFilterSidebarOpen;
    if (activeTab === "groups") return dispatcherFilterSidebarOpen;
    return false;
  };

  return (
    <Layout>
      <div className="flex h-full">
        <div className="flex-1">
          <div className="container mx-auto p-4 h-full">
            <div className="flex flex-col space-y-4 h-full">
              <div className="flex items-center gap-2">
                <TowerControl className="h-6 w-6" />
                <h1 className="text-2xl font-bold">Communication Tower</h1>
              </div>
              
              <Button 
                variant={getCurrentSidebarState() ? "default" : "outline"}
                onClick={toggleFilterSidebar}
                className="flex items-center gap-2 w-fit"
              >
                <Filter className="h-4 w-4" />
                {getCurrentSidebarState() ? "Hide Filters" : "Show Filters"}
              </Button>

              <div className="flex gap-2.5 h-[calc(100vh-180px)]">
                {getCurrentSidebarState() && (
                  <div className="w-80 shrink-0">
                    <CommunicationFiltersSidebar
                      activeTab={activeTab}
                      onFiltersAdd={handleFiltersAdd}
                      open={getCurrentSidebarState()}
                      onClose={() => {
                        if (activeTab === "drivers") {
                          setDriverFilterSidebarOpen(false);
                        } else if (activeTab === "clients") {
                          setClientFilterSidebarOpen(false);
                        } else if (activeTab === "groups") {
                          setDispatcherFilterSidebarOpen(false);
                        }
                      }}
                      
                      // Driver filters
                      selectedStatuses={selectedStatuses}
                      setSelectedStatuses={setSelectedStatuses}
                      selectedZipcodes={selectedZipcodes}
                      setSelectedZipcodes={setSelectedZipcodes}
                      selectedCities={activeTab === "drivers" ? selectedCities : selectedClientCities}
                      setSelectedCities={activeTab === "drivers" ? setSelectedCities : setSelectedClientCities}
                      selectedStates={activeTab === "drivers" ? selectedStates : selectedClientStates}
                      setSelectedStates={activeTab === "drivers" ? setSelectedStates : setSelectedClientStates}
                      selectedProfiles={selectedProfiles}
                      setSelectedProfiles={setSelectedProfiles}
                      selectedTransports={selectedTransports}
                      setSelectedTransports={setSelectedTransports}
                      selectedHireStatuses={selectedHireStatuses}
                      setSelectedHireStatuses={setSelectedHireStatuses}
                      
                      // Client filters
                      selectedOrganizations={selectedOrganizations}
                      setSelectedOrganizations={setSelectedOrganizations}
                      
                      // Dispatcher filters
                      selectedDispatchers={selectedDispatchers}
                      setSelectedDispatchers={setSelectedDispatchers}
                      
                      // Data arrays
                      allDeliveryStatuses={allDriverStatuses}
                      allZipcodes={allZipcodes}
                      allCities={allCities}
                      allStates={allStates}
                      allOrganizations={allOrganizations}
                      allDispatchers={allDispatchers}
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <CommunicationPanel
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    selectedFilters={{
                      statuses: activeTab === "drivers" ? selectedStatuses : [],
                      zipcodes: selectedZipcodes,
                      cities: activeTab === "drivers" ? selectedCities : selectedClientCities,
                      states: activeTab === "drivers" ? selectedStates : selectedClientStates,
                      profiles: selectedProfiles,
                      transports: selectedTransports,
                      hireStatuses: selectedHireStatuses,
                      organizations: selectedOrganizations,
                      dispatchers: selectedDispatchers
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CommunicationTower;
