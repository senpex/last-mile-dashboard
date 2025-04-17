
import { Layout } from "@/components/layout/Layout";
import { TowerControl } from "lucide-react";
import CommunicationPanel from "@/components/communication/CommunicationPanel";
import { DriversSidebar } from "@/components/drivers/DriversSidebar";
import { ClientFiltersSidebar } from "@/components/communication/ClientFiltersSidebar";
import { useState } from "react";
import { DeliveryStatus } from "@/types/delivery";

const CommunicationTower = () => {
  // Driver filters
  const [selectedStatuses, setSelectedStatuses] = useState<DeliveryStatus[]>([]);
  const [selectedZipcodes, setSelectedZipcodes] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [selectedTransports, setSelectedTransports] = useState<string[]>([]);
  const [selectedHireStatuses, setSelectedHireStatuses] = useState<string[]>([]);
  
  // Client filters - fixing the type here from string[] to make it compatible
  const [selectedClientStatuses, setSelectedClientStatuses] = useState<string[]>([]);
  const [selectedClientCities, setSelectedClientCities] = useState<string[]>([]);
  const [selectedClientStates, setSelectedClientStates] = useState<string[]>([]);
  const [selectedClientProfiles, setSelectedClientProfiles] = useState<string[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
  
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(true);
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

  const handleFiltersAdd = (filters: any) => {
    if (activeTab === "drivers") {
      setSelectedStatuses(filters.statuses as DeliveryStatus[]);
      setSelectedZipcodes(filters.zipcodes);
      setSelectedCities(filters.cities);
      setSelectedStates(filters.states);
      setSelectedProfiles(filters.profiles || []);
      setSelectedTransports(filters.transports || []);
      setSelectedHireStatuses(filters.hireStatuses || []);
    } else if (activeTab === "clients") {
      setSelectedClientStatuses(filters.statuses);
      setSelectedClientCities(filters.cities);
      setSelectedClientStates(filters.states);
      setSelectedClientProfiles(filters.profiles);
      setSelectedOrganizations(filters.organizations);
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
              {activeTab === "drivers" ? (
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
              ) : (
                <ClientFiltersSidebar
                  selectedStatuses={selectedClientStatuses}
                  setSelectedStatuses={setSelectedClientStatuses}
                  allClientStatuses={allClientStatuses}
                  selectedCities={selectedClientCities}
                  setSelectedCities={setSelectedClientCities}
                  allCities={allCities}
                  selectedStates={selectedClientStates}
                  setSelectedStates={setSelectedClientStates}
                  allStates={allStates}
                  selectedProfiles={selectedClientProfiles}
                  setSelectedProfiles={setSelectedClientProfiles}
                  allProfiles={allClientProfiles}
                  selectedOrganizations={selectedOrganizations}
                  setSelectedOrganizations={setSelectedOrganizations}
                  allOrganizations={allOrganizations}
                  onFiltersAdd={handleFiltersAdd}
                  open={isFilterSidebarOpen}
                  onClose={() => setIsFilterSidebarOpen(false)}
                />
              )}
              <div className="flex-1 h-full overflow-auto">
                <CommunicationPanel
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  selectedFilters={{
                    statuses: activeTab === "drivers" ? selectedStatuses : selectedClientStatuses,
                    zipcodes: selectedZipcodes,
                    cities: activeTab === "drivers" ? selectedCities : selectedClientCities,
                    states: activeTab === "drivers" ? selectedStates : selectedClientStates,
                    profiles: activeTab === "drivers" ? selectedProfiles : selectedClientProfiles,
                    transports: selectedTransports,
                    hireStatuses: selectedHireStatuses,
                    organizations: selectedOrganizations
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
