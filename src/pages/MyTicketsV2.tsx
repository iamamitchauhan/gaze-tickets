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
      
      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src={currentPurchase.eventImage}
                alt={currentPurchase.eventName}
                className="w-full h-full object-cover"
              />
            </div>

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

              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-lg">Order Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Order ID:</span>
                    <span className="font-medium">{currentPurchase.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Purchase Date:</span>
                    <span className="font-medium">
                      {new Date(currentPurchase.purchaseDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Amount:</span>
                    <span className="font-semibold text-foreground">
                      ${currentPurchase.totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <button className="text-primary hover:underline text-sm">
                      Report this event
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
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
          </div>

          {/* Tickets Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Your Tickets ({currentPurchase.tickets.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentPurchase.tickets.map((ticket, index) => (
                  <Card key={ticket.id} className="p-4 bg-muted/30">
                    {/* QR Code */}
                    <div className="w-full mb-4">
                      <div className="w-full aspect-square bg-white p-3 rounded-lg shadow-sm">
                        <img
                          src={ticket.qrCode}
                          alt={`Ticket ${index + 1} QR Code`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Ticket Info */}
                    <div className="space-y-2 mb-4">
                      <h3 className="font-semibold text-foreground">
                        {ticket.ticketTypeName}
                      </h3>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p><span className="font-medium">Name:</span> {currentPurchase.buyerName}</p>
                        <p><span className="font-medium">Email:</span> {currentPurchase.buyerEmail}</p>
                        <p><span className="font-medium">ID:</span> {ticket.id}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full" size="sm">
                        <FileText className="h-3 w-3 mr-2" />
                        View Receipt
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <Download className="h-3 w-3 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <RefreshCw className="h-3 w-3 mr-2" />
                        Request Refund
                      </Button>
                    </div>

                    {index < currentPurchase.tickets.length - 1 && (
                      <div className="mt-4 pt-4 border-t border-border" />
                    )}
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyTicketsV2;
