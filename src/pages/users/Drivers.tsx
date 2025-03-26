
import React, { useEffect, useState } from 'react';
import { Layout } from "@/components/layout/Layout";
import { Table } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getDictionary, saveDictionary } from "@/lib/storage";
import { Dictionary } from "@/types/dictionary";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";

const DriversPage = () => {
  const [transportTypes, setTransportTypes] = useState<{[key: string]: string}>({});
  const [transportIcons, setTransportIcons] = useState<{[key: string]: string | undefined}>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize transport dictionary with our specific transport types if it doesn't exist
    const transportDict = getDictionary("2");
    
    if (!transportDict) {
      const newTransportDict: Dictionary = {
        id: "2",
        dic_name: "Transport_types",
        items: [
          { id: "1", value: "Helper", icon: "helper" },
          { id: "2", value: "Car", icon: "car" },
          { id: "3", value: "SUV", icon: "suv" },
          { id: "4", value: "Pickup Truck", icon: "pickup_truck" },
          { id: "5", value: "9ft Cargo Van", icon: "9ft_cargo_van" },
          { id: "6", value: "10ft Box Truck", icon: "10ft_box_truck" },
          { id: "7", value: "Refrigerated Van", icon: "refrigerated_van" },
          { id: "8", value: "15ft Box Truck", icon: "15ft_box_truck" },
          { id: "9", value: "17ft Box Truck", icon: "17ft_box_truck" }
        ]
      };
      saveDictionary(newTransportDict);
      console.log("Created new transport dictionary:", newTransportDict);
    } else {
      // Update the existing dictionary to ensure all icons are set correctly
      const updatedItems = transportDict.items.map(item => {
        // Convert the item value to a valid icon name if icon is missing
        if (!item.icon) {
          const iconName = item.value.toLowerCase().replace(/ /g, '_');
          return { ...item, icon: iconName };
        }
        return item;
      });
      
      if (JSON.stringify(updatedItems) !== JSON.stringify(transportDict.items)) {
        const updatedDict = { ...transportDict, items: updatedItems };
        saveDictionary(updatedDict);
        console.log("Updated transport dictionary icons:", updatedDict);
      }
    }
    
    // Load dictionary (either existing or newly created)
    const loadedDict = getDictionary("2");
    if (loadedDict) {
      console.log("Transport Dictionary Items:", loadedDict.items);
      const types: {[key: string]: string} = {};
      const icons: {[key: string]: string | undefined} = {};
      
      loadedDict.items.forEach(item => {
        types[item.id] = item.value;
        icons[item.id] = item.icon;
      });
      
      setTransportTypes(types);
      setTransportIcons(icons);
      console.log("Loaded transport types:", types);
      console.log("Loaded transport icons:", icons);
    } else {
      console.log("Transport dictionary not found for ID: 2");
    }
    setIsLoading(false);
  }, []);

  const getTransportIcon = (transportId: string) => {
    const iconName = transportIcons[transportId];
    
    if (iconName) {
      return <TransportIcon transportType={iconName.toLowerCase() as TransportType} size={20} className="h-5 w-5" />;
    }
    
    // Fallback to default icon
    return <TransportIcon transportType="helper" size={20} className="h-5 w-5 text-gray-500" />;
  };

  const drivers = [
    { 
      id: 5432, 
      name: "John Doe", 
      email: "john.doe@example.com", 
      phone: "(123) 456-7890", 
      status: "Active",
      transports: ["1", "3"]
    },
    { 
      id: 6543, 
      name: "Jane Smith", 
      email: "jane.smith@example.com", 
      phone: "(123) 456-7891", 
      status: "On leave",
      transports: ["2"] 
    },
    { 
      id: 7654, 
      name: "Mike Johnson", 
      email: "mike.johnson@example.com", 
      phone: "(123) 456-7892", 
      status: "Active",
      transports: ["1", "4"]
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Drivers Management</h1>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Driver
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Drivers</CardTitle>
            <CardDescription>Manage your delivery drivers and their current status.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Transport</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr key={driver.id}>
                    <td className="font-sans font-mono">{driver.id}</td>
                    <td>{driver.name}</td>
                    <td>{driver.email}</td>
                    <td>{driver.phone}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        {driver.transports.map((transportId) => {
                          return (
                            <div 
                              key={transportId} 
                              className="flex items-center justify-center p-2 rounded-md bg-muted" 
                              title={transportTypes[transportId] || `Transport ID: ${transportId}`}
                            >
                              {getTransportIcon(transportId)}
                            </div>
                          );
                        })}
                      </div>
                    </td>
                    <td>
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        driver.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}>
                        {driver.status}
                      </div>
                    </td>
                    <td className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DriversPage;
