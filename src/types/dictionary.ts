
export interface DictionaryItem {
  id: string;
  value: string;
  description?: string;
}

export interface Dictionary {
  id: string;
  dic_name: string;
  items: DictionaryItem[];
}
