import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  deliveryMethod: string;
  ticketQuantity: number;
  ticketType: string;
}

export const ContactInfo = ({
  firstName,
  lastName,
  email,
  deliveryMethod,
  ticketQuantity,
  ticketType,
}: ContactInfoProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-6">
        <h3 className="text-xl font-semibold">
          ({ticketQuantity}x) {ticketType}
        </h3>
        <Button variant="ghost" size="sm" className="text-primary">
          <Pencil className="h-4 w-4 mr-1" />
          Edit
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-3">Contact Information</h4>
          <div className="space-y-2">
            <div>
              <label className="text-xs text-muted-foreground">First Name</label>
              <p className="text-sm font-medium text-foreground">{firstName}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Last Name</label>
              <p className="text-sm font-medium text-foreground">{lastName}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Email</label>
              <p className="text-sm font-medium text-foreground">{email}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Delivery Method</label>
              <p className="text-sm font-medium text-foreground">{deliveryMethod}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
