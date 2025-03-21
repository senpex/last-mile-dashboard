
import { Dictionary } from "@/types/dictionary";

const DICTIONARIES_KEY = "dictionaries";

// Empty sample dictionary array
const sampleDictionaries: Dictionary[] = [];

export const initializeDictionaries = (): void => {
  // Clear any existing dictionaries and set to empty array
  localStorage.setItem(DICTIONARIES_KEY, JSON.stringify(sampleDictionaries));
  console.log("Empty dictionaries initialized in local storage");
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
