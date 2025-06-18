
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableContainer } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface EmailData {
  id: string;
  email: string;
  subject: string;
  body: string;
  sent: boolean;
  insertedDate: string;
  type: string;
  scheduledDate: string;
  sentDate: string;
}

interface EmailsSentTableProps {
  emails?: EmailData[];
}

const mockEmailData: EmailData[] = [
  {
    id: "1",
    email: "reignof.fire44@gmail.com",
    subject: "SENPEX Courier Registration",
    body: "Dear Wayne Whaley, Welcome to Senpex! Our dispatch team will be verifying the information you have provided and will invite you for an interview shortly. Please, click on the below link to confirm your email address: https://web.senpex.com/u/appzone-account/26592324-39FE-469B-B99C-38EC4397AE18#20250617002607?c=us Before your interview, you should review this short tutorial on how the Senpex courier process works on the mobile app: https://www.youtube.com/watch?v=MzlebSbpl44 Now that you are registered as a courier, please enable Location settings on your cell phone under \"Notifications\" and set it to \"Always\". This is imperative to ensure that you will be notified of any future orders. It is only to your benefit to keep this on at all times. To get more information about Senpex, visit our website at: https://www.senpex.com If you have any questions or need help, please contact us anytime (669) 777-5733. Thank you, The Senpex Team",
    sent: true,
    insertedDate: "06/16/2025 17:26",
    type: "Email",
    scheduledDate: "",
    sentDate: "06/16/2025 17:26"
  }
];

export const EmailsSentTable = ({ emails = mockEmailData }: EmailsSentTableProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Checkbox id="sending-mails" defaultChecked />
        <label htmlFor="sending-mails" className="text-sm font-medium">
          Sending mails
        </label>
      </div>

      <TableContainer independent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Email</TableHead>
              <TableHead className="w-[150px]">Subject</TableHead>
              <TableHead className="flex-1">Body</TableHead>
              <TableHead className="w-[80px]">Sent</TableHead>
              <TableHead className="w-[120px]">Inserted date</TableHead>
              <TableHead className="w-[80px]">Type</TableHead>
              <TableHead className="w-[120px]">Scheduled date</TableHead>
              <TableHead className="w-[120px]">Sent date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emails.map((email) => (
              <TableRow key={email.id}>
                <TableCell className="font-medium">{email.email}</TableCell>
                <TableCell>{email.subject}</TableCell>
                <TableCell className="max-w-[300px]">
                  <div className="truncate" title={email.body}>
                    {email.body}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={email.sent ? "default" : "secondary"}>
                    {email.sent ? "Sent" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell>{email.insertedDate}</TableCell>
                <TableCell>
                  <Badge variant="outline">{email.type}</Badge>
                </TableCell>
                <TableCell>{email.scheduledDate || "-"}</TableCell>
                <TableCell>{email.sentDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {emails.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No emails sent yet
        </div>
      )}
    </div>
  );
};
