import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, Share2, Calendar, MapPin, Mail } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Purchase } from "@/lib/mockData";
import { toast } from "@/hooks/use-toast";

const PurchaseSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const purchase: Purchase | undefined = location.state?.purchase;

  if (!purchase) {
    navigate('/');
    return null;
  }

  const handleShare = (publicId: string) => {
    const shareUrl = `${window.location.origin}/ticket/${publicId}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied!",
      description: "Ticket link has been copied to clipboard.",
    });
  };

  const handleDownload = (qrCode: string, ticketId: string) => {
    // Simple download implementation
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `ticket-${ticketId}.png`;
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-success/10 p-4">
                <CheckCircle className="h-16 w-16 text-success" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Purchase Successful!</h1>
            <p className="text-muted-foreground">
              Your tickets have been confirmed. A confirmation email has been sent to {purchase.buyerEmail}
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{purchase.eventName}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
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
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{purchase.eventVenue}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">Order ID</div>
                  <div className="font-mono text-sm">{purchase.id}</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground mb-1">Buyer Name</div>
                    <div className="font-medium">{purchase.buyerName}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Email</div>
                    <div className="font-medium">{purchase.buyerEmail}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Phone</div>
                    <div className="font-medium">{purchase.buyerPhone}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Total Amount</div>
                    <div className="font-bold text-primary">${purchase.totalAmount.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Tickets ({purchase.tickets.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {purchase.tickets.map((ticket, index) => (
                <Card key={ticket.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{ticket.ticketTypeName}</CardTitle>
                        <div className="text-sm text-muted-foreground mt-1">
                          Ticket #{index + 1}
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        Valid
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-center bg-white p-4 rounded-lg">
                      <img
                        src={ticket.qrCode}
                        alt={`Ticket ${index + 1} QR Code`}
                        className="w-48 h-48"
                      />
                    </div>

                    <div className="text-xs text-muted-foreground text-center font-mono">
                      ID: {ticket.id}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleDownload(ticket.qrCode, ticket.id)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleShare(ticket.publicId)}
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <Button onClick={() => navigate('/')}>
              Browse More Events
            </Button>
            <Button variant="outline" onClick={() => navigate('/my-tickets')}>
              View All My Tickets
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PurchaseSuccess;
