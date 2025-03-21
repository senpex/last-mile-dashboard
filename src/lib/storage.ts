
import { Dictionary } from "@/types/dictionary";

const DICTIONARIES_KEY = "dictionaries";

export const initializeDictionaries = (): void => {
  // Only initialize if dictionaries don't exist in localStorage
  if (!localStorage.getItem(DICTIONARIES_KEY)) {
    localStorage.setItem(DICTIONARIES_KEY, JSON.stringify([]));
    console.log("Dictionaries storage initialized");
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
