
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface WebhookEntry {
  id: number;
  status: 'success' | 'failed' | 'pending';
  date: string;
  payload: string;
  responseCode: number;
  response: string;
}

const beautifyJson = (jsonString: string): string => {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return jsonString;
  }
};

const mockWebhookData: WebhookEntry[] = [
  {
    id: 1,
    status: 'success',
    date: '2024-06-05 14:30:25',
    payload: '{"data": [{"id": "730616", "routes": [{"id": "442764", "rec_name": "Jane Doe", "rec_phone": " 16507883883", "remote_id": null, "route_desc": "dropoff Instructions", "route_sign": null, "route_status": "35", "route_to_lat": "28.9671605000000000000000", "route_to_lng": "-80.9125194000000000000000", "route_to_text": "1819 Sabal Palm Dr, Edgewater, FL 32132", "pack_status_uq": "350", "route_distance": "1.29", "route_work_type": "0", "route_delivery_date": null, "route_distance_time": "225.50"}], "history": [{"route_id": "-1", "remote_id": null, "pack_status": "10", "operation_date": "2025-04-23 09:45:42", "operation_name": "Paid order", "pack_status_uq": "10"}, {"route_id": "-1", "remote_id": null, "pack_status": "20", "operation_date": "2025-04-23 09:46:57", "operation_name": "Courier selected", "pack_status_uq": "20"}, {"route_id": "-1", "remote_id": null, "pack_status": "25", "operation_date": "2025-04-23 09:46:59", "operation_name": "Arrived for pickup", "pack_status_uq": "25"}, {"route_id": "-1", "remote_id": null, "pack_status": "30", "operation_date": "2025-04-23 09:47:02", "operation_name": "In transit", "pack_status_uq": "30"}, {"route_id": "442764", "remote_id": null, "pack_status": "35", "operation_date": "2025-04-23 09:47:05", "operation_name": "Arrived to drop-off location", "pack_status_uq": "350"}], "snpx_sms": "0", "secret_id": "505B9D7E-977A-4C75-8E64-11FC0C9B6C322025042205170", "snpx_nots": "0", "item_value": "1000.00", "order_name": "Test Order RESTFUL CAnada", "pack_price": "27.00", "taken_asap": "0", "tip_amount": "44.00", "pack_status": "30", "route_count": "1", "sender_cell": "2313213213", "sender_name": "Hasan", "snpx_emails": "1", "courier_cell": "0000000000", "courier_name": "Default", "order_images": [], "pack_map_img": null, "pack_size_id": "1", "sender_email": "test@senpex.com", "pack_from_lat": "28.9614430000000000000000", "pack_from_lng": "-80.8992458000000000000000", "rest_api_vers": "4", "schedule_date": "2025-04-26 02:00:00", "status_sender": "In transit", "distance_miles": "1.29", "pack_from_text": "2220 Hibiscus Dr. Suite 7 Edgewater, FL 32141", "pack_work_type": "0", "sender_surname": "Eyvazoff", "sender_user_id": "5650", "courier_surname": "Driver", "instant_not_url": "https://mdev.topscripts.in/chad/shippingData.php", "remote_order_id": null, "company_metadata": null, "conn_client_name": "REST API", "courier_self_img": null, "last_pack_to_lat": "28.9671605000000000000000", "last_pack_to_lng": "-80.9125194000000000000000", "snpx_instant_not": "0", "last_pack_to_text": "1819 Sabal Palm Dr, Edgewater, FL 32132", "order_status_text": "In transit", "pack_transport_id": "1", "total_charge_price": "101.00", "pack_mailing_status": "1", "schedule_date_local": "2025-04-25 22:00:00", "distance_time_seconds": "225.50"}], "info": "{\\"courier_rate\\":\\"0.00\\"}", "event_id": "35", "order_id": "730616", "secret_id": "505B9D7E-977A-4C75-8E64-11FC0C9B6C322025042205170", "request_type": "test"}',
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
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="max-w-[300px] truncate text-sm font-mono bg-muted p-2 rounded cursor-pointer hover:bg-muted/80 transition-colors">
                        {webhook.payload}
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-[600px] max-h-96 overflow-auto">
                      <div className="text-xs font-mono whitespace-pre-wrap break-words">
                        {beautifyJson(webhook.payload)}
                      </div>
                    </HoverCardContent>
                  </HoverCard>
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
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="max-w-[300px] truncate text-sm font-mono bg-muted p-2 rounded cursor-pointer hover:bg-muted/80 transition-colors">
                        {webhook.response}
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-96 max-h-64 overflow-auto">
                      <div className="text-sm font-mono whitespace-pre-wrap break-words">
                        {beautifyJson(webhook.response)}
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};
