
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail } from "lucide-react";

interface EmailRecord {
  id: number;
  subject: string;
  body: string;
  date: string;
}

interface EmailsSentListProps {
  driverName: string;
}

export const EmailsSentList = ({ driverName }: EmailsSentListProps) => {
  // Sample email data - in a real app this would come from the API
  const emailsSent: EmailRecord[] = [
    {
      id: 1,
      subject: "Welcome to our delivery platform",
      body: "Hi " + driverName + ", welcome to our platform! We're excited to have you join our team of professional drivers. Please complete your profile setup and upload the required documents.",
      date: "2024-01-15"
    },
    {
      id: 2,
      subject: "Document verification required",
      body: "Hello " + driverName + ", we noticed that some of your documents need verification. Please upload clear photos of your driver's license and vehicle registration.",
      date: "2024-01-12"
    },
    {
      id: 3,
      subject: "Payment setup reminder",
      body: "Hi " + driverName + ", don't forget to set up your payment information in your profile. This will ensure you receive your earnings on time.",
      date: "2024-01-10"
    },
    {
      id: 4,
      subject: "New delivery opportunities",
      body: "Hello " + driverName + ", there are new delivery opportunities available in your area. Log in to your dashboard to view and accept deliveries.",
      date: "2024-01-08"
    }
  ];

  if (emailsSent.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8 text-muted-foreground">
            <Mail className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No emails sent to this driver</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {emailsSent.map((email) => (
        <Card key={email.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">
                {email.subject}
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                {email.date}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-sm text-muted-foreground leading-relaxed">
              {email.body}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
