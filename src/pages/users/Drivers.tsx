import React, { useEffect, useState } from 'react';
import { Layout } from "@/components/layout/Layout";
import { Table } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Car, 
  Bus,
  Truck, 
  Bike, 
  HelpCircle,
  Train,
  FerrisWheel, 
  Ship,
  Plane,
  User,
  Tractor,
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
import { getDictionary } from "@/lib/storage";

const DriversPage = () => {
  const [transportTypes, setTransportTypes] = useState<{[key: string]: string}>({});
  const [transportIcons, setTransportIcons] = useState<{[key: string]: string | undefined}>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const transportDict = getDictionary("2");
    if (transportDict) {
      console.log("Transport Dictionary Items:", transportDict.items);
      const types: {[key: string]: string} = {};
      const icons: {[key: string]: string | undefined} = {};
      
      transportDict.items.forEach(item => {
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
    const transportType = transportTypes[transportId];
    
    if (iconName) {
      const lowerCaseIcon = iconName.toLowerCase();
      
      const iconMap: {[key: string]: React.ReactNode} = {
        'car': <Car className="h-5 w-5 text-blue-600" />,
        'suv': <SuvIcon className="h-5 w-5 text-teal-600" />,
        'bus': <Bus className="h-5 w-5 text-green-600" />,
        'truck': <Truck className="h-5 w-5 text-red-600" />,
        'pickup_truck': <PickupTruckIcon className="h-5 w-5 text-orange-600" size={20} />,
        'bike': <Bike className="h-5 w-5 text-purple-600" />,
        'bicycle': <Bike className="h-5 w-5 text-indigo-600" />,
        'motorcycle': <MotorcycleIcon className="h-5 w-5 text-pink-600" />,
        'scooter': <ScooterIcon className="h-5 w-5 text-rose-600" size={20} />,
        'train': <Train className="h-5 w-5 text-cyan-600" />,
        'ferry': <Ship className="h-5 w-5 text-blue-800" />,
        'sailboat': <SailboatIcon className="h-5 w-5 text-blue-400" />,
        'airplane': <Plane className="h-5 w-5 text-sky-600" />,
        'amusement': <FerrisWheel className="h-5 w-5 text-amber-600" />,
        'helper': <User className="h-5 w-5 text-violet-600" />,
        'tractor': <Tractor className="h-5 w-5 text-green-800" />,
        'van': <VanIcon className="h-5 w-5 text-gray-600" size={20} />,
        'limousine': <LimousineIcon className="h-5 w-5 text-gray-800" size={20} />,
        'atv': <AtvIcon className="h-5 w-5 text-brown-600" size={20} />,
        'shuttle': <ShuttleIcon className="h-5 w-5 text-indigo-800" />,
        'snow': <Snowflake className="h-5 w-5 text-blue-300" />,
        'electric': <Leaf className="h-5 w-5 text-green-500" />,
        'maintenance': <Wrench className="h-5 w-5 text-gray-700" />
      };
      
      if (iconMap[lowerCaseIcon]) {
        return iconMap[lowerCaseIcon];
      }
    }
    
    const lowerCaseType = transportType?.toLowerCase();
    
    const typeToIconMap: {[key: string]: React.ReactNode} = {
      'car': <Car className="h-5 w-5 text-blue-600" />,
      'suv': <SuvIcon className="h-5 w-5 text-teal-600" />,
      'bus': <Bus className="h-5 w-5 text-green-600" />,
      'truck': <Truck className="h-5 w-5 text-red-600" />,
      'pickup_truck': <PickupTruckIcon className="h-5 w-5 text-orange-600" size={20} />,
      'bike': <Bike className="h-5 w-5 text-purple-600" />,
      'bicycle': <Bike className="h-5 w-5 text-indigo-600" />,
      'motorcycle': <MotorcycleIcon className="h-5 w-5 text-pink-600" />,
      'scooter': <ScooterIcon className="h-5 w-5 text-rose-600" size={20} />,
      'train': <Train className="h-5 w-5 text-cyan-600" />,
      'ferry': <Ship className="h-5 w-5 text-blue-800" />,
      'sailboat': <SailboatIcon className="h-5 w-5 text-blue-400" />,
      'airplane': <Plane className="h-5 w-5 text-sky-600" />,
      'amusement': <FerrisWheel className="h-5 w-5 text-amber-600" />,
      'helper': <User className="h-5 w-5 text-violet-600" />,
      'tractor': <Tractor className="h-5 w-5 text-green-800" />,
      'van': <VanIcon className="h-5 w-5 text-gray-600" size={20} />,
      'limousine': <LimousineIcon className="h-5 w-5 text-gray-800" size={20} />,
      'atv': <AtvIcon className="h-5 w-5 text-brown-600" size={20} />,
      'shuttle': <ShuttleIcon className="h-5 w-5 text-indigo-800" />,
      'snow': <Snowflake className="h-5 w-5 text-blue-300" />,
      'electric': <Leaf className="h-5 w-5 text-green-500" />,
      'maintenance': <Wrench className="h-5 w-5 text-gray-700" />
    };

    return typeToIconMap[lowerCaseType] || <HelpCircle className="h-5 w-5 text-gray-500" />;
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
