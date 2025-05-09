
import React from 'react';
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { getDictionaries, getDictionary, resetToDefaultDictionaries } from "@/lib/storage";
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
import { ListFilter, RefreshCw } from "lucide-react";
import DictionaryImport from "@/components/DictionaryImport";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";

const Dictionaries = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dictionaries, setDictionaries] = useState<Dictionary[]>([]);
  const [selectedDictionary, setSelectedDictionary] = useState<Dictionary | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadDictionaries();
  }, []);

  const loadDictionaries = () => {
    const loadedDictionaries = getDictionaries();
    const sortedDictionaries = [...loadedDictionaries].sort((a, b) => 
      a.dic_name.localeCompare(b.dic_name)
    );
    setDictionaries(sortedDictionaries);
    setSelectedDictionary(null);
  };

  const handleDictionarySelect = (dictionaryId: string) => {
    const dictionary = getDictionary(dictionaryId);
    setSelectedDictionary(dictionary || null);
  };

  const handleImportComplete = () => {
    loadDictionaries();
    toast({
      title: "Dictionaries updated",
      description: "Dictionary list has been refreshed"
    });
  };

  const handleReset = () => {
    resetToDefaultDictionaries();
    loadDictionaries();
    toast({
      title: "Dictionaries reset",
      description: "All dictionaries have been reset to defaults"
    });
  };

  const getTransportIcon = (iconName?: string) => {
    if (iconName && iconName.trim() !== '') {
      try {
        // Create specific check for transport dictionary and valid icon name
        return (
          <div className="flex items-center justify-center">
            <TransportIcon 
              transportType={iconName.toLowerCase() as TransportType} 
              className="h-6 w-6" 
              size={24} 
            />
          </div>
        );
      } catch (error) {
        console.error("Error rendering transport icon:", error);
        return null;
      }
    }
    return null;
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background flex">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed} 
        />
        
        <main className={`flex-1 transition-all duration-300 p-4 ${sidebarCollapsed ? 'ml-[70px]' : 'ml-[240px]'}`}>
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-medium">Dictionaries</h1>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleReset}
                  className="flex items-center gap-1"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset Defaults
                </Button>
                <DictionaryImport onImportComplete={handleImportComplete} />
                <Button size="sm">
                  Create Dictionary
                </Button>
              </div>
            </div>
            
            <div className="mb-4 w-full max-w-xs">
              <Select onValueChange={handleDictionarySelect}>
                <SelectTrigger className="w-full text-sm">
                  <SelectValue placeholder="Select a dictionary" />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.map((dictionary) => (
                    <SelectItem key={dictionary.id} value={dictionary.id}>
                      {dictionary.dic_name} (ID: {dictionary.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedDictionary && (
              <Card className="shadow-sm">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="flex justify-between items-center text-lg">
                    <span>{selectedDictionary.dic_name} <span className="text-xs text-muted-foreground">ID: {selectedDictionary.id}</span></span>
                    <Badge variant="outline" className="text-xs">
                      {selectedDictionary.items.length} items
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-3 py-2">
                  <div className="space-y-1">
                    <div className="flex items-center text-muted-foreground mb-2 text-xs">
                      <ListFilter className="h-3 w-3 mr-1" />
                      <span className="font-medium">Dictionary Items</span>
                    </div>
                    
                    <div className="border rounded-md overflow-hidden">
                      <Table className="w-full text-xs">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="py-1 px-2 font-medium">Value</TableHead>
                            <TableHead className="py-1 px-2 font-medium">Description</TableHead>
                            <TableHead className="py-1 px-2 font-medium text-center">Icon</TableHead>
                            <TableHead className="py-1 px-2 font-medium w-20 text-right">ID</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedDictionary.items.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="py-1 px-2 font-medium">{item.value}</TableCell>
                              <TableCell className="py-1 px-2 text-muted-foreground">
                                {item.description || '-'}
                              </TableCell>
                              <TableCell className="py-1 px-2 text-center">
                                {selectedDictionary.id === "2" && item.icon ? (
                                  getTransportIcon(item.icon)
                                ) : (
                                  item.icon ? <span className="text-xs text-muted-foreground">{item.icon}</span> : '-'
                                )}
                              </TableCell>
                              <TableCell className="py-1 px-2 text-right">
                                <Badge variant="secondary" className="text-[10px]">
                                  {item.id}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
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
