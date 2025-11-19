import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { savePurchase, Purchase, PurchasedTicket } from "@/lib/mockData";
import { Loader2 } from "lucide-react";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, selectedTickets, totalPrice, attendeesData } = location.state || {};

  const [isProcessing, setIsProcessing] = useState(false);
  const [buyerInfo, setBuyerInfo] = useState({
    name: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || '',
    phone: '',
    notes: ''
  });

  if (!event || !selectedTickets) {
    navigate('/');
    return null;
  }

  const handleInputChange = (field: string, value: string) => {
    setBuyerInfo(prev => ({ ...prev, [field]: value }));
  };

  const generateTickets = (): PurchasedTicket[] => {
    const tickets: PurchasedTicket[] = [];
    let attendeeIndex = 0;
    
    selectedTickets.forEach((ticketType: any) => {
      for (let i = 0; i < ticketType.quantity; i++) {
        const ticketId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const publicId = `${event.id}-${ticketId}`;
        const attendee = attendeesData[attendeeIndex];
        
        tickets.push({
          id: ticketId,
          ticketTypeId: ticketType.id,
          ticketTypeName: ticketType.name,
          price: ticketType.price,
          qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(publicId)}`,
          publicId: publicId,
          attendeeName: attendee.name,
          attendeeEmail: attendee.email,
          attendeePhone: attendee.phone,
          foodPreference: attendee.foodPreference,
          accommodation: attendee.accommodation,
          specialRequests: attendee.specialRequests,
        });
        
        attendeeIndex++;
      }
    });

    return tickets;
  };

  const handleCheckout = async () => {
    if (!buyerInfo.name || !buyerInfo.email || !buyerInfo.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const tickets = generateTickets();
    
    const purchase: Purchase = {
      id: `ORD-${Date.now()}`,
      eventId: event.id,
      eventName: event.name,
      eventDate: event.date,
      eventTime: event.time,
      eventVenue: event.venue,
      eventImage: event.image,
      buyerName: buyerInfo.name,
      buyerEmail: buyerInfo.email,
      buyerPhone: buyerInfo.phone,
      notes: buyerInfo.notes,
      tickets: tickets,
      totalAmount: totalPrice,
      purchaseDate: new Date().toISOString(),
      isGuest: !localStorage.getItem('userEmail')
    };

    savePurchase(purchase);

    toast({
      title: "Payment successful!",
      description: "Your tickets have been confirmed.",
    });

    navigate('/purchase-success', { state: { purchase } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Buyer Information</CardTitle>
                  <CardDescription>Please provide your contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={buyerInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={buyerInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={buyerInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={buyerInfo.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Any special requests or information..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">{event.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })} • {event.time}
                    </p>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    {selectedTickets.map((ticket: any) => (
                      <div key={ticket.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {ticket.name} × {ticket.quantity}
                        </span>
                        <span className="font-medium">
                          ${(ticket.price * ticket.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleCheckout}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Complete Purchase'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
