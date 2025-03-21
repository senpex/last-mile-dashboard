
import { Dictionary } from "@/types/dictionary";

const DICTIONARIES_KEY = "dictionaries";

// Sample dictionary data from Google Sheets
const sampleDictionaries: Dictionary[] = [
  {
    id: "delivery_status",
    dic_name: "Delivery Status",
    items: [
      { id: "new", value: "New" },
      { id: "in_progress", value: "In Progress" },
      { id: "completed", value: "Completed" },
      { id: "failed", value: "Failed" },
      { id: "canceled", value: "Canceled" }
    ]
  },
  {
    id: "vehicle_types",
    dic_name: "Vehicle Types",
    items: [
      { id: "bike", value: "Bike" },
      { id: "scooter", value: "Scooter" },
      { id: "car", value: "Car" },
      { id: "van", value: "Van" },
      { id: "truck", value: "Truck" }
    ]
  },
  {
    id: "payment_methods",
    dic_name: "Payment Methods",
    items: [
      { id: "cash", value: "Cash" },
      { id: "credit_card", value: "Credit Card" },
      { id: "debit_card", value: "Debit Card" },
      { id: "bank_transfer", value: "Bank Transfer" },
      { id: "digital_wallet", value: "Digital Wallet" }
    ]
  }
];

export const initializeDictionaries = (): void => {
  const existingDictionaries = localStorage.getItem(DICTIONARIES_KEY);
  
  if (!existingDictionaries) {
    localStorage.setItem(DICTIONARIES_KEY, JSON.stringify(sampleDictionaries));
    console.log("Dictionaries initialized in local storage");
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
