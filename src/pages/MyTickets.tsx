import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ticket, Download, FileText, RefreshCw } from "lucide-react";
import { getPurchases } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";

const MyTickets = () => {
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
      
      <main className="pb-16">
        {/* Hero Banner */}
        <div className="relative h-[300px] md:h-[400px] w-full">
          <img
            src={currentPurchase.eventImage}
            alt={currentPurchase.eventName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="container max-w-6xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
                {currentPurchase.eventName}
              </h1>
              <p className="text-lg text-muted-foreground mb-2">
                {new Date(currentPurchase.eventDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })} • {currentPurchase.eventTime}
              </p>
              <p className="text-muted-foreground">{currentPurchase.eventVenue}</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="container max-w-6xl mx-auto px-6 mt-8">
          <Card className="p-4 bg-muted/30">
            <div className="flex items-center justify-between text-sm flex-wrap gap-2">
              <div>
                <span className="text-muted-foreground">Order {currentPurchase.id} on </span>
                <span className="text-muted-foreground">
                  {new Date(currentPurchase.purchaseDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                <span className="font-semibold text-foreground ml-2">
                  • ${currentPurchase.totalAmount.toFixed(2)}
                </span>
              </div>
              <button className="text-primary hover:underline text-xs">
                Report this event
              </button>
            </div>
          </Card>

          {/* Tickets Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">
              Your Tickets ({currentPurchase.tickets.length})
            </h2>
            
            <div className="space-y-4">
              {currentPurchase.tickets.map((ticket, index) => (
                <Card key={ticket.id} className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6 items-start">
                    {/* QR Code Section */}
                    <div className="flex-shrink-0">
                      <div className="w-48 h-48 bg-white p-4 rounded-lg shadow-sm mx-auto lg:mx-0">
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

                    {/* Ticket Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold mb-3">
                        {ticket.ticketTypeName}
                      </h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p><span className="font-medium text-foreground">Name:</span> {currentPurchase.buyerName}</p>
                        <p><span className="font-medium text-foreground">Email:</span> {currentPurchase.buyerEmail}</p>
                        <p><span className="font-medium text-foreground">Ticket ID:</span> {ticket.id}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 w-full lg:w-auto lg:min-w-[180px]">
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
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Organizer */}
          <Card className="mt-6 p-6">
            <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Have questions about your tickets or the event? Contact the organizer.
            </p>
            <Button variant="ghost" className="text-primary">
              Contact the organizer
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MyTickets;
