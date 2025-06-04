
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const ItemsSection = () => {
  const items = [
    {
      name: "Grilled Chicken Sandwich",
      quantity: 2,
      price: "$12.99",
      specialInstructions: "No mayo, extra pickles"
    },
    {
      name: "Caesar Salad",
      quantity: 1,
      price: "$8.50",
      specialInstructions: "Dressing on the side"
    },
    {
      name: "French Fries",
      quantity: 2,
      price: "$4.99",
      specialInstructions: ""
    },
    {
      name: "Coca Cola",
      quantity: 3,
      price: "$2.99",
      specialInstructions: "No ice"
    }
  ];

  return (
    <div className="rounded-md border bg-card/50 p-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Item Name</TableHead>
              <TableHead className="w-[80px]">Qty</TableHead>
              <TableHead className="w-[100px]">Price</TableHead>
              <TableHead>Special Instructions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-sm">{item.name}</TableCell>
                <TableCell className="text-sm">{item.quantity}</TableCell>
                <TableCell className="text-sm">{item.price}</TableCell>
                <TableCell className="text-sm">{item.specialInstructions || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
