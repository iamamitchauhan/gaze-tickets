import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Event } from "@/lib/mockData";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const lowestPrice = Math.min(...event.ticketTypes.map(t => t.price));
  const hasAvailableTickets = event.ticketTypes.some(t => t.available > 0);

  return (
    <Link to={`/event/${event.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-card/90 backdrop-blur">
              {event.category}
            </Badge>
          </div>
          {!hasAvailableTickets && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg px-4 py-2">
                Sold Out
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
            {event.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {event.description}
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="line-clamp-1">{event.venue}</span>
            </div>
          </div>
          {hasAvailableTickets && (
            <div className="mt-4 pt-3 border-t flex items-center justify-between">
              <span className="text-sm text-muted-foreground">From</span>
              <span className="text-lg font-bold text-primary">${lowestPrice.toFixed(2)}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
