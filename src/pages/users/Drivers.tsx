
import { Layout } from "@/components/layout/Layout";
import { Table } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Car, Bus, Truck, Bike } from "lucide-react";
import { getDictionary } from "@/lib/storage";
import { useEffect, useState } from "react";

const DriversPage = () => {
  const [transportTypes, setTransportTypes] = useState<{[key: string]: string}>({});

  useEffect(() => {
    // Load transport types from the dictionary
    const transportDict = getDictionary("2");
    if (transportDict) {
      const types: {[key: string]: string} = {};
      transportDict.items.forEach(item => {
        types[item.id] = item.value;
      });
      setTransportTypes(types);
      console.log("Loaded transport types:", types); // Debug: Log the loaded transport types
    } else {
      console.log("Transport dictionary not found for ID: 2"); // Debug: Log if dictionary not found
    }
  }, []);

  // Transport icon mapping
  const getTransportIcon = (type: string | undefined) => {
    console.log("Getting icon for transport type:", type); // Debug: Log the transport type
    
    // Guard against undefined type
    if (!type) {
      console.log("Transport type is undefined, using default icon");
      return <Car className="h-5 w-5 text-gray-500" />;
    }
    
    const lowercaseType = type.toLowerCase();
    const iconMap: {[key: string]: React.ReactNode} = {
      'car': <Car className="h-5 w-5 text-blue-600" />,
      'suv': <Car className="h-5 w-5 text-teal-600" />,
      'bus': <Bus className="h-5 w-5 text-green-600" />,
      'truck': <Truck className="h-5 w-5 text-red-600" />,
      'pickup_truck': <Truck className="h-5 w-5 text-orange-600" />,
      'bike': <Bike className="h-5 w-5 text-purple-600" />,
      'bicycle': <Bike className="h-5 w-5 text-purple-600" />,
    };

    // Default to Car icon if no specific match found
    return iconMap[lowercaseType] || <Car className="h-5 w-5 text-gray-500" />;
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
                          // Debug: log the values used for rendering
                          console.log(`Transport ID: ${transportId}, Type: ${transportTypes[transportId]}`);
                          
                          return (
                            <div 
                              key={transportId} 
                              className="flex items-center justify-center p-2 rounded-md bg-muted" 
                              title={transportTypes[transportId] || 'Unknown transport'}
                            >
                              {getTransportIcon(transportTypes[transportId])}
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
