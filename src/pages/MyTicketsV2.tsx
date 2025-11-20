import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ticket, Download, FileText, RefreshCw, Calendar, MapPin, Clock } from "lucide-react";
import { getPurchases } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";

const MyTicketsV2 = () => {
  const navigate = useNavigate();
  const purchases = getPurchases();

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

  const currentPurchase = purchases[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Event Banner */}
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img
              src={currentPurchase.eventImage}
              alt={currentPurchase.eventName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Event Details */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {currentPurchase.eventName}
                </h1>
                <Badge>Your Tickets</Badge>
              </div>
            </div>

            <div className="space-y-3 text-foreground mb-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium">
                  {new Date(currentPurchase.eventDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium">{currentPurchase.eventTime}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium">{currentPurchase.eventVenue}</span>
              </div>
            </div>
          </div>

          {/* Tickets Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Your Tickets ({currentPurchase.tickets.length})
            </h2>
            
            <div className="space-y-4">
              {currentPurchase.tickets.map((ticket, index) => (
                <Card key={ticket.id} className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* QR Code Section */}
                    <div className="flex-shrink-0">
                      <div className="w-48 h-48 bg-white p-4 rounded-lg shadow-sm mx-auto md:mx-0">
                        <img
                          src={ticket.qrCode}
                          alt={`Ticket ${index + 1} QR Code`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground text-center mt-3">
                        {ticket.ticketTypeName} • Ticket {index + 1}
                      </p>
                    </div>

                    {/* Ticket Info & Actions */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {ticket.ticketTypeName}
                        </h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p><span className="font-medium">Name:</span> {currentPurchase.buyerName}</p>
                          <p><span className="font-medium">Email:</span> {currentPurchase.buyerEmail}</p>
                          <p><span className="font-medium">Ticket ID:</span> {ticket.id}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                        <Button variant="outline" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          View Receipt
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" className="w-full">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Request Refund
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Organizer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Have questions about your tickets or the event? Contact the organizer.
              </p>
              <Button variant="ghost" className="text-primary">
                Contact the organizer
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MyTicketsV2;
