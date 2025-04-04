import React, { useState, useEffect } from 'react';
import Layout from "@/components/layout/Layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Delivery {
  id: number;
  customerName: string;
  courier: string;
  deliveryDate: string;
  status: string;
}

const Index = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    { id: 1, customerName: "John Doe", courier: "Alice Smith", deliveryDate: "2024-03-15", status: "Pending" },
    { id: 2, customerName: "Jane Smith", courier: "Bob Johnson", deliveryDate: "2024-03-16", status: "Delivered" },
    { id: 3, customerName: "Mike Brown", courier: "Charlie Wilson", deliveryDate: "2024-03-17", status: "In Transit" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddDelivery = () => {
    alert("Add delivery functionality");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Add state to track users with new messages
  const [usersWithMessages, setUsersWithMessages] = useState<{
    customers: string[];
    couriers: string[];
  }>({ customers: [], couriers: [] });

  // Add useEffect to randomly assign message icons
  useEffect(() => {
    const getRandomUsers = (list: string[], count: number) => {
      const shuffled = [...list].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const customerNames = deliveries.map(delivery => delivery.customerName).filter(Boolean);
    const courierNames = deliveries.map(delivery => delivery.courier).filter(Boolean);

    setUsersWithMessages({
      customers: getRandomUsers(customerNames, Math.floor(Math.random() * (customerNames.length / 2))),
      couriers: getRandomUsers(courierNames, Math.floor(Math.random() * (courierNames.length / 2)))
    });
  }, [deliveries]);

  // Helper component for displaying name with potential message icon
  const NameWithMessageIcon = ({ 
    name, 
    type 
  }: { 
    name: string, 
    type: 'customer' | 'courier' 
  }) => {
    const hasMessage = type === 'customer' 
      ? usersWithMessages.customers.includes(name)
      : usersWithMessages.couriers.includes(name);

    return (
      <div className="flex items-center gap-1">
        {name}
        {hasMessage && (
          <MessageCircle 
            className="text-blue-500 fill-blue-100" 
            size={14} 
            strokeWidth={2}
          />
        )}
      </div>
    );
  };

  // Modify table rendering to use new component
  return (
    <Layout showFooter={false}>
      <div className="container py-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Deliveries</h1>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Search deliveries..."
              value={searchQuery}
              onChange={handleSearch}
              className="md:w-64"
            />
            <Button onClick={handleAddDelivery}>
              <Plus className="w-4 h-4 mr-2" />
              Add Delivery
            </Button>
          </div>
        </div>
        <ScrollArea>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Courier</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  {/* Update customer name rendering */}
                  <TableCell>
                    <NameWithMessageIcon 
                      name={delivery.customerName} 
                      type="customer" 
                    />
                  </TableCell>
                  {/* Update courier name rendering */}
                  <TableCell>
                    <NameWithMessageIcon 
                      name={delivery.courier} 
                      type="courier" 
                    />
                  </TableCell>
                  <TableCell>{delivery.deliveryDate}</TableCell>
                  <TableCell>{delivery.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </Layout>
  );
};

export default Index;
