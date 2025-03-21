import { Dictionary } from "@/types/dictionary";

const DICTIONARIES_KEY = "dictionaries";

// Sample dictionaries with predefined items
const sampleDictionaries: Dictionary[] = [
  {
    id: "dict_001",
    dic_name: "Countries",
    items: [
      { id: "us", value: "United States", description: "North America" },
      { id: "ca", value: "Canada", description: "North America" },
      { id: "mx", value: "Mexico", description: "North America" },
      { id: "uk", value: "United Kingdom", description: "Europe" },
      { id: "fr", value: "France", description: "Europe" },
      { id: "de", value: "Germany", description: "Europe" },
      { id: "jp", value: "Japan", description: "Asia" },
      { id: "cn", value: "China", description: "Asia" },
      { id: "in", value: "India", description: "Asia" },
      { id: "br", value: "Brazil", description: "South America" }
    ]
  },
  {
    id: "dict_002",
    dic_name: "Colors",
    items: [
      { id: "red", value: "Red", description: "Primary color" },
      { id: "blue", value: "Blue", description: "Primary color" },
      { id: "yellow", value: "Yellow", description: "Primary color" },
      { id: "green", value: "Green", description: "Secondary color" },
      { id: "purple", value: "Purple", description: "Secondary color" },
      { id: "orange", value: "Orange", description: "Secondary color" },
      { id: "black", value: "Black", description: "Neutral" },
      { id: "white", value: "White", description: "Neutral" },
      { id: "gray", value: "Gray", description: "Neutral" }
    ]
  },
  {
    id: "dict_003",
    dic_name: "Status Codes",
    items: [
      { id: "active", value: "Active", description: "Item is active and available" },
      { id: "inactive", value: "Inactive", description: "Item is temporarily unavailable" },
      { id: "pending", value: "Pending", description: "Item is awaiting approval" },
      { id: "archived", value: "Archived", description: "Item has been archived" },
      { id: "deleted", value: "Deleted", description: "Item has been removed" }
    ]
  }
];

export const initializeDictionaries = (): void => {
  // Clear any existing dictionaries and set sample dictionaries
  localStorage.setItem(DICTIONARIES_KEY, JSON.stringify(sampleDictionaries));
  console.log("Sample dictionaries initialized in local storage");
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

export const clearAllDictionaries = (): void => {
  localStorage.setItem(DICTIONARIES_KEY, JSON.stringify([]));
  console.log("All dictionaries cleared from local storage");
};
