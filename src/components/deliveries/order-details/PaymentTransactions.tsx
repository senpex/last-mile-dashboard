
import React from 'react';

interface PaymentTransactionsProps {
  price: string;
  tip: string;
}

export const PaymentTransactions = ({ price, tip }: PaymentTransactionsProps) => {
  return (
    <div className="rounded-md border bg-card/50 p-4">
      <div className="space-y-2">
        <div className="border-b pb-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Payment received</span>
            <span className="text-sm text-green-600">${price}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">Credit Card</span>
            <span className="text-xs text-muted-foreground">Today, 10:45 AM</span>
          </div>
        </div>
        <div className="border-b pb-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Tip added</span>
            <span className="text-sm text-green-600">${tip}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">Credit Card</span>
            <span className="text-xs text-muted-foreground">Today, 10:50 AM</span>
          </div>
        </div>
        <div className="border-b pb-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Courier payed</span>
            <span className="text-sm text-red-600">-$12.50</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">Direct Transfer</span>
            <span className="text-xs text-muted-foreground">Today, 11:15 AM</span>
          </div>
        </div>
        <div className="border-b pb-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Refunded</span>
            <span className="text-sm text-red-600">-$8.75</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">Credit Card</span>
            <span className="text-xs text-muted-foreground">Today, 12:30 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
