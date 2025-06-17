
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Driver } from "@/types";
import { ChevronDown } from "lucide-react";

interface DriverDetailsSheetProps {
  driver: Driver;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DriverDetailsSheet({ driver, open, onOpenChange }: DriverDetailsSheetProps) {
  const [expandedPayouts, setExpandedPayouts] = useState<number[]>([]);

  const togglePayout = (payoutId: number) => {
    setExpandedPayouts(prev => 
      prev.includes(payoutId) 
        ? prev.filter(id => id !== payoutId)
        : [...prev, payoutId]
    );
  };

  // Mock payout data
  const payouts = [
    {
      id: 4,
      date: "2024-01-22",
      amount: 385.75,
      status: "upcoming",
      transactions: [
        { orderNumber: "ORD-2024-015", date: "2024-01-20", earning: 95.00, commission: 14.25, tip: 18.00 },
        { orderNumber: "ORD-2024-016", date: "2024-01-21", earning: 110.00, commission: 16.50, tip: 12.50 },
        { orderNumber: "ORD-2024-017", date: "2024-01-21", earning: 85.50, commission: 12.83, tip: 20.00 },
        { orderNumber: "ORD-2024-018", date: "2024-01-22", earning: 75.00, commission: 11.25, tip: 10.42 }
      ]
    },
    {
      id: 1,
      date: "2024-01-15",
      amount: 425.50,
      status: "paid",
      transactions: [
        { orderNumber: "ORD-2024-001", date: "2024-01-14", earning: 85.00, commission: 12.75, tip: 15.00 },
        { orderNumber: "ORD-2024-002", date: "2024-01-14", earning: 120.00, commission: 18.00, tip: 25.00 },
        { orderNumber: "ORD-2024-003", date: "2024-01-15", earning: 95.50, commission: 14.33, tip: 18.50 },
        { orderNumber: "ORD-2024-004", date: "2024-01-15", earning: 80.00, commission: 12.00, tip: 9.42 }
      ]
    },
    {
      id: 2,
      date: "2024-01-08",
      amount: 390.20,
      status: "paid",
      transactions: [
        { orderNumber: "ORD-2024-005", date: "2024-01-07", earning: 90.00, commission: 13.50, tip: 16.00 },
        { orderNumber: "ORD-2024-006", date: "2024-01-07", earning: 115.00, commission: 17.25, tip: 11.50 },
        { orderNumber: "ORD-2024-007", date: "2024-01-08", earning: 80.50, commission: 12.08, tip: 19.00 },
        { orderNumber: "ORD-2024-008", date: "2024-01-08", earning: 104.70, commission: 15.71, tip: 14.79 }
      ]
    },
    {
      id: 3,
      date: "2024-01-01",
      amount: 410.00,
      status: "paid",
      transactions: [
        { orderNumber: "ORD-2024-009", date: "2023-12-31", earning: 100.00, commission: 15.00, tip: 20.00 },
        { orderNumber: "ORD-2024-010", date: "2023-12-31", earning: 110.00, commission: 16.50, tip: 12.50 },
        { orderNumber: "ORD-2024-011", date: "2024-01-01", earning: 90.00, commission: 13.50, tip: 10.00 },
        { orderNumber: "ORD-2024-012", date: "2024-01-01", earning: 110.00, commission: 16.50, tip: 11.00 }
      ]
    },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="pr-0">
        <SheetHeader>
          <SheetTitle>Driver Details</SheetTitle>
          <SheetDescription>
            View all the information about this driver.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <Input
              id="name"
              value={driver.name}
              className="col-span-3"
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="phone" className="text-right">
              Phone
            </label>
            <Input
              id="phone"
              value={driver.phone}
              className="col-span-3"
              readOnly
            />
          </div>
        </div>
        <div className="rounded-md border">
          {payouts.map((payout) => (
            <div key={payout.id} className="border-b last:border-none">
              <Button variant="ghost" className="flex w-full justify-between p-4 data-[state=open]:bg-secondary data-[state=open]:text-foreground" onClick={() => togglePayout(payout.id)}>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={payout.status === "upcoming" ? "warning" : "success"} 
                    className="text-xs"
                  >
                    {payout.status === "upcoming" ? "Upcoming" : "Paid"}
                  </Badge>
                  <span className="font-semibold text-lg">
                    ${payout.amount.toFixed(2)}
                  </span>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${
                      expandedPayouts.includes(payout.id) ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </Button>
              {expandedPayouts.includes(payout.id) && (
                <div className="px-4 pb-4">
                  <div className="space-y-2">
                    {payout.transactions.map((transaction, index) => (
                      <div key={index} className="grid grid-cols-5 gap-2 text-sm">
                        <span className="font-medium">{transaction.orderNumber}</span>
                        <span>{transaction.date}</span>
                        <span>${transaction.earning.toFixed(2)}</span>
                        <span>${transaction.commission.toFixed(2)}</span>
                        <span>${transaction.tip.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
