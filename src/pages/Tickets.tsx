import { useState } from "react";
import { TicketCard } from "@/components/TicketCard";
import { ContactInfo } from "@/components/ContactInfo";
import { OrderSummary } from "@/components/OrderSummary";
import eventPoster from "@/assets/event-poster.jpg";

const Tickets = () => {
  const [currentTicket, setCurrentTicket] = useState(1);
  
  // Mock data - in a real app, this would come from an API
  const ticketData = {
    eventTitle: "Diwali Mela - Dallas Festival of Lights",
    eventDate: "Sun, Oct 13 • 12:00 PM",
    eventLocation: "Southfork Ranch",
    eventImage: eventPoster,
    ticketType: "General Admission",
    totalTickets: 3,
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=TICKET_" + currentTicket,
    contactInfo: {
      firstName: "Manmeet",
      lastName: "Kaur",
      email: "hellomanmeet@gmail.com",
      deliveryMethod: "eTicket",
    },
    orderInfo: {
      orderId: "10685851059",
      orderDate: "Oct 9, 2024",
      totalAmount: "$37.53",
    },
  };

  const handlePrevious = () => {
    if (currentTicket > 1) {
      setCurrentTicket(currentTicket - 1);
    }
  };

  const handleNext = () => {
    if (currentTicket < ticketData.totalTickets) {
      setCurrentTicket(currentTicket + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">TicketView</h1>
            <nav className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-foreground hover:text-primary">Browse Events</a>
              <a href="#" className="text-primary font-medium">My Tickets</a>
              <a href="#" className="text-foreground hover:text-primary">Help</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TicketCard
              eventTitle={ticketData.eventTitle}
              eventDate={ticketData.eventDate}
              eventLocation={ticketData.eventLocation}
              eventImage={ticketData.eventImage}
              ticketType={ticketData.ticketType}
              currentTicket={currentTicket}
              totalTickets={ticketData.totalTickets}
              qrCodeUrl={ticketData.qrCodeUrl}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
            <div className="mt-4">
              <OrderSummary
                orderId={ticketData.orderInfo.orderId}
                orderDate={ticketData.orderInfo.orderDate}
                totalAmount={ticketData.orderInfo.totalAmount}
              />
            </div>
          </div>

          <div>
            <ContactInfo
              firstName={ticketData.contactInfo.firstName}
              lastName={ticketData.contactInfo.lastName}
              email={ticketData.contactInfo.email}
              deliveryMethod={ticketData.contactInfo.deliveryMethod}
              ticketQuantity={ticketData.totalTickets}
              ticketType={ticketData.ticketType}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tickets;
