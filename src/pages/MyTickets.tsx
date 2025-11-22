import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Ticket, Download, FileText, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { getPurchases } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TICKETS_PER_PAGE = 5;

const MyTickets = () => {
  const navigate = useNavigate();
  const purchases = getPurchases();
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>({});
  const [ticketPages, setTicketPages] = useState<Record<string, number>>({});

  const toggleEvent = (purchaseId: string) => {
    setExpandedEvents(prev => ({ ...prev, [purchaseId]: !prev[purchaseId] }));
  };

  const now = new Date();
  const upcomingPurchases = purchases.filter(p => new Date(p.eventDate) >= now);
  const pastPurchases = purchases.filter(p => new Date(p.eventDate) < now);

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
      
      <main className="pb-16">
        {/* Page Header */}
        <div className="border-b">
          <div className="container max-w-6xl mx-auto px-6 py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">My Tickets</h1>
            <p className="text-muted-foreground">
              {purchases.length} {purchases.length === 1 ? 'event' : 'events'} • {purchases.reduce((total, p) => total + p.tickets.length, 0)} tickets
            </p>
          </div>
        </div>

        {/* Tabs for Upcoming/Past Events */}
        <div className="container max-w-6xl mx-auto px-6 mt-8">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">
                Upcoming ({upcomingPurchases.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Past ({pastPurchases.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-8">
              {upcomingPurchases.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No upcoming events</p>
                </Card>
              ) : (
                upcomingPurchases.map((purchase) => (
                  <EventTicketCard
                    key={purchase.id}
                    purchase={purchase}
                    isExpanded={expandedEvents[purchase.id]}
                    onToggle={() => toggleEvent(purchase.id)}
                    currentPage={ticketPages[purchase.id] || 1}
                    onPageChange={(page) => setTicketPages(prev => ({ ...prev, [purchase.id]: page }))}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-8">
              {pastPurchases.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No past events</p>
                </Card>
              ) : (
                pastPurchases.map((purchase) => (
                  <EventTicketCard
                    key={purchase.id}
                    purchase={purchase}
                    isExpanded={expandedEvents[purchase.id]}
                    onToggle={() => toggleEvent(purchase.id)}
                    currentPage={ticketPages[purchase.id] || 1}
                    onPageChange={(page) => setTicketPages(prev => ({ ...prev, [purchase.id]: page }))}
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

interface EventTicketCardProps {
  purchase: ReturnType<typeof getPurchases>[0];
  isExpanded: boolean;
  onToggle: () => void;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const EventTicketCard = ({ purchase, isExpanded, onToggle, currentPage, onPageChange }: EventTicketCardProps) => {
  const totalPages = Math.ceil(purchase.tickets.length / TICKETS_PER_PAGE);
  const startIndex = (currentPage - 1) * TICKETS_PER_PAGE;
  const visibleTickets = purchase.tickets.slice(startIndex, startIndex + TICKETS_PER_PAGE);

  return (
    <Card className="overflow-hidden">
      {/* Event Header */}
      <div className="relative h-[200px] md:h-[250px] w-full">
        <img
          src={purchase.eventImage}
          alt={purchase.eventName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {purchase.eventName}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-1">
            {new Date(purchase.eventDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            })} • {purchase.eventTime}
          </p>
          <p className="text-sm text-muted-foreground">{purchase.eventVenue}</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Order Summary */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between text-sm flex-wrap gap-2">
            <div>
              <span className="text-muted-foreground">Order {purchase.id} on </span>
              <span className="text-muted-foreground">
                {new Date(purchase.purchaseDate).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span className="font-semibold text-foreground ml-2">
                • ${purchase.totalAmount.toFixed(2)}
              </span>
            </div>
            <button className="text-primary hover:underline text-xs">
              Report this event
            </button>
          </div>
        </div>

        {/* Collapsible Tickets Section */}
        <Collapsible open={isExpanded} onOpenChange={onToggle}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">
              Your Tickets ({purchase.tickets.length})
            </h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-2" />
                    Hide Tickets
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Show Tickets
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="space-y-4">
            {visibleTickets.map((ticket, index) => {
              const actualIndex = startIndex + index;
              return (
                <div key={ticket.id} className="p-6 border rounded-lg bg-card">
                  <div className="flex flex-col lg:flex-row gap-6 items-start">
                    {/* QR Code Section */}
                    <div className="flex-shrink-0">
                      <div className="w-48 h-48 bg-white p-4 rounded-lg shadow-sm mx-auto lg:mx-0">
                        <img
                          src={ticket.qrCode}
                          alt={`Ticket ${actualIndex + 1} QR Code`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground text-center mt-3">
                        {ticket.ticketTypeName} • Ticket {actualIndex + 1}
                      </p>
                    </div>

                    {/* Ticket Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xl font-semibold mb-3">
                        {ticket.ticketTypeName}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium text-foreground">Attendee:</span>
                          <p className="text-muted-foreground">{ticket.attendeeName}</p>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">Email:</span>
                          <p className="text-muted-foreground">{ticket.attendeeEmail}</p>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">Phone:</span>
                          <p className="text-muted-foreground">{ticket.attendeePhone}</p>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">Ticket ID:</span>
                          <p className="text-muted-foreground">{ticket.id}</p>
                        </div>
                        {ticket.foodPreference && (
                          <div>
                            <span className="font-medium text-foreground">Food Preference:</span>
                            <p className="text-muted-foreground">{ticket.foodPreference}</p>
                          </div>
                        )}
                        {ticket.specialRequests && (
                          <div>
                            <span className="font-medium text-foreground">Special Requests:</span>
                            <p className="text-muted-foreground">{ticket.specialRequests}</p>
                          </div>
                        )}
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
                </div>
              );
            })}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground px-4">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* Contact Organizer */}
        <div className="flex justify-end">
          <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Need help? Contact organizer →
          </button>
        </div>
      </div>
    </Card>
  );
};

export default MyTickets;
