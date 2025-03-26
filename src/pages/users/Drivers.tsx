
import React from 'react';
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
import { useEffect, useState } from "react";

// Create custom icons for motorcycle and shuttle since they're not available in lucide-react
const MotorcycleIcon = ({ className = "", size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 16l-3 6h2l2-4" />
    <path d="M5.5 12H10l4 4.5V20" />
    <path d="M14 12h1.5a3.5 3.5 0 0 0 0-7h-3L16 12" />
    <circle cx="5" cy="15" r="1" />
    <circle cx="18" cy="15" r="1" />
  </svg>
);

const ShuttleIcon = ({ className = "", size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 6h18v10H3z" />
    <path d="M3 16h18" />
    <path d="M8 6v10" />
    <path d="M16 6v10" />
    <path d="M12 6v10" />
    <path d="M4 3v3" />
    <path d="M20 3v3" />
    <path d="M5 16v2" />
    <path d="M19 16v2" />
  </svg>
);

const SailboatIcon = ({ className = "", size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z" />
    <path d="M21 18c0-1.87-1.5-6-9-6-7.5 0-9 4.13-9 6" />
    <path d="M12 2v16" />
    <path d="M4 11s1.5-5 8-5 8 5 8 5" />
  </svg>
);

const DriversPage = () => {
  const [transportTypes, setTransportTypes] = useState<{[key: string]: string}>({});
  const [transportIcons, setTransportIcons] = useState<{[key: string]: string | undefined}>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const transportDict = getDictionary("2");
    if (transportDict) {
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
      const defaultTypes = {
        "1": "car",
        "2": "suv",
        "3": "bus",
        "4": "truck",
        "5": "pickup_truck",
        "6": "bike"
      };
      setTransportTypes(defaultTypes);
      console.log("Using default transport types:", defaultTypes);
    }
    setIsLoading(false);
  }, []);

  const getTransportIcon = (transportId: string) => {
    // First check if we have an explicit icon from the dictionary
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
    
    // Fall back to transport type if no icon match
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
