import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ticket, Share2 } from "lucide-react";
import { getPurchases } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const MyTickets = () => {
  const navigate = useNavigate();
  const purchases = getPurchases();

  const handleShare = (publicId: string) => {
    const shareUrl = `${window.location.origin}/ticket/${publicId}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied!",
      description: "Ticket link has been copied to clipboard.",
    });
  };

  if (purchases.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="rounded-full bg-muted w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Ticket className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No tickets yet</h2>
            <p className="text-muted-foreground mb-6">
              Start exploring events and book your first ticket!
            </p>
            <Button onClick={() => navigate('/')}>Browse Events</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Tickets</h1>

          <div className="space-y-6">
            {purchases.map((purchase) => (
              <Card key={purchase.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{purchase.eventName}</CardTitle>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>
                            {new Date(purchase.eventDate).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })} • {purchase.eventTime}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{purchase.eventVenue}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-2">
                        {purchase.tickets.length} Ticket{purchase.tickets.length > 1 ? 's' : ''}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        Order: {purchase.id}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {purchase.tickets.map((ticket, index) => (
                      <div
                        key={ticket.id}
                        className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                        onClick={() => navigate(`/ticket/${ticket.publicId}`)}
                      >
                        <div className="flex justify-center mb-3 bg-white p-2 rounded">
                          <img
                            src={ticket.qrCode}
                            alt={`Ticket ${index + 1}`}
                            className="w-32 h-32"
                          />
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-sm mb-1">{ticket.ticketTypeName}</div>
                          <div className="text-xs text-muted-foreground mb-2">
                            Ticket #{index + 1}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(ticket.publicId);
                            }}
                          >
                            <Share2 className="h-3 w-3 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyTickets;
