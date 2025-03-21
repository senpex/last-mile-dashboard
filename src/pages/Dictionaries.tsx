
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDictionaries, initializeDictionaries } from "@/lib/storage";
import { Dictionary } from "@/types/dictionary";
import { ListFilter, Edit, Trash2 } from "lucide-react";

const Dictionaries = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dictionaries, setDictionaries] = useState<Dictionary[]>([]);

  useEffect(() => {
    // Initialize dictionaries in local storage if they don't exist
    initializeDictionaries();
    
    // Load dictionaries from local storage
    const loadedDictionaries = getDictionaries();
    setDictionaries(loadedDictionaries);
  }, []);

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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dictionaries.map((dictionary) => (
                <Card key={dictionary.id} className="shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-start">
                      <span>{dictionary.dic_name}</span>
                      <Badge variant="outline" className="ml-2">
                        {dictionary.items.length} items
                      </Badge>
                    </CardTitle>
                    <CardDescription>ID: {dictionary.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center text-muted-foreground">
                      <ListFilter className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        {dictionary.items.slice(0, 3).map(item => item.value).join(", ")}
                        {dictionary.items.length > 3 && "..."}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Dictionaries;
