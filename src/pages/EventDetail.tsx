import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Info, Minus, Plus, Check } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { mockEvents, TicketType } from "@/lib/mockData";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = mockEvents.find(e => e.id === id);

  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Button onClick={() => navigate('/')}>Back to Events</Button>
        </div>
      </div>
    );
  }

  const updateQuantity = (ticketId: string, delta: number, maxAvailable: number) => {
    setSelectedTickets(prev => {
      const current = prev[ticketId] || 0;
      const newValue = Math.max(0, Math.min(current + delta, maxAvailable));
      const updated = { ...prev };
      if (newValue === 0) {
        delete updated[ticketId];
      } else {
        updated[ticketId] = newValue;
      }
      return updated;
    });
  };

  const totalTickets = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = event.ticketTypes.reduce((sum, ticket) => {
    const qty = selectedTickets[ticket.id] || 0;
    return sum + (ticket.price * qty);
  }, 0);

  const handleContinue = () => {
    if (totalTickets === 0) {
      toast({
        title: "No tickets selected",
        description: "Please select at least one ticket to continue.",
        variant: "destructive",
      });
      return;
    }

    const selectedTicketData = event.ticketTypes
      .filter(ticket => selectedTickets[ticket.id] > 0)
      .map(ticket => ({
        ...ticket,
        quantity: selectedTickets[ticket.id]
      }));

    navigate('/checkout', {
      state: {
        event,
        selectedTickets: selectedTicketData,
        totalPrice
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{event.name}</h1>
                  <Badge>{event.category}</Badge>
                </div>
              </div>

              <div className="space-y-3 text-foreground mb-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-primary" />
                  <span className="font-medium">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-primary" />
                  <span className="font-medium">{event.time}</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">{event.venue}</div>
                    <div className="text-sm text-muted-foreground">{event.venueAddress}</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">About This Event</h2>
                <p className="text-muted-foreground leading-relaxed">{event.longDescription}</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Select Tickets</h2>
              <div className="space-y-4">
                {event.ticketTypes.map((ticket) => (
                  <Card key={ticket.id} className={ticket.available === 0 ? "opacity-60" : ""}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="flex items-center gap-2">
                            {ticket.name}
                            {ticket.available === 0 && (
                              <Badge variant="destructive">Sold Out</Badge>
                            )}
                            {ticket.available > 0 && ticket.available <= 20 && (
                              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                                {ticket.available} left
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription>{ticket.description}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            ${ticket.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {ticket.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            <Check className="h-3 w-3 mr-1" />
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {ticket.available > 0 ? `${ticket.available} available` : 'Not available'}
                      </span>
                      {ticket.available > 0 && (
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(ticket.id, -1, ticket.available)}
                            disabled={!selectedTickets[ticket.id]}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {selectedTickets[ticket.id] || 0}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(ticket.id, 1, ticket.available)}
                            disabled={(selectedTickets[ticket.id] || 0) >= ticket.available}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {totalTickets === 0 ? (
                  <p className="text-sm text-muted-foreground">No tickets selected</p>
                ) : (
                  <>
                    {event.ticketTypes
                      .filter(ticket => selectedTickets[ticket.id] > 0)
                      .map(ticket => (
                        <div key={ticket.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {ticket.name} × {selectedTickets[ticket.id]}
                          </span>
                          <span className="font-medium">
                            ${(ticket.price * selectedTickets[ticket.id]).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total</span>
                        <span className="text-2xl font-bold text-primary">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleContinue}
                  disabled={totalTickets === 0}
                >
                  Continue to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetail;
