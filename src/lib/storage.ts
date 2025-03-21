
import { Dictionary } from "@/types/dictionary";

const DICTIONARIES_KEY = "dictionaries";

// Sample dictionary data with correct IDs
const sampleDictionaries: Dictionary[] = [
  // Removed: Delivery Status (id: "2")
  // Removed: Vehicle Types (id: "3")
  // Removed: Payment Methods (id: "6")
  {
    id: "9",
    dic_name: "Order Types",
    items: [
      { id: "standard", value: "Standard" },
      { id: "express", value: "Express" },
      { id: "same_day", value: "Same Day" }
    ]
  },
  {
    id: "15",
    dic_name: "Customer Types",
    items: [
      { id: "individual", value: "Individual" },
      { id: "business", value: "Business" },
      { id: "government", value: "Government" }
    ]
  },
  {
    id: "19",
    dic_name: "Packaging Types",
    items: [
      { id: "box", value: "Box" },
      { id: "envelope", value: "Envelope" },
      { id: "pallet", value: "Pallet" }
    ]
  },
  {
    id: "20",
    dic_name: "Service Levels",
    items: [
      { id: "basic", value: "Basic" },
      { id: "premium", value: "Premium" },
      { id: "enterprise", value: "Enterprise" }
    ]
  },
  {
    id: "23",
    dic_name: "Return Reasons",
    items: [
      { id: "damaged", value: "Damaged" },
      { id: "wrong_item", value: "Wrong Item" },
      { id: "no_longer_needed", value: "No Longer Needed" }
    ]
  },
  {
    id: "31",
    dic_name: "Delivery Zones",
    items: [
      { id: "urban", value: "Urban" },
      { id: "suburban", value: "Suburban" },
      { id: "rural", value: "Rural" }
    ]
  },
  {
    id: "133",
    dic_name: "Shipping Methods",
    items: [
      { id: "ground", value: "Ground" },
      { id: "air", value: "Air" },
      { id: "sea", value: "Sea" }
    ]
  },
  {
    id: "134",
    dic_name: "Warehouse Locations",
    items: [
      { id: "north", value: "North" },
      { id: "south", value: "South" },
      { id: "east", value: "East" },
      { id: "west", value: "West" }
    ]
  },
  {
    id: "137",
    dic_name: "Dispatch Priorities",
    items: [
      { id: "low", value: "Low" },
      { id: "medium", value: "Medium" },
      { id: "high", value: "High" },
      { id: "urgent", value: "Urgent" }
    ]
  },
  {
    id: "138",
    dic_name: "Insurance Options",
    items: [
      { id: "none", value: "None" },
      { id: "basic", value: "Basic" },
      { id: "full", value: "Full" }
    ]
  },
  {
    id: "502",
    dic_name: "Tracking Status",
    items: [
      { id: "pending", value: "Pending" },
      { id: "in_transit", value: "In Transit" },
      { id: "delivered", value: "Delivered" },
      { id: "delayed", value: "Delayed" }
    ]
  },
  {
    id: "501",
    dic_name: "Package Sizes",
    items: [
      { id: "small", value: "Small" },
      { id: "medium", value: "Medium" },
      { id: "large", value: "Large" },
      { id: "extra_large", value: "Extra Large" }
    ]
  },
  {
    id: "503",
    dic_name: "Delivery Time Slots",
    items: [
      { id: "morning", value: "Morning (8am-12pm)" },
      { id: "afternoon", value: "Afternoon (12pm-5pm)" },
      { id: "evening", value: "Evening (5pm-9pm)" }
    ]
  },
  {
    id: "504",
    dic_name: "Driver Ratings",
    items: [
      { id: "1_star", value: "1 Star" },
      { id: "2_star", value: "2 Stars" },
      { id: "3_star", value: "3 Stars" },
      { id: "4_star", value: "4 Stars" },
      { id: "5_star", value: "5 Stars" }
    ]
  },
  {
    id: "505",
    dic_name: "Package Handling Instructions",
    items: [
      { id: "fragile", value: "Fragile" },
      { id: "heavy", value: "Heavy" },
      { id: "perishable", value: "Perishable" },
      { id: "this_side_up", value: "This Side Up" }
    ]
  },
  {
    id: "506",
    dic_name: "Signature Requirements",
    items: [
      { id: "none", value: "None" },
      { id: "required", value: "Required" },
      { id: "adult", value: "Adult Signature Required" }
    ]
  },
  {
    id: "571",
    dic_name: "Customs Documentation",
    items: [
      { id: "commercial_invoice", value: "Commercial Invoice" },
      { id: "certificate_of_origin", value: "Certificate of Origin" },
      { id: "customs_declaration", value: "Customs Declaration" }
    ]
  },
  {
    id: "1401",
    dic_name: "Delivery Exceptions",
    items: [
      { id: "weather", value: "Weather Delay" },
      { id: "address_issue", value: "Address Issue" },
      { id: "customer_unavailable", value: "Customer Unavailable" },
      { id: "vehicle_breakdown", value: "Vehicle Breakdown" }
    ]
  },
  {
    id: "1400",
    dic_name: "Contact Preferences",
    items: [
      { id: "email", value: "Email" },
      { id: "sms", value: "SMS" },
      { id: "phone", value: "Phone" },
      { id: "none", value: "No Contact" }
    ]
  },
  {
    id: "1455",
    dic_name: "Regulatory Compliance",
    items: [
      { id: "hazmat", value: "Hazardous Materials" },
      { id: "restricted", value: "Restricted Items" },
      { id: "controlled", value: "Controlled Substances" },
      { id: "standard", value: "Standard Items" }
    ]
  }
];

export const initializeDictionaries = (): void => {
  const existingDictionaries = localStorage.getItem(DICTIONARIES_KEY);
  
  if (!existingDictionaries) {
    localStorage.setItem(DICTIONARIES_KEY, JSON.stringify(sampleDictionaries));
    console.log("Dictionaries initialized in local storage");
  } else {
    // Remove the three dictionaries if they already exist in localStorage
    const dictionaries = JSON.parse(existingDictionaries) as Dictionary[];
    const filteredDictionaries = dictionaries.filter(
      dict => dict.id !== "2" && dict.id !== "3" && dict.id !== "6"
    );
    localStorage.setItem(DICTIONARIES_KEY, JSON.stringify(filteredDictionaries));
  }
};

export const getDictionaries = (): Dictionary[] => {
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
