
export interface DictionaryItem {
  id: string;
  value: string;
  description?: string;
  icon?: string; // Optional icon identifier
}

export interface Dictionary {
  id: string;
  dic_name: string;
  items: DictionaryItem[];
}
