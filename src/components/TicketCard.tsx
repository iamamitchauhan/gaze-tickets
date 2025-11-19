import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

interface TicketCardProps {
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  eventImage: string;
  ticketType: string;
  currentTicket: number;
  totalTickets: number;
  qrCodeUrl: string;
  onPrevious: () => void;
  onNext: () => void;
}

export const TicketCard = ({
  eventTitle,
  eventDate,
  eventLocation,
  eventImage,
  ticketType,
  currentTicket,
  totalTickets,
  qrCodeUrl,
  onPrevious,
  onNext,
}: TicketCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img
          src={eventImage}
          alt={eventTitle}
          className="w-full h-full object-cover"
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4 rounded-full"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">{eventTitle}</h2>
        <p className="text-muted-foreground mb-1">{eventDate}</p>
        <p className="text-muted-foreground text-sm">{eventLocation}</p>

        <div className="mt-8 flex flex-col items-center justify-center py-8 bg-muted/30 rounded-lg relative">
          {currentTicket > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full"
              onClick={onPrevious}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}

          <div className="flex flex-col items-center space-y-4">
            <div className="w-48 h-48 bg-white p-4 rounded-lg shadow-sm">
              <img
                src={qrCodeUrl}
                alt="Ticket QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {ticketType} • Ticket {currentTicket} of {totalTickets}
            </p>
          </div>

          {currentTicket < totalTickets && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full"
              onClick={onNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalTickets }).map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index + 1 === currentTicket ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <Button variant="outline" className="w-full">
            View Receipt
          </Button>
          <Button variant="outline" className="w-full">
            Request a Refund
          </Button>
          <Button variant="ghost" className="w-full text-primary">
            Contact the organizer
          </Button>
        </div>
      </div>
    </Card>
  );
};
