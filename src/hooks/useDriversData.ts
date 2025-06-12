
import { useState, useEffect } from 'react';
import { generateRandomDrivers, StripeStatus } from '@/data/driversDataGenerator';

export const useDriversData = () => {
  const [drivers, setDrivers] = useState([
    {
      id: 5432,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(123) 456-7890",
      status: "online",
      hireStatus: "hired",
      transports: ["1", "3", "pickup_truck", "9ft_cargo_van"],
      rating: 4.8,
      stripeStatus: 'verified' as StripeStatus,
      zipcode: "94105",
      address: "123 Main St, San Francisco, CA",
      notes: "Excellent driver, always on time.",
      profileTypes: ["Driver", "Mover"]
    },
    {
      id: 6543,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "(123) 456-7891",
      status: "offline",
      hireStatus: "contact_again",
      transports: ["2"],
      rating: 3.5,
      stripeStatus: 'unverified' as StripeStatus,
      zipcode: "90210",
      address: "456 Oak Ave, Beverly Hills, CA",
      notes: "Prefers weekend shifts.",
      profileTypes: ["Helper"]
    },
    {
      id: 7654,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "(123) 456-7892",
      status: "busy",
      hireStatus: "blacklist",
      transports: ["4", "5"],
      rating: 5.0,
      stripeStatus: 'pending' as StripeStatus,
      zipcode: "10001",
      address: "789 Pine Rd, New York, NY",
      notes: "Not available on Mondays."
    }
  ]);

  useEffect(() => {
    setDrivers(prevDrivers => {
      const highestId = Math.max(...prevDrivers.map(d => d.id));
      const newDrivers = generateRandomDrivers(50, highestId + 1);
      return [...prevDrivers, ...newDrivers];
    });
  }, []);

  const updateDriverHireStatus = (driverId: number, newHireStatus: string) => {
    setDrivers(prevDrivers => 
      prevDrivers.map(driver => 
        driver.id === driverId 
          ? { ...driver, hireStatus: newHireStatus }
          : driver
      )
    );
  };

  const updateDriverNotes = (driverId: number, notes: string) => {
    setDrivers(prevDrivers => 
      prevDrivers.map(driver => 
        driver.id === driverId 
          ? { ...driver, notes }
          : driver
      )
    );
  };

  return {
    drivers,
    setDrivers,
    updateDriverHireStatus,
    updateDriverNotes
  };
};
