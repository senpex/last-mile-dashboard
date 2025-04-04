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
