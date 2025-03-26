import React from 'react';
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { getDictionaries, getDictionary } from "@/lib/storage";
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
import { 
  ListFilter, 
  Upload,
  Car,
  Bus,
  Truck,
  Bike,
  Train,
  FerrisWheel,
  Ship,
  Plane,
  User,
  Tractor,
  Motorcycle,
  Sailboat,
  Shuttle,
  Snowflake,
  Car as SuvIcon,
  Leaf,
  Wrench
} from "lucide-react";
import PickupTruckIcon from "@/components/icons/PickupTruckIcon";
import VanIcon from "@/components/icons/VanIcon";
import LimousineIcon from "@/components/icons/LimousineIcon";
import AtvIcon from "@/components/icons/AtvIcon";
import ScooterIcon from "@/components/icons/ScooterIcon";
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

  const getTransportIcon = (transportType: string, iconName?: string) => {
    if (iconName) {
      const lowerCaseIcon = iconName.toLowerCase();
      
      const iconMap: {[key: string]: React.ReactNode} = {
        'car': <Car className="h-4 w-4 text-blue-600" />,
        'suv': <SuvIcon className="h-4 w-4 text-teal-600" />,
        'bus': <Bus className="h-4 w-4 text-green-600" />,
        'truck': <Truck className="h-4 w-4 text-red-600" />,
        'pickup_truck': <PickupTruckIcon className="h-4 w-4 text-orange-600" size={16} />,
        'bike': <Bike className="h-4 w-4 text-purple-600" />,
        'bicycle': <Bike className="h-4 w-4 text-indigo-600" />,
        'motorcycle': <Motorcycle className="h-4 w-4 text-pink-600" />,
        'scooter': <ScooterIcon className="h-4 w-4 text-rose-600" size={16} />,
        'train': <Train className="h-4 w-4 text-cyan-600" />,
        'ferry': <Ship className="h-4 w-4 text-blue-800" />,
        'sailboat': <Sailboat className="h-4 w-4 text-blue-400" />,
        'airplane': <Plane className="h-4 w-4 text-sky-600" />,
        'amusement': <FerrisWheel className="h-4 w-4 text-amber-600" />,
        'helper': <User className="h-4 w-4 text-violet-600" />,
        'tractor': <Tractor className="h-4 w-4 text-green-800" />,
        'van': <VanIcon className="h-4 w-4 text-gray-600" size={16} />,
        'limousine': <LimousineIcon className="h-4 w-4 text-gray-800" size={16} />,
        'atv': <AtvIcon className="h-4 w-4 text-brown-600" size={16} />,
        'shuttle': <Shuttle className="h-4 w-4 text-indigo-800" />,
        'snow': <Snowflake className="h-4 w-4 text-blue-300" />,
        'electric': <Leaf className="h-4 w-4 text-green-500" />,
        'maintenance': <Wrench className="h-4 w-4 text-gray-700" />
      };
      
      if (iconMap[lowerCaseIcon]) {
        return iconMap[lowerCaseIcon];
      }
    }
    
    const lowerCaseType = transportType.toLowerCase();
    
    const typeToIconMap: {[key: string]: React.ReactNode} = {
      'car': <Car className="h-4 w-4 text-blue-600" />,
      'suv': <SuvIcon className="h-4 w-4 text-teal-600" />,
      'bus': <Bus className="h-4 w-4 text-green-600" />,
      'truck': <Truck className="h-4 w-4 text-red-600" />,
      'pickup_truck': <PickupTruckIcon className="h-4 w-4 text-orange-600" size={16} />,
      'bike': <Bike className="h-4 w-4 text-purple-600" />,
      'bicycle': <Bike className="h-4 w-4 text-indigo-600" />,
      'motorcycle': <Motorcycle className="h-4 w-4 text-pink-600" />,
      'scooter': <ScooterIcon className="h-4 w-4 text-rose-600" size={16} />,
      'train': <Train className="h-4 w-4 text-cyan-600" />,
      'ferry': <Ship className="h-4 w-4 text-blue-800" />,
      'sailboat': <Sailboat className="h-4 w-4 text-blue-400" />,
      'airplane': <Plane className="h-4 w-4 text-sky-600" />,
      'amusement': <FerrisWheel className="h-4 w-4 text-amber-600" />,
      'helper': <User className="h-4 w-4 text-violet-600" />,
      'tractor': <Tractor className="h-4 w-4 text-green-800" />,
      'van': <VanIcon className="h-4 w-4 text-gray-600" size={16} />,
      'limousine': <LimousineIcon className="h-4 w-4 text-gray-800" size={16} />,
      'atv': <AtvIcon className="h-4 w-4 text-brown-600" size={16} />,
      'shuttle': <Shuttle className="h-4 w-4 text-indigo-800" />,
      'snow': <Snowflake className="h-4 w-4 text-blue-300" />,
      'electric': <Leaf className="h-4 w-4 text-green-500" />,
      'maintenance': <Wrench className="h-4 w-4 text-gray-700" />
    };
    
    return typeToIconMap[lowerCaseType] || <PickupTruckIcon className="h-4 w-4 text-gray-500" size={16} />;
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
                            <TableHead className="py-1 px-2 font-medium">Icon</TableHead>
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
                              <TableCell className="py-1 px-2">
                                {selectedDictionary.id === "2" && (
                                  <div className="flex items-center justify-center">
                                    {getTransportIcon(item.value, item.icon)}
                                  </div>
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
