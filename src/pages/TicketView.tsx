import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Download, CheckCircle } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { getPurchaseByPublicId } from "@/lib/mockData";
import { toast } from "@/hooks/use-toast";

const TicketView = () => {
  const { publicId } = useParams();
  const navigate = useNavigate();
  
  const result = publicId ? getPurchaseByPublicId(publicId) : null;

  if (!result) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Ticket not found</h1>
          <p className="text-muted-foreground mb-6">
            This ticket link is invalid or has been removed.
          </p>
          <Button onClick={() => navigate('/')}>Browse Events</Button>
        </div>
      </div>
    );
  }

  const { purchase, ticket } = result;
  const ticketIndex = purchase.tickets.findIndex(t => t.id === ticket.id) + 1;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = ticket.qrCode;
    link.download = `ticket-${ticket.id}.png`;
    link.click();
    toast({
      title: "Downloading ticket",
      description: "Your ticket QR code is being downloaded.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4 bg-success/10 text-success">
              <CheckCircle className="h-3 w-3 mr-1" />
              Valid Ticket
            </Badge>
            <h1 className="text-3xl font-bold mb-2">Event Ticket</h1>
            <p className="text-muted-foreground">
              Ticket #{ticketIndex} of {purchase.tickets.length}
            </p>
          </div>

          <Card className="mb-6">
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <img
                src={purchase.eventImage}
                alt={purchase.eventName}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">{purchase.eventName}</CardTitle>
              <div className="space-y-3 text-muted-foreground pt-3">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-primary" />
                  <span>
                    {new Date(purchase.eventDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-primary" />
                  <span>{purchase.eventTime}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-primary" />
                  <span>{purchase.eventVenue}</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center bg-white p-6 rounded-lg">
                <img
                  src={ticket.qrCode}
                  alt="Ticket QR Code"
                  className="w-64 h-64"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Ticket Type</div>
                  <div className="font-medium">{ticket.ticketTypeName}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Price</div>
                  <div className="font-medium">${ticket.price.toFixed(2)}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-muted-foreground mb-1">Ticket ID</div>
                  <div className="font-mono text-xs break-all">{ticket.id}</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="text-sm text-muted-foreground mb-3">
                  Present this QR code at the venue entrance for quick check-in.
                </div>
                <Button className="w-full" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Ticket
                </Button>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg text-sm">
                <div className="font-medium mb-2">Important Information</div>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• This ticket is valid for one-time entry only</li>
                  <li>• Do not share this QR code publicly</li>
                  <li>• Arrive at least 30 minutes before the event</li>
                  <li>• Bring a valid ID for verification</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TicketView;
