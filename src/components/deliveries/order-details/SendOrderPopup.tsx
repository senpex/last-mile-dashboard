import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DriversSidebar } from "@/components/drivers/DriversSidebar";
import { DeliveryStatus } from "@/types/delivery";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";
import { Star, MapPin, Clock, Phone, X, MessageCircle } from "lucide-react";

interface Driver {
  id: number;
  name: string;
  rating: number;
  status: string;
  location: string;
  distance: string;
  eta: string;
  phone: string;
  avatar?: string;
  transportType: string;
  totalDeliveries: number;
}
interface SendOrderPopupProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}
export const SendOrderPopup = ({
  isOpen,
  onClose,
  orderId
}: SendOrderPopupProps) => {
  const [selectedDrivers, setSelectedDrivers] = useState<number[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<DeliveryStatus[]>([]);
  const [selectedZipcodes, setSelectedZipcodes] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [selectedTransports, setSelectedTransports] = useState<string[]>([]);
  const [selectedHireStatuses, setSelectedHireStatuses] = useState<string[]>([]);
  const [selectedRadius, setSelectedRadius] = useState<number>(15);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  // Mock drivers data with multiple transport types - expanded to 54 drivers
  const [drivers] = useState<Driver[]>([
    {
      id: 1,
      name: "John Smith",
      rating: 4.8,
      status: "Available",
      location: "Downtown SF",
      distance: "2.1 miles",
      eta: "8 min",
      phone: "+1 (555) 123-4567",
      transportType: "car,helper",
      totalDeliveries: 1234
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      rating: 4.9,
      status: "Available",
      location: "Mission District",
      distance: "3.5 miles",
      eta: "12 min",
      phone: "+1 (555) 987-6543",
      transportType: "suv",
      totalDeliveries: 856
    },
    {
      id: 3,
      name: "David Chen",
      rating: 4.7,
      status: "Busy",
      location: "SOMA",
      distance: "1.8 miles",
      eta: "15 min",
      phone: "+1 (555) 456-7890",
      transportType: "pickup_truck,9ft_cargo_van",
      totalDeliveries: 2103
    },
    {
      id: 4,
      name: "Sarah Johnson",
      rating: 4.6,
      status: "Available",
      location: "Financial District",
      distance: "4.2 miles",
      eta: "18 min",
      phone: "+1 (555) 321-0987",
      transportType: "10ft_box_truck",
      totalDeliveries: 678
    },
    {
      id: 5,
      name: "Michael Brown",
      rating: 4.5,
      status: "Available",
      location: "Castro",
      distance: "2.8 miles",
      eta: "10 min",
      phone: "+1 (555) 234-5678",
      transportType: "car",
      totalDeliveries: 945
    },
    {
      id: 6,
      name: "Emily Davis",
      rating: 4.7,
      status: "On Break",
      location: "Richmond",
      distance: "6.1 miles",
      eta: "25 min",
      phone: "+1 (555) 345-6789",
      transportType: "suv,helper",
      totalDeliveries: 723
    },
    {
      id: 7,
      name: "James Wilson",
      rating: 4.8,
      status: "Available",
      location: "Haight",
      distance: "3.2 miles",
      eta: "14 min",
      phone: "+1 (555) 456-7891",
      transportType: "pickup_truck",
      totalDeliveries: 1567
    },
    {
      id: 8,
      name: "Ashley Martinez",
      rating: 4.6,
      status: "Busy",
      location: "Sunset",
      distance: "5.4 miles",
      eta: "22 min",
      phone: "+1 (555) 567-8912",
      transportType: "9ft_cargo_van",
      totalDeliveries: 834
    },
    {
      id: 9,
      name: "Daniel Garcia",
      rating: 4.9,
      status: "Available",
      location: "North Beach",
      distance: "1.9 miles",
      eta: "9 min",
      phone: "+1 (555) 678-9123",
      transportType: "car,helper",
      totalDeliveries: 1289
    },
    {
      id: 10,
      name: "Jessica Thompson",
      rating: 4.4,
      status: "Available",
      location: "Chinatown",
      distance: "2.3 miles",
      eta: "11 min",
      phone: "+1 (555) 789-1234",
      transportType: "suv",
      totalDeliveries: 612
    },
    {
      id: 11,
      name: "Christopher Lee",
      rating: 4.7,
      status: "Offline",
      location: "Nob Hill",
      distance: "1.5 miles",
      eta: "7 min",
      phone: "+1 (555) 891-2345",
      transportType: "car",
      totalDeliveries: 1045
    },
    {
      id: 12,
      name: "Amanda White",
      rating: 4.8,
      status: "Available",
      location: "Potrero Hill",
      distance: "4.7 miles",
      eta: "19 min",
      phone: "+1 (555) 912-3456",
      transportType: "pickup_truck,helper",
      totalDeliveries: 987
    },
    {
      id: 13,
      name: "Ryan Taylor",
      rating: 4.5,
      status: "Available",
      location: "Dogpatch",
      distance: "3.8 miles",
      eta: "16 min",
      phone: "+1 (555) 123-4568",
      transportType: "10ft_box_truck",
      totalDeliveries: 756
    },
    {
      id: 14,
      name: "Nicole Anderson",
      rating: 4.9,
      status: "Busy",
      location: "Bernal Heights",
      distance: "5.2 miles",
      eta: "21 min",
      phone: "+1 (555) 234-5679",
      transportType: "9ft_cargo_van,helper",
      totalDeliveries: 1398
    },
    {
      id: 15,
      name: "Kevin Miller",
      rating: 4.6,
      status: "Available",
      location: "Glen Park",
      distance: "4.9 miles",
      eta: "20 min",
      phone: "+1 (555) 345-6781",
      transportType: "suv",
      totalDeliveries: 823
    },
    {
      id: 16,
      name: "Stephanie Jackson",
      rating: 4.7,
      status: "Available",
      location: "Inner Richmond",
      distance: "5.8 miles",
      eta: "24 min",
      phone: "+1 (555) 456-7892",
      transportType: "car,helper",
      totalDeliveries: 1167
    },
    {
      id: 17,
      name: "Brandon Harris",
      rating: 4.4,
      status: "On Break",
      location: "Outer Sunset",
      distance: "7.3 miles",
      eta: "28 min",
      phone: "+1 (555) 567-8923",
      transportType: "pickup_truck",
      totalDeliveries: 645
    },
    {
      id: 18,
      name: "Rachel Clark",
      rating: 4.8,
      status: "Available",
      location: "Marina",
      distance: "2.6 miles",
      eta: "12 min",
      phone: "+1 (555) 678-9134",
      transportType: "car",
      totalDeliveries: 1234
    },
    {
      id: 19,
      name: "Tyler Lewis",
      rating: 4.5,
      status: "Available",
      location: "Hayes Valley",
      distance: "2.1 miles",
      eta: "10 min",
      phone: "+1 (555) 789-1245",
      transportType: "suv,helper",
      totalDeliveries: 789
    },
    {
      id: 20,
      name: "Megan Walker",
      rating: 4.9,
      status: "Busy",
      location: "Lower Haight",
      distance: "3.4 miles",
      eta: "15 min",
      phone: "+1 (555) 891-2356",
      transportType: "9ft_cargo_van",
      totalDeliveries: 1456
    },
    {
      id: 21,
      name: "Justin Hall",
      rating: 4.6,
      status: "Available",
      location: "Mission Bay",
      distance: "3.1 miles",
      eta: "13 min",
      phone: "+1 (555) 912-3467",
      transportType: "pickup_truck,helper",
      totalDeliveries: 912
    },
    {
      id: 22,
      name: "Brittany Young",
      rating: 4.7,
      status: "Available",
      location: "SOMA",
      distance: "1.7 miles",
      eta: "8 min",
      phone: "+1 (555) 123-4569",
      transportType: "car",
      totalDeliveries: 1089
    },
    {
      id: 23,
      name: "Jordan King",
      rating: 4.4,
      status: "Offline",
      location: "Tenderloin",
      distance: "2.4 miles",
      eta: "11 min",
      phone: "+1 (555) 234-5671",
      transportType: "suv",
      totalDeliveries: 567
    },
    {
      id: 24,
      name: "Samantha Wright",
      rating: 4.8,
      status: "Available",
      location: "Russian Hill",
      distance: "1.8 miles",
      eta: "9 min",
      phone: "+1 (555) 345-6782",
      transportType: "car,helper",
      totalDeliveries: 1278
    },
    {
      id: 25,
      name: "Austin Lopez",
      rating: 4.5,
      status: "Available",
      location: "Pacific Heights",
      distance: "2.7 miles",
      eta: "12 min",
      phone: "+1 (555) 456-7893",
      transportType: "10ft_box_truck",
      totalDeliveries: 834
    },
    {
      id: 26,
      name: "Kayla Hill",
      rating: 4.9,
      status: "Busy",
      location: "Fillmore",
      distance: "4.3 miles",
      eta: "18 min",
      phone: "+1 (555) 567-8924",
      transportType: "pickup_truck",
      totalDeliveries: 1567
    },
    {
      id: 27,
      name: "Derek Scott",
      rating: 4.6,
      status: "Available",
      location: "Presidio",
      distance: "5.1 miles",
      eta: "22 min",
      phone: "+1 (555) 678-9135",
      transportType: "9ft_cargo_van,helper",
      totalDeliveries: 923
    },
    {
      id: 28,
      name: "Alexis Green",
      rating: 4.7,
      status: "On Break",
      location: "Japantown",
      distance: "3.6 miles",
      eta: "16 min",
      phone: "+1 (555) 789-1246",
      transportType: "suv",
      totalDeliveries: 1145
    },
    {
      id: 29,
      name: "Marcus Adams",
      rating: 4.4,
      status: "Available",
      location: "Western Addition",
      distance: "4.1 miles",
      eta: "17 min",
      phone: "+1 (555) 891-2357",
      transportType: "car",
      totalDeliveries: 678
    },
    {
      id: 30,
      name: "Victoria Baker",
      rating: 4.8,
      status: "Available",
      location: "Cow Hollow",
      distance: "2.9 miles",
      eta: "13 min",
      phone: "+1 (555) 912-3468",
      transportType: "pickup_truck,helper",
      totalDeliveries: 1234
    },
    {
      id: 31,
      name: "Cameron Gonzalez",
      rating: 4.5,
      status: "Available",
      location: "Telegraph Hill",
      distance: "1.6 miles",
      eta: "7 min",
      phone: "+1 (555) 123-4571",
      transportType: "car,helper",
      totalDeliveries: 789
    },
    {
      id: 32,
      name: "Jasmine Nelson",
      rating: 4.9,
      status: "Busy",
      location: "South Beach",
      distance: "2.8 miles",
      eta: "12 min",
      phone: "+1 (555) 234-5672",
      transportType: "suv",
      totalDeliveries: 1456
    },
    {
      id: 33,
      name: "Trevor Carter",
      rating: 4.6,
      status: "Available",
      location: "Excelsior",
      distance: "6.7 miles",
      eta: "26 min",
      phone: "+1 (555) 345-6783",
      transportType: "10ft_box_truck",
      totalDeliveries: 912
    },
    {
      id: 34,
      name: "Gabrielle Mitchell",
      rating: 4.7,
      status: "Available",
      location: "Visitacion Valley",
      distance: "7.9 miles",
      eta: "30 min",
      phone: "+1 (555) 456-7894",
      transportType: "9ft_cargo_van",
      totalDeliveries: 1089
    },
    {
      id: 35,
      name: "Logan Perez",
      rating: 4.4,
      status: "Offline",
      location: "Bayview",
      distance: "8.2 miles",
      eta: "32 min",
      phone: "+1 (555) 567-8925",
      transportType: "pickup_truck",
      totalDeliveries: 567
    },
    {
      id: 36,
      name: "Destiny Roberts",
      rating: 4.8,
      status: "Available",
      location: "Hunters Point",
      distance: "7.5 miles",
      eta: "29 min",
      phone: "+1 (555) 678-9136",
      transportType: "car",
      totalDeliveries: 1278
    },
    {
      id: 37,
      name: "Ethan Turner",
      rating: 4.5,
      status: "Available",
      location: "Portola",
      distance: "5.9 miles",
      eta: "24 min",
      phone: "+1 (555) 789-1247",
      transportType: "suv,helper",
      totalDeliveries: 834
    },
    {
      id: 38,
      name: "Tiffany Phillips",
      rating: 4.9,
      status: "Busy",
      location: "Diamond Heights",
      distance: "4.8 miles",
      eta: "20 min",
      phone: "+1 (555) 891-2358",
      transportType: "car,helper",
      totalDeliveries: 1567
    },
    {
      id: 39,
      name: "Sean Campbell",
      rating: 4.6,
      status: "Available",
      location: "Twin Peaks",
      distance: "4.4 miles",
      eta: "19 min",
      phone: "+1 (555) 912-3469",
      transportType: "pickup_truck",
      totalDeliveries: 923
    },
    {
      id: 40,
      name: "Crystal Parker",
      rating: 4.7,
      status: "On Break",
      location: "Forest Hill",
      distance: "5.3 miles",
      eta: "23 min",
      phone: "+1 (555) 123-4572",
      transportType: "9ft_cargo_van,helper",
      totalDeliveries: 1145
    },
    {
      id: 41,
      name: "Corey Evans",
      rating: 4.4,
      status: "Available",
      location: "West Portal",
      distance: "6.1 miles",
      eta: "25 min",
      phone: "+1 (555) 234-5673",
      transportType: "10ft_box_truck",
      totalDeliveries: 678
    },
    {
      id: 42,
      name: "Vanessa Edwards",
      rating: 4.8,
      status: "Available",
      location: "Ingleside",
      distance: "6.8 miles",
      eta: "27 min",
      phone: "+1 (555) 345-6784",
      transportType: "suv",
      totalDeliveries: 1234
    },
    {
      id: 43,
      name: "Isaac Collins",
      rating: 4.5,
      status: "Available",
      location: "Oceanview",
      distance: "8.4 miles",
      eta: "33 min",
      phone: "+1 (555) 456-7895",
      transportType: "car",
      totalDeliveries: 789
    },
    {
      id: 44,
      name: "Sierra Stewart",
      rating: 4.9,
      status: "Busy",
      location: "Merced Heights",
      distance: "7.1 miles",
      eta: "28 min",
      phone: "+1 (555) 567-8926",
      transportType: "pickup_truck,helper",
      totalDeliveries: 1456
    },
    {
      id: 45,
      name: "Blake Sanchez",
      rating: 4.6,
      status: "Available",
      location: "Stonestown",
      distance: "6.9 miles",
      eta: "27 min",
      phone: "+1 (555) 678-9137",
      transportType: "9ft_cargo_van",
      totalDeliveries: 912
    },
    {
      id: 46,
      name: "Alicia Morris",
      rating: 4.7,
      status: "Available",
      location: "Lakeshore",
      distance: "7.8 miles",
      eta: "31 min",
      phone: "+1 (555) 789-1248",
      transportType: "car,helper",
      totalDeliveries: 1089
    },
    {
      id: 47,
      name: "Caleb Rogers",
      rating: 4.4,
      status: "Offline",
      location: "Parkside",
      distance: "8.1 miles",
      eta: "32 min",
      phone: "+1 (555) 891-2359",
      transportType: "suv",
      totalDeliveries: 567
    },
    {
      id: 48,
      name: "Jenna Reed",
      rating: 4.8,
      status: "Available",
      location: "Outer Richmond",
      distance: "7.2 miles",
      eta: "29 min",
      phone: "+1 (555) 912-3471",
      transportType: "10ft_box_truck",
      totalDeliveries: 1278
    },
    {
      id: 49,
      name: "Malik Cook",
      rating: 4.5,
      status: "Available",
      location: "Seacliff",
      distance: "5.7 miles",
      eta: "24 min",
      phone: "+1 (555) 123-4573",
      transportType: "pickup_truck",
      totalDeliveries: 834
    },
    {
      id: 50,
      name: "Maya Bailey",
      rating: 4.9,
      status: "Busy",
      location: "Lincoln Park",
      distance: "6.3 miles",
      eta: "26 min",
      phone: "+1 (555) 234-5674",
      transportType: "car",
      totalDeliveries: 1567
    },
    {
      id: 51,
      name: "Devin Rivera",
      rating: 4.6,
      status: "Available",
      location: "Richmond District",
      distance: "6.5 miles",
      eta: "26 min",
      phone: "+1 (555) 345-6785",
      transportType: "suv,helper",
      totalDeliveries: 923
    },
    {
      id: 52,
      name: "Paige Cooper",
      rating: 4.7,
      status: "On Break",
      location: "Golden Gate Park",
      distance: "5.4 miles",
      eta: "23 min",
      phone: "+1 (555) 456-7896",
      transportType: "9ft_cargo_van",
      totalDeliveries: 1145
    },
    {
      id: 53,
      name: "Jared Richardson",
      rating: 4.4,
      status: "Available",
      location: "Panhandle",
      distance: "3.7 miles",
      eta: "16 min",
      phone: "+1 (555) 567-8927",
      transportType: "car,helper",
      totalDeliveries: 678
    },
    {
      id: 54,
      name: "Chloe Cox",
      rating: 4.8,
      status: "Available",
      location: "Cole Valley",
      distance: "3.9 miles",
      eta: "17 min",
      phone: "+1 (555) 678-9138",
      transportType: "pickup_truck,helper",
      totalDeliveries: 1234
    }
  ]);

  const allDeliveryStatuses: DeliveryStatus[] = ["Available", "Busy", "On Break", "Offline", "Online"];
  const allZipcodes = ["94102", "94103", "94104", "94105", "94107", "94108"];
  const allCities = ["San Francisco", "Oakland", "Berkeley", "Daly City"];
  const allStates = ["California", "Nevada", "Oregon"];
  const handleDriverSelect = (driverId: number) => {
    setSelectedDrivers(prev => prev.includes(driverId) ? prev.filter(id => id !== driverId) : [...prev, driverId]);
  };

  const handleSelectAll = () => {
    if (selectedDrivers.length === drivers.length) {
      setSelectedDrivers([]);
    } else {
      setSelectedDrivers(drivers.map(driver => driver.id));
    }
  };

  const handleSendToSelected = () => {
    if (selectedDrivers.length === 0) {
      alert("Please select at least one driver");
      return;
    }
    console.log(`Sending order ${orderId} to drivers:`, selectedDrivers);
    alert(`Order sent to ${selectedDrivers.length} driver(s)`);
    onClose();
  };

  const handleChatWithDriver = (driver: Driver, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent driver selection when clicking chat button
    console.log(`Initiating chat with driver: ${driver.name} (ID: ${driver.id})`);
    // TODO: Implement chat functionality - this could open a chat modal or navigate to chat
    alert(`Opening chat with ${driver.name}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Busy":
        return "bg-orange-100 text-orange-800";
      case "On Break":
        return "bg-yellow-100 text-yellow-800";
      case "Offline":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };
  const onFiltersAdd = (filters: any) => {
    console.log("Filters updated:", filters);

    // Update all filter states when filters are applied
    if (filters.statuses !== undefined) {
      setSelectedStatuses(filters.statuses);
    }
    if (filters.zipcodes !== undefined) {
      setSelectedZipcodes(filters.zipcodes);
    }
    if (filters.cities !== undefined) {
      setSelectedCities(filters.cities);
    }
    if (filters.states !== undefined) {
      setSelectedStates(filters.states);
    }
    if (filters.profiles !== undefined) {
      setSelectedProfiles(filters.profiles);
    }
    if (filters.transports !== undefined) {
      setSelectedTransports(filters.transports);
    }
    if (filters.hireStatuses !== undefined) {
      setSelectedHireStatuses(filters.hireStatuses);
    }
    if (filters.radius !== undefined) {
      setSelectedRadius(filters.radius);
    }
    if (filters.names !== undefined) {
      setSelectedNames(filters.names);
    }
  };
  const clearFilter = (type: string, value: string) => {
    switch (type) {
      case 'status':
        setSelectedStatuses(prev => prev.filter(s => s !== value));
        break;
      case 'zipcode':
        setSelectedZipcodes(prev => prev.filter(z => z !== value));
        break;
      case 'city':
        setSelectedCities(prev => prev.filter(c => c !== value));
        break;
      case 'state':
        setSelectedStates(prev => prev.filter(s => s !== value));
        break;
      case 'profile':
        setSelectedProfiles(prev => prev.filter(p => p !== value));
        break;
      case 'transport':
        setSelectedTransports(prev => prev.filter(t => t !== value));
        break;
      case 'hireStatus':
        setSelectedHireStatuses(prev => prev.filter(h => h !== value));
        break;
      case 'radius':
        setSelectedRadius(15);
        break;
      case 'name':
        setSelectedNames(prev => prev.filter(n => n !== value));
        break;
    }
  };
  const hasActiveFilters = selectedStatuses.length > 0 || selectedZipcodes.length > 0 || selectedCities.length > 0 || selectedStates.length > 0 || selectedProfiles.length > 0 || selectedTransports.length > 0 || selectedHireStatuses.length > 0 || selectedNames.length > 0;

  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-6xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Send Order #{orderId} to Drivers</DialogTitle>
        </DialogHeader>
        
        <div className="flex h-[600px]">
          {/* Filter Sidebar */}
          <div className="w-[275px] border-r">
            <DriversSidebar 
              open={true} 
              onClose={() => {}} 
              selectedStatuses={selectedStatuses} 
              setSelectedStatuses={setSelectedStatuses} 
              allDeliveryStatuses={allDeliveryStatuses} 
              allZipcodes={allZipcodes} 
              selectedZipcodes={selectedZipcodes} 
              setSelectedZipcodes={setSelectedZipcodes} 
              allCities={allCities} 
              selectedCities={selectedCities} 
              setSelectedCities={setSelectedCities} 
              allStates={allStates} 
              selectedStates={selectedStates} 
              setSelectedStates={setSelectedStates} 
              onFiltersAdd={onFiltersAdd} 
            />
          </div>

          {/* Drivers List */}
          <div className="flex-1 flex flex-col">
            {/* Active Filters */}
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Active Filters</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
                  <span>Radius: {selectedRadius} miles</span>
                  <button 
                    className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
                    onClick={() => clearFilter('radius', '')}
                  >
                    &times;
                  </button>
                </div>
                {selectedNames.map(name => (
                  <div key={name} className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
                    <span>Name: {name}</span>
                    <button 
                      className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
                      onClick={() => clearFilter('name', name)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
                {selectedStatuses.map(status => (
                  <div key={status} className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
                    <span>Status: {status}</span>
                    <button 
                      className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
                      onClick={() => clearFilter('status', status)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
                {selectedZipcodes.map(zipcode => (
                  <div key={zipcode} className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
                    <span>Zipcode: {zipcode}</span>
                    <button 
                      className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
                      onClick={() => clearFilter('zipcode', zipcode)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
                {selectedCities.map(city => (
                  <div key={city} className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
                    <span>City: {city}</span>
                    <button 
                      className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
                      onClick={() => clearFilter('city', city)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
                {selectedStates.map(state => (
                  <div key={state} className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
                    <span>State: {state}</span>
                    <button 
                      className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
                      onClick={() => clearFilter('state', state)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
                {selectedProfiles.map(profile => (
                  <div key={profile} className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
                    <span>Profile: {profile}</span>
                    <button 
                      className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
                      onClick={() => clearFilter('profile', profile)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
                {selectedTransports.map(transport => (
                  <div key={transport} className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
                    <span>Transport: {transport}</span>
                    <button 
                      className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
                      onClick={() => clearFilter('transport', transport)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
                {selectedHireStatuses.map(hireStatus => (
                  <div key={hireStatus} className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
                    <span>Hire Status: {hireStatus}</span>
                    <button 
                      className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
                      onClick={() => clearFilter('hireStatus', hireStatus)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-2">
                {drivers.map(driver => {
                  const transportTypes = driver.transportType.split(',');
                  
                  return (
                    <div 
                      key={driver.id} 
                      className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${selectedDrivers.includes(driver.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`} 
                      onClick={() => handleDriverSelect(driver.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={driver.avatar} />
                            <AvatarFallback className="text-xs">{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-sm truncate">{driver.name}</h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 hover:bg-blue-100"
                                  onClick={(e) => handleChatWithDriver(driver, e)}
                                  title={`Chat with ${driver.name}`}
                                >
                                  <MessageCircle className="h-3 w-3 text-blue-600" />
                                </Button>
                                <Badge variant="outline" className={`text-xs px-1 py-0.5 ${getStatusColor(driver.status)}`}>
                                  {driver.status}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center gap-1">
                                {transportTypes.map((transportType, index) => (
                                  <div 
                                    key={index}
                                    className="flex items-center justify-center p-1 rounded bg-muted"
                                    title={transportType}
                                  >
                                    <TransportIcon 
                                      transportType={transportType.trim() as TransportType} 
                                      size={12} 
                                      className="h-3 w-3" 
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span>{driver.rating}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  <span className="truncate">{driver.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{driver.eta}</span>
                                </div>
                              </div>
                              <span className="text-xs">{driver.totalDeliveries} deliveries</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Footer Actions */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="text-sm text-muted-foreground">
                    {selectedDrivers.length} driver(s) selected
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleSelectAll}
                  >
                    {selectedDrivers.length === drivers.length ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleSendToSelected} disabled={selectedDrivers.length === 0}>
                    Send to Selected ({selectedDrivers.length})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};
