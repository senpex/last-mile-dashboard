
import { useState, useEffect } from 'react';
import type { Dictionary } from "@/types/dictionary";
import { getDictionary } from "@/lib/storage";

export interface DeliveryLocation {
  name: string;
  address: string;
}

export interface Delivery {
  id: number;
  packageId: string;
  orderName: string;
  status: string;
  pickupTime: string;
  pickupLocation: DeliveryLocation;
  dropoffTime: string;
  dropoffLocation: DeliveryLocation;
  price: string;
  tip: string;
  fees: string;
  courier: string;
  organization: string;
  distance: string;
  customerName?: string; // Optional field that gets populated from dropoffLocation.name
}

export const useDeliveries = () => {
  const [filteredDeliveries, setFilteredDeliveries] = useState<Delivery[]>([]);
  const [statusDictionary, setStatusDictionary] = useState<Dictionary | null>(null);

  const deliveries: Delivery[] = [
    {
      id: 1,
      packageId: "WMT-10042501",
      orderName: "Grocery Delivery",
      status: "Dropoff Complete",
      pickupTime: "03/24/2025 12:49 PM",
      pickupLocation: {
        name: "Walmart 0100 - Bentonville, AR",
        address: "406 S WALTON BLVD, BENTONVILLE, AR 72712, US"
      },
      dropoffTime: "03/24/2025 08:00 PM",
      dropoffLocation: {
        name: "Saranya Natarajan",
        address: "1600 Emmerson St, Centerton, AR 72719, US"
      },
      price: "$33.00",
      tip: "$0.00",
      fees: "",
      courier: "GARY BURTON",
      organization: "Walmart US Stores",
      distance: "6.9 mi"
    },
    {
      id: 2,
      packageId: "WMT-10042502",
      orderName: "Weekly Essentials",
      status: "Dropoff Complete",
      pickupTime: "03/24/2025 11:34 AM",
      pickupLocation: {
        name: "Walmart 0100 - Bentonville, AR",
        address: "406 S WALTON BLVD, BENTONVILLE, AR 72712, US"
      },
      dropoffTime: "03/24/2025 08:00 PM",
      dropoffLocation: {
        name: "Roma Solis",
        address: "1051 Little Osage Ave, Bentonville, AR 72713, US"
      },
      price: "$33.00",
      tip: "$0.00",
      fees: "",
      courier: "GARY BURTON",
      organization: "Walmart US Stores",
      distance: "4.1 mi"
    },
    {
      id: 3,
      packageId: "WMT-10042503",
      orderName: "Pantry Restock",
      status: "Dropoff Complete",
      pickupTime: "03/24/2025 11:34 AM",
      pickupLocation: {
        name: "Walmart 0100 - Bentonville, AR",
        address: "406 S WALTON BLVD, BENTONVILLE, AR 72712, US"
      },
      dropoffTime: "03/24/2025 08:00 PM",
      dropoffLocation: {
        name: "Juan Galarraga",
        address: "3511 SW Awakening Ave, Bentonville, AR 72713, US"
      },
      price: "$25.00",
      tip: "$0.00",
      fees: "",
      courier: "Michael Groves",
      organization: "Walmart US Stores",
      distance: "6.1 mi"
    },
    {
      id: 4,
      packageId: "WMT-10042504",
      orderName: "Home Essentials",
      status: "Dropoff Complete",
      pickupTime: "03/24/2025 11:34 AM",
      pickupLocation: {
        name: "Walmart 0100 - Bentonville, AR",
        address: "406 S WALTON BLVD, BENTONVILLE, AR 72712, US"
      },
      dropoffTime: "03/24/2025 08:00 PM",
      dropoffLocation: {
        name: "Wendy Lancaster",
        address: "6305 SW Brush Blvd, Bentonville, AR 72713, US"
      },
      price: "$33.00",
      tip: "$0.00",
      fees: "",
      courier: "Laura Ramirez",
      organization: "Walmart US Stores",
      distance: "7.4 mi"
    },
    {
      id: 5,
      packageId: "CUN-21980357",
      orderName: "Lunch Order",
      status: "Canceled By Customer",
      pickupTime: "03/24/2025 11:20 AM",
      pickupLocation: {
        name: "Curry Up Now - Palo Alto",
        address: "321 Hamilton Ave, Palo Alto, CA 94301, US"
      },
      dropoffTime: "03/24/2025 11:40 AM",
      dropoffLocation: {
        name: "Duane Morris LLP",
        address: "260 Homer Ave Ste 202, Palo Alto, CA 94301, USA"
      },
      price: "$0.00",
      tip: "$5.00",
      fees: "",
      courier: "",
      organization: "Curry Up Now",
      distance: "0.2 mi"
    },
    {
      id: 6,
      packageId: "TGT-80031245",
      orderName: "Household Items",
      status: "In Transit",
      pickupTime: "03/24/2025 10:15 AM",
      pickupLocation: {
        name: "Target Store #5372 - Rogers, AR",
        address: "2404 W Pleasant Crossing Dr, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 12:30 PM",
      dropoffLocation: {
        name: "Melissa Parker",
        address: "211 SE Kenwood St, Bentonville, AR 72712, US"
      },
      price: "$42.50",
      tip: "$7.00",
      fees: "$3.99",
      courier: "James Wilson",
      organization: "Target Corporation",
      distance: "5.2 mi"
    },
    {
      id: 7,
      packageId: "WMT-10042505",
      orderName: "Electronics Bundle",
      status: "Arrived For Pickup",
      pickupTime: "03/24/2025 09:30 AM",
      pickupLocation: {
        name: "Walmart Supercenter - Pea Ridge, AR",
        address: "240 Slack St, Pea Ridge, AR 72751, US"
      },
      dropoffTime: "03/24/2025 11:15 AM",
      dropoffLocation: {
        name: "David Thompson",
        address: "345 Lincoln Way, Bella Vista, AR 72714, US"
      },
      price: "$129.99",
      tip: "$15.00",
      fees: "$4.99",
      courier: "Ashley Rodriguez",
      organization: "Walmart US Stores",
      distance: "8.7 mi"
    },
    {
      id: 8,
      packageId: "AMZ-67294531",
      orderName: "Office Supplies",
      status: "Picking Up",
      pickupTime: "03/24/2025 11:00 AM",
      pickupLocation: {
        name: "Amazon Locker - Bentonville",
        address: "3701 SE Dodson Rd, Bentonville, AR 72712, US"
      },
      dropoffTime: "03/24/2025 12:45 PM",
      dropoffLocation: {
        name: "Bentonville Business Center",
        address: "609 SW 8th St, Bentonville, AR 72712, US"
      },
      price: "$89.99",
      tip: "$10.00",
      fees: "$2.99",
      courier: "Michael Chen",
      organization: "Amazon Logistics",
      distance: "3.2 mi"
    },
    {
      id: 9,
      packageId: "COS-59127834",
      orderName: "Beauty Products",
      status: "Recipient Unavailable",
      pickupTime: "03/24/2025 01:30 PM",
      pickupLocation: {
        name: "Ulta Beauty - Rogers",
        address: "4208 S Pleasant Crossing Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 03:15 PM",
      dropoffLocation: {
        name: "Sarah Jenkins",
        address: "412 NE Oak St, Bentonville, AR 72712, US"
      },
      price: "$75.45",
      tip: "$12.00",
      fees: "$5.99",
      courier: "Lisa Martinez",
      organization: "Ulta Beauty",
      distance: "7.8 mi"
    },
    {
      id: 10,
      packageId: "GRB-48293561",
      orderName: "Meal Delivery",
      status: "Draft Order",
      pickupTime: "03/24/2025 05:45 PM",
      pickupLocation: {
        name: "Grubhub - Bentonville",
        address: "1400 SE Walton Blvd, Bentonville, AR 72712, US"
      },
      dropoffTime: "03/24/2025 06:30 PM",
      dropoffLocation: {
        name: "Robert Adams",
        address: "987 NW 3rd St, Bentonville, AR 72712, US"
      },
      price: "$28.75",
      tip: "$5.50",
      fees: "$2.99",
      courier: "",
      organization: "Grubhub",
      distance: "2.5 mi"
    },
    {
      id: 11,
      packageId: "CRB-58291734",
      orderName: "Home Decor",
      status: "Paid Order",
      pickupTime: "03/24/2025 09:15 AM",
      pickupLocation: {
        name: "Crate & Barrel - Pinnacle Hills",
        address: "2203 S Promenade Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 11:30 AM",
      dropoffLocation: {
        name: "Katherine Lewis",
        address: "521 SW Bright Rd, Bentonville, AR 72712, US"
      },
      price: "$189.99",
      tip: "$20.00",
      fees: "$9.99",
      courier: "Marcus Johnson",
      organization: "Crate & Barrel",
      distance: "9.3 mi"
    },
    {
      id: 12,
      packageId: "TRG-95128734",
      orderName: "Pet Supplies",
      status: "Courier Selected",
      pickupTime: "03/24/2025 02:00 PM",
      pickupLocation: {
        name: "PetSmart - Rogers",
        address: "4207 Pleasant Crossing Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 03:45 PM",
      dropoffLocation: {
        name: "Thomas Wright",
        address: "734 NW Liberty Ave, Bentonville, AR 72712, US"
      },
      price: "$65.95",
      tip: "$8.00",
      fees: "$3.49",
      courier: "Samantha Brown",
      organization: "PetSmart",
      distance: "8.1 mi"
    },
    {
      id: 13,
      packageId: "LWS-45692871",
      orderName: "Hardware Delivery",
      status: "Item Not Given",
      pickupTime: "03/24/2025 10:45 AM",
      pickupLocation: {
        name: "Lowe's Home Improvement - Rogers",
        address: "3721 W Walnut St, Rogers, AR 72756, US"
      },
      dropoffTime: "03/24/2025 12:15 PM",
      dropoffLocation: {
        name: "Daniel Brooks",
        address: "832 SW Maplewood Ave, Bentonville, AR 72712, US"
      },
      price: "$112.97",
      tip: "$15.00",
      fees: "$6.99",
      courier: "Frank Torres",
      organization: "Lowe's",
      distance: "7.6 mi"
    },
    {
      id: 14,
      packageId: "BBS-37158246",
      orderName: "Baby Products",
      status: "Reported Order",
      pickupTime: "03/24/2025 11:30 AM",
      pickupLocation: {
        name: "Buy Buy Baby - Rogers",
        address: "2203 Promenade Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 01:15 PM",
      dropoffLocation: {
        name: "Jennifer Miller",
        address: "546 NE A St, Bentonville, AR 72712, US"
      },
      price: "$97.45",
      tip: "$12.00",
      fees: "$4.99",
      courier: "Paul Garcia",
      organization: "Buy Buy Baby",
      distance: "8.9 mi"
    },
    {
      id: 15,
      packageId: "WFD-67194238",
      orderName: "Grocery Essentials",
      status: "Waiting For Pay",
      pickupTime: "03/24/2025 03:15 PM",
      pickupLocation: {
        name: "Whole Foods Market - Rogers",
        address: "3425 N Market St, Rogers, AR 72756, US"
      },
      dropoffTime: "03/24/2025 04:45 PM",
      dropoffLocation: {
        name: "Amanda Williams",
        address: "982 SW Juniper St, Bentonville, AR 72712, US"
      },
      price: "$78.95",
      tip: "",
      fees: "$4.99",
      courier: "",
      organization: "Whole Foods",
      distance: "6.8 mi"
    },
    {
      id: 16,
      packageId: "BBW-42953178",
      orderName: "Home Fragrances",
      status: "Cancelled By Admin",
      pickupTime: "03/24/2025 01:00 PM",
      pickupLocation: {
        name: "Bath & Body Works - Pinnacle Hills",
        address: "2203 S Promenade Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 02:30 PM",
      dropoffLocation: {
        name: "Emily Davis",
        address: "428 SE C St, Bentonville, AR 72712, US"
      },
      price: "$0.00",
      tip: "$0.00",
      fees: "$0.00",
      courier: "",
      organization: "Bath & Body Works",
      distance: "9.1 mi"
    },
    {
      id: 17,
      packageId: "TSC-83921647",
      orderName: "Farm Supplies",
      status: "Scheduled Order",
      pickupTime: "03/25/2025 09:00 AM",
      pickupLocation: {
        name: "Tractor Supply Co. - Bentonville",
        address: "1401 SW Regional Airport Blvd, Bentonville, AR 72712, US"
      },
      dropoffTime: "03/25/2025 10:30 AM",
      dropoffLocation: {
        name: "Richard Hayes",
        address: "324 County Road 40, Pea Ridge, AR 72751, US"
      },
      price: "$145.97",
      tip: "$25.00",
      fees: "$7.99",
      courier: "",
      organization: "Tractor Supply",
      distance: "11.3 mi"
    },
    {
      id: 18,
      packageId: "BNS-95713428",
      orderName: "Books & Media",
      status: "Repeated Order",
      pickupTime: "03/24/2025 02:30 PM",
      pickupLocation: {
        name: "Barnes & Noble - Rogers",
        address: "2795 W Walnut St, Rogers, AR 72756, US"
      },
      dropoffTime: "03/24/2025 04:00 PM",
      dropoffLocation: {
        name: "William Moore",
        address: "765 SW 8th St, Bentonville, AR 72712, US"
      },
      price: "$54.95",
      tip: "$7.00",
      fees: "$3.99",
      courier: "",
      organization: "Barnes & Noble",
      distance: "5.7 mi"
    },
    {
      id: 19,
      packageId: "HMD-78321965",
      orderName: "Home Office Setup",
      status: "Forgot",
      pickupTime: "03/24/2025 11:00 AM",
      pickupLocation: {
        name: "Home Depot - Rogers",
        address: "3721 W Walnut St, Rogers, AR 72756, US"
      },
      dropoffTime: "03/24/2025 12:30 PM",
      dropoffLocation: {
        name: "Steven Clark",
        address: "983 NW 4th St, Bentonville, AR 72712, US"
      },
      price: "$199.97",
      tip: "$20.00",
      fees: "$8.99",
      courier: "Derek Johnson",
      organization: "Home Depot",
      distance: "6.9 mi"
    },
    {
      id: 20,
      packageId: "CVS-36198245",
      orderName: "Pharmacy Items",
      status: "Started Working",
      pickupTime: "03/24/2025 10:15 AM",
      pickupLocation: {
        name: "CVS Pharmacy - Bentonville",
        address: "100 SW 14th St, Bentonville, AR 72712, US"
      },
      dropoffTime: "03/24/2025 11:00 AM",
      dropoffLocation: {
        name: "Maria Lopez",
        address: "674 SE J St, Bentonville, AR 72712, US"
      },
      price: "$34.95",
      tip: "$5.00",
      fees: "$2.99",
      courier: "Nicole Adams",
      organization: "CVS Health",
      distance: "2.3 mi"
    },
    {
      id: 21,
      packageId: "BKS-42967831",
      orderName: "Bakery Order",
      status: "Accepted Repeated Order",
      pickupTime: "03/24/2025 08:30 AM",
      pickupLocation: {
        name: "The Bakery - Downtown Bentonville",
        address: "104 SW A St, Bentonville, AR 72712, US"
      },
      dropoffTime: "03/24/2025 09:15 AM",
      dropoffLocation: {
        name: "Walmart Corporate Office",
        address: "702 SW 8th St, Bentonville, AR 72712, US"
      },
      price: "$85.00",
      tip: "$15.00",
      fees: "$0.00",
      courier: "Tyler Wilson",
      organization: "The Bakery",
      distance: "0.8 mi"
    },
    {
      id: 22,
      packageId: "ABR-56834219",
      orderName: "Clothing Bundle",
      status: "Draft Order",
      pickupTime: "03/24/2025 03:00 PM",
      pickupLocation: {
        name: "American Eagle - Pinnacle Hills",
        address: "2203 S Promenade Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 04:30 PM",
      dropoffLocation: {
        name: "Rebecca White",
        address: "1233 SW Regional Airport Blvd, Bentonville, AR 72712, US"
      },
      price: "$149.95",
      tip: "",
      fees: "$7.99",
      courier: "",
      organization: "American Eagle",
      distance: "8.7 mi"
    },
    {
      id: 23,
      packageId: "CKR-78321965",
      orderName: "Kitchen Appliances",
      status: "Paid Order",
      pickupTime: "03/24/2025 12:30 PM",
      pickupLocation: {
        name: "Williams-Sonoma - Pinnacle Hills",
        address: "2203 S Promenade Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 02:00 PM",
      dropoffLocation: {
        name: "Elizabeth Scott",
        address: "895 SW Westbury Dr, Bentonville, AR 72712, US"
      },
      price: "$299.99",
      tip: "$30.00",
      fees: "$12.99",
      courier: "Anthony Lee",
      organization: "Williams-Sonoma",
      distance: "9.4 mi"
    },
    {
      id: 24,
      packageId: "SBX-95217834",
      orderName: "Coffee Order",
      status: "In Transit",
      pickupTime: "03/24/2025 09:45 AM",
      pickupLocation: {
        name: "Starbucks - Bentonville Square",
        address: "200 E Central Ave, Bentonville, AR 72712, US"
      },
      dropoffTime: "03/24/2025 10:15 AM",
      dropoffLocation: {
        name: "Crystal Bridges Museum",
        address: "600 Museum Way, Bentonville, AR 72712, US"
      },
      price: "$43.75",
      tip: "$8.00",
      fees: "$2.99",
      courier: "Jason Kim",
      organization: "Starbucks",
      distance: "1.5 mi"
    },
    {
      id: 25,
      packageId: "APL-38217954",
      orderName: "Tech Accessories",
      status: "Dropoff Complete",
      pickupTime: "03/24/2025 11:15 AM",
      pickupLocation: {
        name: "Apple Store - Pinnacle Hills",
        address: "2203 S Promenade Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 12:45 PM",
      dropoffLocation: {
        name: "Matthew Taylor",
        address: "432 SW 14th St, Bentonville, AR 72712, US"
      },
      price: "$158.99",
      tip: "$20.00",
      fees: "$5.99",
      courier: "Rachel Green",
      organization: "Apple Inc.",
      distance: "8.9 mi"
    },
    {
      id: 26,
      packageId: "KHL-45289317",
      orderName: "Department Store Order",
      status: "Courier Selected",
      pickupTime: "03/24/2025 01:45 PM",
      pickupLocation: {
        name: "Kohl's - Rogers",
        address: "4200 W Green Acres Rd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 03:15 PM",
      dropoffLocation: {
        name: "Patricia Walker",
        address: "743 NW Barrington Rd, Bentonville, AR 72712, US"
      },
      price: "$127.95",
      tip: "$15.00",
      fees: "$6.99",
      courier: "Kevin Martinez",
      organization: "Kohl's",
      distance: "7.8 mi"
    },
    {
      id: 27,
      packageId: "BKW-63791482",
      orderName: "Fast Food Delivery",
      status: "Canceled By Customer",
      pickupTime: "03/24/2025 12:15 PM",
      pickupLocation: {
        name: "Burger King - Bentonville",
        address: "1800 S Walton Blvd, Bentonville, AR 72712, US"
      },
      dropoffTime: "03/24/2025 12:45 PM",
      dropoffLocation: {
        name: "Bentonville High School",
        address: "1801 SE J St, Bentonville, AR 72712, US"
      },
      price: "$0.00",
      tip: "$0.00",
      fees: "$0.00",
      courier: "",
      organization: "Burger King",
      distance: "2.1 mi"
    },
    {
      id: 28,
      packageId: "BBS-75391284",
      orderName: "Sports Equipment",
      status: "Waiting For Pay",
      pickupTime: "03/24/2025 02:30 PM",
      pickupLocation: {
        name: "Dick's Sporting Goods - Rogers",
        address: "2203 Promenade Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 04:00 PM",
      dropoffLocation: {
        name: "Andrew Wilson",
        address: "1235 NW Greenville Rd, Bentonville, AR 72712, US"
      },
      price: "$189.95",
      tip: "",
      fees: "$8.99",
      courier: "",
      organization: "Dick's Sporting Goods",
      distance: "8.5 mi"
    },
    {
      id: 29,
      packageId: "OFC-36175249",
      orderName: "Office Supplies",
      status: "Item Not Given",
      pickupTime: "03/24/2025 10:30 AM",
      pickupLocation: {
        name: "Office Depot - Rogers",
        address: "4408 W Walnut St, Rogers, AR 72756, US"
      },
      dropoffTime: "03/24/2025 12:00 PM",
      dropoffLocation: {
        name: "First National Bank - Bentonville",
        address: "406 SW 5th St, Bentonville, AR 72712, US"
      },
      price: "$76.95",
      tip: "$10.00",
      fees: "$4.99",
      courier: "Victoria Chang",
      organization: "Office Depot",
      distance: "6.4 mi"
    },
    {
      id: 30,
      packageId: "PSY-52978143",
      orderName: "Party Supplies",
      status: "Scheduled Order",
      pickupTime: "03/25/2025 10:00 AM",
      pickupLocation: {
        name: "Party City - Rogers",
        address: "4409 W Walnut St, Rogers, AR 72756, US"
      },
      dropoffTime: "03/25/2025 11:30 AM",
      dropoffLocation: {
        name: "Community Center - Bentonville",
        address: "1101 SW Citizens Cir, Bentonville, AR 72712, US"
      },
      price: "$115.95",
      tip: "$20.00",
      fees: "$7.99",
      courier: "",
      organization: "Party City",
      distance: "6.7 mi"
    },
    {
      id: 31,
      packageId: "MOB-89312675",
      orderName: "Furniture Delivery",
      status: "Repeated Order",
      pickupTime: "03/24/2025 08:00 AM",
      pickupLocation: {
        name: "Rooms To Go - Rogers",
        address: "4408 W Walnut St, Rogers, AR 72756, US"
      },
      dropoffTime: "03/24/2025 10:00 AM",
      dropoffLocation: {
        name: "Mark Henderson",
        address: "543 NW Oak Ridge Ave, Bentonville, AR 72712, US"
      },
      price: "$899.99",
      tip: "$50.00",
      fees: "$49.99",
      courier: "",
      organization: "Rooms To Go",
      distance: "7.3 mi"
    },
    {
      id: 32,
      packageId: "QBD-45678912",
      orderName: "Restaurant Order",
      status: "Accepted Repeated Order",
      pickupTime: "03/24/2025 06:30 PM",
      pickupLocation: {
        name: "Taziki's Mediterranean Cafe - Rogers",
        address: "2203 S Promenade Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 07:15 PM",
      dropoffLocation: {
        name: "Stephanie Harris",
        address: "987 SW Paddington Ave, Bentonville, AR 72712, US"
      },
      price: "$52.95",
      tip: "$10.00",
      fees: "$3.99",
      courier: "Christopher Allen",
      organization: "Taziki's Mediterranean Cafe",
      distance: "8.9 mi"
    }
  ];

  // Load any status dictionary from storage if needed
  useEffect(() => {
    const loadStatusDictionary = async () => {
      try {
        const dictionary = await getDictionary("delivery-status");
        setStatusDictionary(dictionary);
      } catch (error) {
        console.error("Error loading status dictionary:", error);
      }
    };
    
    loadStatusDictionary();
  }, []);

  // Add customer name field
  useEffect(() => {
    // Populate the deliveries with needed fields
    const processedDeliveries = deliveries.map(delivery => ({
      ...delivery,
      customerName: delivery.dropoffLocation?.name || 'Unknown'
    }));
    
    setFilteredDeliveries(processedDeliveries);
  }, []);

  return {
    filteredDeliveries,
    setFilteredDeliveries,
    statusDictionary
  };
};
