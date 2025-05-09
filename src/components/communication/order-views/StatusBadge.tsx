
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: 'active' | 'completed' | 'cancelled' | 'repeated';
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-500">Active</Badge>;
    case 'completed':
      return <Badge className="bg-blue-500">Completed</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-500">Cancelled</Badge>;
    case 'repeated':
      return <Badge variant="secondary" className="text-[10px] px-2 py-0.5">Repeated Order</Badge>;
  }
};
