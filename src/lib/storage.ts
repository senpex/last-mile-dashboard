
import { Dictionary } from "@/types/dictionary";

const DICTIONARIES_KEY = "dictionaries";

export const initializeDictionaries = (): void => {
  // Only initialize if dictionaries don't exist in localStorage
  if (!localStorage.getItem(DICTIONARIES_KEY)) {
    const defaultDictionaries: Dictionary[] = [
      {
        id: "1",
        dic_name: "Hire Status",
        items: [
          { id: "active", value: "Active", description: "Currently active courier" },
          { id: "pending", value: "Pending Review", description: "Application under review" },
          { id: "rejected", value: "Rejected", description: "Application rejected" },
          { id: "suspended", value: "Suspended", description: "Temporarily suspended" },
        ]
      },
      {
        id: "2",
        dic_name: "Transport Types",
        items: [
          { id: "helper", value: "Helper", description: "Helper", icon: "helper" },
          { id: "car", value: "Car", description: "Only car", icon: "car" },
          { id: "suv", value: "SUV", description: "SUV vehicle", icon: "suv" },
          { id: "pickup_truck", value: "Pickup Truck", description: "Pickup truck", icon: "pickup_truck" },
          { id: "9ft_cargo_van", value: "9ft Cargo Van", description: "9ft Cargo Van", icon: "9ft_cargo_van" },
          { id: "10ft_box_truck", value: "10ft Box Truck", description: "10ft Box Truck", icon: "10ft_box_truck" },
          { id: "15ft_box_truck", value: "15ft Box Truck", description: "15ft Box Truck", icon: "15ft_box_truck" },
          { id: "17ft_box_truck", value: "17ft Box Truck", description: "17ft Box Truck", icon: "17ft_box_truck" },
          { id: "refrigerated_van", value: "Refrigerated Van", description: "Refrigerated Van", icon: "refrigerated_van" }
        ]
      },
      {
        id: "6",
        dic_name: "Courier Status",
        items: [
          { id: "online", value: "Online", description: "Courier is available" },
          { id: "offline", value: "Offline", description: "Courier is not available" },
          { id: "busy", value: "Busy", description: "Courier is on delivery" }
        ]
      },
      {
        id: "1455",
        dic_name: "Hire Status",
        items: [
          { id: "hired", value: "Hired", description: "Courier has been hired" },
          { id: "left_vm", value: "Left VM", description: "Left voice message" },
          { id: "contact_again", value: "Contact Again", description: "To be contacted again" },
          { id: "not_interested", value: "Not Interested", description: "Courier is not interested" },
          { id: "blacklist", value: "Blacklist", description: "Blacklisted courier" },
          { id: "out_of_service", value: "Out of service", description: "Currently out of service" }
        ]
      },
      {
        id: "1401",
        dic_name: "Package - Pickup statuses",
        items: [
          { id: "dropoff_complete", value: "Dropoff Complete", description: "Delivery completed successfully" },
          { id: "canceled_by_customer", value: "Canceled By Customer", description: "Order was canceled by customer" },
          { id: "in_transit", value: "In Transit", description: "Package is in transit" },
          { id: "picking_up", value: "Picking Up", description: "Courier is picking up the package" },
          { id: "arrived_for_pickup", value: "Arrived For Pickup", description: "Courier arrived for pickup" },
          { id: "recipient_unavailable", value: "Recipient Unavailable", description: "Recipient not available for delivery" },
          { id: "draft_order", value: "Draft Order", description: "Order is in draft state" },
          { id: "paid_order", value: "Paid Order", description: "Order has been paid" },
          { id: "courier_selected", value: "Courier Selected", description: "A courier has been assigned" },
          { id: "item_not_given", value: "Item Not Given", description: "Item was not provided for delivery" },
          { id: "reported_order", value: "Reported Order", description: "Order has been reported" },
          { id: "waiting_for_pay", value: "Waiting For Pay", description: "Waiting for payment" },
          { id: "cancelled_by_admin", value: "Cancelled By Admin", description: "Order cancelled by administrator" },
          { id: "scheduled_order", value: "Scheduled Order", description: "Order is scheduled for future delivery" },
          { id: "repeated_order", value: "Repeated Order", description: "This is a recurring order" },
          { id: "forgot", value: "Forgot", description: "Something was forgotten" },
          { id: "started_working", value: "Started Working", description: "Courier started working on delivery" },
          { id: "accepted_repeated_order", value: "Accepted Repeated Order", description: "Courier accepted recurring order" }
        ]
      }
    ];
    
    localStorage.setItem(DICTIONARIES_KEY, JSON.stringify(defaultDictionaries));
    console.log("Dictionaries storage initialized with default dictionaries");
  }
};

export const getDictionaries = (): Dictionary[] => {
  // Initialize storage if needed
  initializeDictionaries();
  
  const dictionaries = localStorage.getItem(DICTIONARIES_KEY);
  return dictionaries ? JSON.parse(dictionaries) : [];
};

export const getDictionary = (id: string): Dictionary | undefined => {
  const dictionaries = getDictionaries();
  return dictionaries.find(dictionary => dictionary.id === id);
};

export const saveDictionary = (dictionary: Dictionary): void => {
  const dictionaries = getDictionaries();
  const index = dictionaries.findIndex(dict => dict.id === dictionary.id);
  
  if (index >= 0) {
    dictionaries[index] = dictionary;
  } else {
    dictionaries.push(dictionary);
  }
  
  localStorage.setItem(DICTIONARIES_KEY, JSON.stringify(dictionaries));
};

export const deleteDictionary = (id: string): void => {
  const dictionaries = getDictionaries();
  const filteredDictionaries = dictionaries.filter(dictionary => dictionary.id !== id);
  localStorage.setItem(DICTIONARIES_KEY, JSON.stringify(filteredDictionaries));
};

export const clearAllDictionaries = (): void => {
  localStorage.removeItem(DICTIONARIES_KEY);
  localStorage.setItem(DICTIONARIES_KEY, JSON.stringify([]));
  console.log("All dictionaries completely cleared from local storage");
};

export const resetToDefaultDictionaries = (): void => {
  clearAllDictionaries();
  initializeDictionaries();
  console.log("All dictionaries reset to defaults");
};
