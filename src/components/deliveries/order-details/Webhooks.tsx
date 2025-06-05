
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface WebhookEntry {
  id: number;
  status: 'success' | 'failed' | 'pending';
  date: string;
  payload: string;
  responseCode: number;
  response: string;
}

const mockWebhookData: WebhookEntry[] = [
  {
    id: 1,
    status: 'success',
    date: '2024-06-05 14:30:25',
    payload: '{"orderId": "5K1-6U4", "status": "in_transit", "driver": "Michael Torres"}',
    responseCode: 200,
    response: '{"success": true, "message": "Webhook received successfully"}'
  },
  {
    id: 2,
    status: 'failed',
    date: '2024-06-05 14:25:12',
    payload: '{"orderId": "5K1-6U4", "status": "picked_up", "driver": "Michael Torres"}',
    responseCode: 404,
    response: '{"error": "Endpoint not found"}'
  },
  {
    id: 3,
    status: 'success',
    date: '2024-06-05 14:20:08',
    payload: '{"orderId": "5K1-6U4", "status": "assigned", "driver": "Michael Torres"}',
    responseCode: 200,
    response: '{"success": true, "timestamp": "2024-06-05T14:20:08Z"}'
  },
  {
    id: 4,
    status: 'pending',
    date: '2024-06-05 14:15:45',
    payload: '{"orderId": "5K1-6U4", "status": "created", "customer": "Jane Smith"}',
    responseCode: 0,
    response: 'Awaiting response...'
  }
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'success':
      return 'default';
    case 'failed':
      return 'destructive';
    case 'pending':
      return 'secondary';
    default:
      return 'outline';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'bg-green-100 text-green-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const Webhooks = () => {
  return (
    <div className="rounded-md border bg-card/50">
      <ScrollArea className="h-[400px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[150px]">Date</TableHead>
              <TableHead className="min-w-[200px]">Payload</TableHead>
              <TableHead className="w-[120px]">Response Code</TableHead>
              <TableHead className="min-w-[200px]">Response</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockWebhookData.map((webhook) => (
              <TableRow key={webhook.id}>
                <TableCell>
                  <Badge 
                    variant={getStatusBadgeVariant(webhook.status)}
                    className={getStatusColor(webhook.status)}
                  >
                    {webhook.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {webhook.date}
                </TableCell>
                <TableCell>
                  <div className="max-w-[300px] truncate text-sm font-mono bg-muted p-2 rounded">
                    {webhook.payload}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    webhook.responseCode >= 200 && webhook.responseCode < 300 
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : webhook.responseCode >= 400 
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : 'bg-gray-50 text-gray-700 border-gray-200'
                  }>
                    {webhook.responseCode || 'N/A'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="max-w-[300px] truncate text-sm font-mono bg-muted p-2 rounded">
                    {webhook.response}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};
