
import { Layout } from "@/components/layout/Layout";
import { TowerControl } from "lucide-react";
import CommunicationPanel from "@/components/communication/CommunicationPanel";
import { DriversFilters } from "@/components/drivers/DriversFilters";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { ColumnOption } from "@/components/table/ColumnSelector";

const CommunicationTower = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [timezone, setTimezone] = useState("America/New_York");
  const [activeView, setActiveView] = useState("main");
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  
  const availableColumns: ColumnOption[] = [
    { id: "name", label: "Name", default: true },
    { id: "email", label: "Email", default: true },
    { id: "phone", label: "Phone", default: true },
    { id: "status", label: "Status", default: true },
  ];
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    availableColumns.filter(col => col.default).map(col => col.id)
  );

  return (
    <Layout>
      <div className="relative">
        <div className="fixed left-[240px] right-0 top-0 z-10 bg-background">
          <DriversFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            timezone={timezone}
            onTimezoneChange={setTimezone}
            availableColumns={availableColumns}
            visibleColumns={visibleColumns}
            onVisibleColumnsChange={setVisibleColumns}
            activeView={activeView}
            onActiveViewChange={setActiveView}
            onToggleFilterSidebar={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
            isFilterSidebarOpen={isFilterSidebarOpen}
          />
        </div>

        <div className="container mx-auto p-6 pl-[300px] pt-[120px]">
          <div className="flex items-center gap-2 mb-6">
            <TowerControl className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Communication Tower</h1>
          </div>

          <div className="grid gap-6">
            <CommunicationPanel />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CommunicationTower;
