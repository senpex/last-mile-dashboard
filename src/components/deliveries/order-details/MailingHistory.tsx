
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const MailingHistory = () => {
  const packageRecipients = [
    {
      name: "Marcos",
      surname: "Amorim",
      rate: "1.50",
      idCard: "SA7491975",
      sentDistance: "20",
      userId: "175240",
      isAdmin: "Yes",
      assignType: "Mailing",
      role: "Driver"
    },
    {
      name: "Derek",
      surname: "LaMarca",
      rate: "1.50",
      idCard: "NHL17456960",
      sentDistance: "20",
      userId: "261035",
      isAdmin: "Yes",
      assignType: "Mailing",
      role: "Driver"
    },
    {
      name: "Jose",
      surname: "Florentino",
      rate: "1.50",
      idCard: "SA1130334",
      sentDistance: "20",
      userId: "303001",
      isAdmin: "Yes",
      assignType: "Mailing",
      role: "Driver"
    },
    {
      name: "Albert Antonio",
      surname: "Duran Ventura",
      rate: "1.00",
      idCard: "NHL18389876",
      sentDistance: "20",
      userId: "94494",
      isAdmin: "Yes",
      assignType: "Mailing",
      role: "Driver"
    },
    {
      name: "Alexis",
      surname: "Corona",
      rate: "1.00",
      idCard: "NHL15348855",
      sentDistance: "20",
      userId: "160841",
      isAdmin: "Yes",
      assignType: "Mailing",
      role: "Driver"
    },
    {
      name: "Albaro",
      surname: "Garcia",
      rate: "1.00",
      idCard: "NHL19720616",
      sentDistance: "20",
      userId: "217288",
      isAdmin: "Yes",
      assignType: "Mailing",
      role: "Driver"
    },
    {
      name: "Juliana",
      surname: "Correa",
      rate: "1.00",
      idCard: "C600423838320",
      sentDistance: "20",
      userId: "321525",
      isAdmin: "Yes",
      assignType: "Mailing",
      role: "Driver"
    }
  ];

  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Package sent to:</h3>
      <div className="rounded-md border bg-card/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs font-semibold">Courier name</TableHead>
              <TableHead className="text-xs font-semibold">Rate</TableHead>
              <TableHead className="text-xs font-semibold">ID CARD</TableHead>
              <TableHead className="text-xs font-semibold">Sent distance</TableHead>
              <TableHead className="text-xs font-semibold">User ID</TableHead>
              <TableHead className="text-xs font-semibold">Is admin</TableHead>
              <TableHead className="text-xs font-semibold">Assign type</TableHead>
              <TableHead className="text-xs font-semibold">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packageRecipients.map((recipient, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell className="text-sm">{`${recipient.name} ${recipient.surname}`}</TableCell>
                <TableCell className="text-sm">{recipient.rate}</TableCell>
                <TableCell className="text-sm font-mono">{recipient.idCard}</TableCell>
                <TableCell className="text-sm">{recipient.sentDistance}</TableCell>
                <TableCell className="text-sm">{recipient.userId}</TableCell>
                <TableCell className="text-sm">
                  <Badge variant={recipient.isAdmin === "Yes" ? "success" : "secondary"} className="text-xs">
                    {recipient.isAdmin}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{recipient.assignType}</TableCell>
                <TableCell className="text-sm">
                  <Badge variant="outline" className="text-xs">
                    {recipient.role}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
