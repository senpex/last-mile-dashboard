
import { useState, useEffect, useCallback } from "react";
import { Delivery, DeliveryStatus } from "@/types/delivery";

interface UseFilteredDeliveriesProps {
  deliveries: Delivery[];
  showMyDeliveriesOnly: boolean;
}

export function useFilteredDeliveries({ deliveries, showMyDeliveriesOnly }: UseFilteredDeliveriesProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [filteredDeliveries, setFilteredDeliveries] = useState<Delivery[]>([]);
  const [activeView, setActiveView] = useState<string>("main");
  const [selectedStatuses, setSelectedStatuses] = useState<DeliveryStatus[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
  const [selectedCouriers, setSelectedCouriers] = useState<string[]>([]);

  const currentUserName = "John Smith";

  const allDeliveryStatuses: DeliveryStatus[] = Array.from(
    new Set(deliveries.map(delivery => delivery.status as DeliveryStatus))
  );

  const allOrganizations: string[] = Array.from(
    new Set(deliveries.map(delivery => delivery.organization))
  ).filter(Boolean) as string[];

  const allCouriers: string[] = Array.from(
    new Set(deliveries.map(delivery => delivery.courier))
  ).filter(Boolean) as string[];

  // Handle search term debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length >= 4 || searchTerm.length === 0) {
        setDebouncedSearchTerm(searchTerm);
        console.log("Search term debounced:", searchTerm);
      }
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // Apply filters when any filter changes
  useEffect(() => {
    applyFilters(
      deliveries, 
      debouncedSearchTerm, 
      activeView, 
      selectedStatuses, 
      selectedOrganizations,
      selectedCouriers,
      showMyDeliveriesOnly
    );
    console.log("Filters applied:", {
      searchTerm: debouncedSearchTerm,
      activeView,
      selectedStatuses,
      selectedOrganizations,
      selectedCouriers,
      showMyDeliveriesOnly
    });
  }, [
    debouncedSearchTerm, 
    activeView, 
    deliveries, 
    selectedStatuses, 
    selectedOrganizations,
    selectedCouriers,
    showMyDeliveriesOnly
  ]);

  const applyFilters = useCallback((
    items: Delivery[], 
    searchTerm: string, 
    activeTab: string,
    statusFilters: DeliveryStatus[],
    organizationFilters: string[],
    courierFilters: string[],
    showMyDeliveriesOnly: boolean
  ) => {
    let results = [...items];
    
    if (showMyDeliveriesOnly) {
      results = results.filter(delivery => 
        delivery.courier === currentUserName
      );
      console.log(`Filtered to ${results.length} deliveries for current user: ${currentUserName}`);
    }
    
    if (searchTerm.length >= 4) {
      console.log("Performing search for:", searchTerm);

      results = results.filter(delivery => {
        const searchableFields = [
          delivery.packageId,
          delivery.orderName,
          delivery.status,
          delivery.pickupTime,
          delivery.pickupLocation.name,
          delivery.pickupLocation.address,
          delivery.dropoffTime,
          delivery.dropoffLocation.name,
          delivery.dropoffLocation.address,
          delivery.customerName,
          delivery.price,
          delivery.tip,
          delivery.courier,
          delivery.organization,
          delivery.distance,
          delivery.couriersEarnings
        ];

        return searchableFields.some(field => 
          field && field.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    
    if (activeTab === "attention") {
      results = results.filter(delivery => 
        delivery.status === "Canceled By Customer" || 
        delivery.status === "Cancelled By Admin"
      );
      console.log(`Filtered to ${results.length} cancelled deliveries for Attention Required tab`);
    }
    
    if (statusFilters.length > 0) {
      console.log("Filtering by statuses:", statusFilters);
      results = results.filter(delivery => 
        statusFilters.includes(delivery.status as DeliveryStatus)
      );
      console.log(`Filtered to ${results.length} deliveries with selected statuses:`, statusFilters);
    }
    
    if (organizationFilters.length > 0) {
      console.log("Filtering by organizations:", organizationFilters);
      results = results.filter(delivery => 
        delivery.organization && organizationFilters.includes(delivery.organization)
      );
      console.log(`Filtered to ${results.length} deliveries with selected organizations:`, organizationFilters);
    }
    
    if (courierFilters.length > 0) {
      console.log("Filtering by couriers:", courierFilters);
      results = results.filter(delivery => 
        delivery.courier && courierFilters.includes(delivery.courier)
      );
      console.log(`Filtered to ${results.length} deliveries with selected couriers:`, courierFilters);
    }
    
    setFilteredDeliveries(results);
  }, [currentUserName]);

  return {
    filteredDeliveries,
    searchTerm,
    setSearchTerm,
    activeView,
    setActiveView,
    allDeliveryStatuses,
    selectedStatuses,
    setSelectedStatuses,
    allOrganizations,
    selectedOrganizations,
    setSelectedOrganizations,
    allCouriers,
    selectedCouriers,
    setSelectedCouriers,
    applyFilters
  };
}
