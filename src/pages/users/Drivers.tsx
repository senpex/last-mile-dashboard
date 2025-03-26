
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
  Plane
} from "lucide-react";
import { getDictionary } from "@/lib/storage";
import { useEffect, useState } from "react";
import { DictionaryItem } from "@/types/dictionary";

interface TransportInfo {
  id: string;
  value: string;
  description?: string;
}

const DriversPage = () => {
  const [transportTypes, setTransportTypes] = useState<{[key: string]: TransportInfo}>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load transport types from the dictionary
    const transportDict = getDictionary("2");
    if (transportDict) {
      const types: {[key: string]: TransportInfo} = {};
      transportDict.items.forEach((item: DictionaryItem) => {
        types[item.id] = {
          id: item.id,
          value: item.value,
          description: item.description
        };
      });
      setTransportTypes(types);
      console.log("Loaded transport types:", types); // Debug: Log the loaded transport types
    } else {
      console.log("Transport dictionary not found for ID: 2"); // Debug: Log if dictionary not found
      
      // Initialize the transport dictionary with some default values for testing
      const defaultTypes = {
        "1": { id: "1", value: "car", description: "Standard passenger car" },
        "2": { id: "2", value: "suv", description: "Sport utility vehicle" },
        "3": { id: "3", value: "bus", description: "Public transport bus" },
        "4": { id: "4", value: "truck", description: "Heavy goods vehicle" },
        "5": { id: "5", value: "pickup_truck", description: "Light duty truck" },
        "6": { id: "6", value: "bike", description: "Motorcycle or bicycle" }
      };
      setTransportTypes(defaultTypes);
      console.log("Using default transport types:", defaultTypes);
    }
    setIsLoading(false);
  }, []);

  const getTransportIcon = (transportId: string) => {
    const transportInfo = transportTypes[transportId];
    if (!transportInfo) {
      return <HelpCircle className="h-5 w-5 text-gray-500" />;
    }
    
    // Map based on the transport type value (not ID)
    const typeToIconMap: {[key: string]: React.ReactNode} = {
      'car': <Car className="h-5 w-5 text-blue-600" />,
      'suv': <Car className="h-5 w-5 text-teal-600" />,
      'bus': <Bus className="h-5 w-5 text-green-600" />,
      'truck': <Truck className="h-5 w-5 text-red-600" />,
      'pickup_truck': <Truck className="h-5 w-5 text-orange-600" />,
      'bike': <Bike className="h-5 w-5 text-purple-600" />,
      'bicycle': <Bike className="h-5 w-5 text-indigo-600" />,
      'train': <Train className="h-5 w-5 text-cyan-600" />,
      'ferry': <Ship className="h-5 w-5 text-blue-800" />,
      'airplane': <Plane className="h-5 w-5 text-sky-600" />,
      'amusement': <FerrisWheel className="h-5 w-5 text-amber-600" />
    };

    // Match icon based on the actual transport type name
    const lowerCaseType = transportInfo.value.toLowerCase();
    return typeToIconMap[lowerCaseType] || <HelpCircle className="h-5 w-5 text-gray-500" />;
  };

  const drivers = [
    { 
      id: 5432, 
      name: "John Doe", 
      email: "john.doe@example.com", 
      phone: "(123) 456-7890", 
      status: "Active",
      transports: ["1", "3"] // IDs from Transport_types dictionary
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
                          const transportInfo = transportTypes[transportId];
                          return (
                            <div 
                              key={transportId} 
                              className="flex items-center gap-2 p-2 rounded-md bg-muted group relative"
                              title={transportInfo?.description || `Transport ID: ${transportId}`}
                            >
                              {getTransportIcon(transportId)}
                              <span className="text-xs hidden md:block">{transportInfo?.value || transportId}</span>
                              
                              {/* Show description tooltip on hover */}
                              <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-popover rounded shadow-lg 
                                opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-50 text-xs">
                                <strong>{transportInfo?.value || 'Unknown'}</strong>
                                <p>{transportInfo?.description || 'No description available'}</p>
                              </div>
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
