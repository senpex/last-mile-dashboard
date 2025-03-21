
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { getDictionaries, initializeDictionaries, getDictionary } from "@/lib/storage";
import { Dictionary } from "@/types/dictionary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ListFilter } from "lucide-react";

const Dictionaries = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dictionaries, setDictionaries] = useState<Dictionary[]>([]);
  const [selectedDictionary, setSelectedDictionary] = useState<Dictionary | null>(null);

  useEffect(() => {
    // Initialize dictionaries in local storage if they don't exist
    initializeDictionaries();
    
    // Load dictionaries from local storage
    const loadedDictionaries = getDictionaries();
    setDictionaries(loadedDictionaries);
  }, []);

  const handleDictionarySelect = (dictionaryId: string) => {
    const dictionary = getDictionary(dictionaryId);
    setSelectedDictionary(dictionary || null);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background flex">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed} 
        />
        
        <main className={`flex-1 transition-all duration-300 p-6 ${sidebarCollapsed ? 'ml-[70px]' : 'ml-[240px]'}`}>
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-semibold">Dictionaries</h1>
              <Button>
                Create Dictionary
              </Button>
            </div>
            
            <div className="mb-6 w-full max-w-xs">
              <Select onValueChange={handleDictionarySelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a dictionary" />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.map((dictionary) => (
                    <SelectItem key={dictionary.id} value={dictionary.id}>
                      {dictionary.dic_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedDictionary && (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{selectedDictionary.dic_name}</span>
                    <Badge variant="outline">
                      {selectedDictionary.items.length} items
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground mb-2">
                      <ListFilter className="h-4 w-4 mr-2" />
                      <span className="font-medium">Dictionary Items</span>
                    </div>
                    <ul className="space-y-2">
                      {selectedDictionary.items.map((item) => (
                        <li key={item.id} className="flex items-center justify-between p-2 rounded-md border">
                          <div>
                            <span className="font-medium">{item.value}</span>
                            {item.description && (
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            )}
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {item.id}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Dictionaries;
