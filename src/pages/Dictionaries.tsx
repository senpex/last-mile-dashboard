
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { getDictionaries, initializeDictionaries, getDictionary } from "@/lib/storage";
import { Dictionary } from "@/types/dictionary";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ListFilter, Plus, Upload, Search } from "lucide-react";
import DictionaryImport from "@/components/DictionaryImport";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

const Dictionaries = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dictionaries, setDictionaries] = useState<Dictionary[]>([]);
  const [selectedDictionary, setSelectedDictionary] = useState<Dictionary | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize dictionaries in local storage if they don't exist
    initializeDictionaries();
    
    // Load dictionaries from local storage
    loadDictionaries();
  }, []);

  const loadDictionaries = () => {
    const loadedDictionaries = getDictionaries();
    setDictionaries(loadedDictionaries);
  };

  const handleDictionarySelect = (dictionaryId: string) => {
    const dictionary = getDictionary(dictionaryId);
    setSelectedDictionary(dictionary || null);
    
    if (dictionary) {
      toast({
        title: "Dictionary loaded",
        description: `Loaded ${dictionary.dic_name} with ${dictionary.items.length} items`,
      });
    }
  };

  const handleImportComplete = () => {
    // Reload dictionaries after import
    loadDictionaries();
  };

  // Filter items based on search term
  const filteredItems = selectedDictionary?.items.filter(item => 
    item.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

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
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <DictionaryImport onImportComplete={handleImportComplete} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Import dictionary from CSV or Excel</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Dictionary
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Create a new dictionary</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>Available Dictionaries</CardTitle>
                    <CardDescription>
                      Select a dictionary to view its items
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select onValueChange={handleDictionarySelect}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a dictionary" />
                      </SelectTrigger>
                      <SelectContent>
                        {dictionaries.map((dictionary) => (
                          <SelectItem key={dictionary.id} value={dictionary.id}>
                            {dictionary.dic_name} ({dictionary.items.length} items)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-8">
                {selectedDictionary ? (
                  <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle>{selectedDictionary.dic_name}</CardTitle>
                        <CardDescription>ID: {selectedDictionary.id}</CardDescription>
                      </div>
                      <Badge variant="outline" className="ml-auto">
                        {selectedDictionary.items.length} items
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <Collapsible
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between space-x-4 px-1">
                          <div className="flex items-center text-muted-foreground mb-2">
                            <ListFilter className="h-4 w-4 mr-2" />
                            <span className="font-medium">Dictionary Items</span>
                          </div>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="w-9 p-0">
                              <span className="sr-only">Toggle</span>
                              {isOpen ? (
                                <span className="h-4 w-4">−</span>
                              ) : (
                                <span className="h-4 w-4">+</span>
                              )}
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        <div className="rounded-md border px-4 py-3 font-mono text-sm mb-2">
                          {selectedDictionary.items.length} items found
                        </div>
                        <CollapsibleContent className="space-y-2">
                          <div className="flex items-center space-x-2 mb-2">
                            <Search className="h-4 w-4 opacity-50" />
                            <Input
                              placeholder="Search items..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="h-9"
                            />
                          </div>
                          <Separator className="my-2" />
                          <ScrollArea className="h-[300px] rounded-md border">
                            <div className="p-2">
                              {filteredItems.length > 0 ? (
                                <ul className="space-y-2">
                                  {filteredItems.map((item) => (
                                    <li key={item.id} className="flex items-center justify-between p-2 rounded-md border hover:bg-accent transition-colors">
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
                              ) : (
                                <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                                  <p className="text-muted-foreground">No items found</p>
                                  {searchTerm && (
                                    <Button 
                                      variant="link" 
                                      className="mt-2" 
                                      onClick={() => setSearchTerm('')}
                                    >
                                      Clear search
                                    </Button>
                                  )}
                                </div>
                              )}
                            </div>
                          </ScrollArea>
                        </CollapsibleContent>
                      </Collapsible>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="shadow-sm h-full flex items-center justify-center">
                    <CardContent className="text-center py-8">
                      <p className="text-muted-foreground mb-4">Select a dictionary to view details</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Dictionaries;
