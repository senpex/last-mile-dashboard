
import { useState, useEffect, useCallback } from "react";
import { Dictionary } from "@/types/dictionary";
import { getDictionary } from "@/lib/storage";

export function useStatusDictionary() {
  const [statusDictionary, setStatusDictionary] = useState<Dictionary | null>(null);
  
  const statusMapping: Record<string, string> = {
    "Dropoff Complete": "completed",
    "Canceled By Customer": "cancelled_order",
    "Cancelled By Admin": "cancelled_by_admin",
    "In Transit": "in_transit",
    "Picking Up": "started_working",
    "Arrived For Pickup": "arrived_for_pickup"
  };

  useEffect(() => {
    const dictionary = getDictionary("19");
    if (dictionary) {
      setStatusDictionary(dictionary);
      console.log("Loaded status dictionary:", dictionary);
    } else {
      console.warn("Dictionary with ID 19 not found");
    }
  }, []);

  const getStatusDisplay = useCallback((statusValue: string): string => {
    if (!statusDictionary) return statusValue;
    
    const dictionaryId = statusMapping[statusValue];
    if (!dictionaryId) return statusValue;
    
    const dictionaryItem = statusDictionary.items.find(item => 
      item.id === dictionaryId
    );
    
    return dictionaryItem ? dictionaryItem.value : statusValue;
  }, [statusDictionary, statusMapping]);

  const getStatusBadgeVariant = useCallback((status: string) => {
    const dictionaryId = statusMapping[status];
    
    switch (dictionaryId) {
      case "completed":
        return "success";
      case "cancelled_order":
        return "destructive";
      case "cancelled_by_admin":
        return "warning";
      case "in_transit":
        return "default";
      case "started_working":
      case "arrived_for_pickup":
        return "warning";
      default:
        return "default";
    }
  }, [statusMapping]);

  return {
    getStatusDisplay,
    getStatusBadgeVariant
  };
}
