import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";
import { getPurchases } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { OrderSummary } from "@/components/OrderSummary";
import { ContactInfo } from "@/components/ContactInfo";
import { TicketCard } from "@/components/TicketCard";

const MyTickets = () => {
  const navigate = useNavigate();
  const purchases = getPurchases();
  const [selectedPurchaseIndex, setSelectedPurchaseIndex] = useState(0);
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);

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

  const currentPurchase = purchases[selectedPurchaseIndex];
  const currentTicket = currentPurchase.tickets[currentTicketIndex];

  const handleNext = () => {
    if (currentTicketIndex < currentPurchase.tickets.length - 1) {
      setCurrentTicketIndex(currentTicketIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentTicketIndex > 0) {
      setCurrentTicketIndex(currentTicketIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Tickets</h1>

          <OrderSummary
            orderId={currentPurchase.id}
            orderDate={new Date(currentPurchase.purchaseDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
            totalAmount={`$${currentPurchase.totalAmount.toFixed(2)}`}
          />

          <div className="grid lg:grid-cols-[1fr,400px] gap-6 mt-6">
            <div>
              <TicketCard
                eventTitle={currentPurchase.eventName}
                eventDate={`${new Date(currentPurchase.eventDate).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })} • ${currentPurchase.eventTime}`}
                eventLocation={currentPurchase.eventVenue}
                eventImage={currentPurchase.eventImage}
                ticketType={currentTicket.ticketTypeName}
                currentTicket={currentTicketIndex + 1}
                totalTickets={currentPurchase.tickets.length}
                qrCodeUrl={currentTicket.qrCode}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            </div>

            <div>
              <ContactInfo
                firstName={currentPurchase.buyerName.split(' ')[0] || currentPurchase.buyerName}
                lastName={currentPurchase.buyerName.split(' ').slice(1).join(' ') || ''}
                email={currentPurchase.buyerEmail}
                deliveryMethod="Mobile"
                ticketQuantity={currentPurchase.tickets.length}
                ticketType={currentPurchase.tickets[0].ticketTypeName}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyTickets;
