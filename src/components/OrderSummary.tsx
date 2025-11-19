import { Card } from "@/components/ui/card";

interface OrderSummaryProps {
  orderId: string;
  orderDate: string;
  totalAmount: string;
}

export const OrderSummary = ({ orderId, orderDate, totalAmount }: OrderSummaryProps) => {
  return (
    <Card className="p-4 bg-muted/30">
      <div className="flex items-center justify-between text-sm">
        <div>
          <span className="text-muted-foreground">Order {orderId} on </span>
          <span className="text-muted-foreground">{orderDate}</span>
          <span className="font-semibold text-foreground ml-2">• {totalAmount}</span>
        </div>
        <button className="text-primary hover:underline text-xs">
          Report this event
        </button>
      </div>
    </Card>
  );
};
