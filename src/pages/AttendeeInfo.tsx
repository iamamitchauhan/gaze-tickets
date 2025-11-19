import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Event, TicketType } from "@/lib/mockData";

interface AttendeeData {
  name: string;
  email: string;
  phone: string;
  foodPreference?: string;
  accommodation?: string;
  specialRequests?: string;
}

interface SelectedTicket extends TicketType {
  quantity: number;
}

const AttendeeInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, selectedTickets, totalPrice } = location.state as {
    event: Event;
    selectedTickets: SelectedTicket[];
    totalPrice: number;
  };

  // Create array of all individual tickets
  const allTickets = selectedTickets.flatMap(ticket => 
    Array.from({ length: ticket.quantity }, () => ticket)
  );

  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);
  const [attendeesData, setAttendeesData] = useState<AttendeeData[]>(
    allTickets.map(() => ({
      name: "",
      email: "",
      phone: "",
      foodPreference: "",
      accommodation: "",
      specialRequests: "",
    }))
  );

  const currentTicket = allTickets[currentTicketIndex];
  const currentAttendee = attendeesData[currentTicketIndex];
  const isVIP = currentTicket.name.toLowerCase().includes('vip');

  const updateCurrentAttendee = (field: keyof AttendeeData, value: string) => {
    setAttendeesData(prev => {
      const updated = [...prev];
      updated[currentTicketIndex] = {
        ...updated[currentTicketIndex],
        [field]: value,
      };
      return updated;
    });
  };

  const validateCurrentAttendee = () => {
    if (!currentAttendee.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter attendee name",
        variant: "destructive",
      });
      return false;
    }
    if (!currentAttendee.email.trim() || !currentAttendee.email.includes('@')) {
      toast({
        title: "Valid email required",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }
    if (!currentAttendee.phone.trim()) {
      toast({
        title: "Phone required",
        description: "Please enter phone number",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentAttendee()) return;

    if (currentTicketIndex < allTickets.length - 1) {
      setCurrentTicketIndex(prev => prev + 1);
    } else {
      // All attendees filled, proceed to checkout
      navigate('/checkout', {
        state: {
          event,
          selectedTickets,
          totalPrice,
          attendeesData,
        }
      });
    }
  };

  const handleBack = () => {
    if (currentTicketIndex > 0) {
      setCurrentTicketIndex(prev => prev - 1);
    } else {
      navigate(-1);
    }
  };

  if (!event || !selectedTickets) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 max-w-3xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Attendee Information</h1>
          <p className="text-muted-foreground">
            Ticket {currentTicketIndex + 1} of {allTickets.length} - {currentTicket.name}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{currentTicketIndex + 1} / {allTickets.length}</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentTicketIndex + 1) / allTickets.length) * 100}%` }}
            />
          </div>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter full name"
                value={currentAttendee.name}
                onChange={(e) => updateCurrentAttendee('name', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={currentAttendee.email}
                onChange={(e) => updateCurrentAttendee('email', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                value={currentAttendee.phone}
                onChange={(e) => updateCurrentAttendee('phone', e.target.value)}
              />
            </div>

            {isVIP && (
              <>
                <div>
                  <Label htmlFor="food">Food Preference</Label>
                  <Select
                    value={currentAttendee.foodPreference}
                    onValueChange={(value) => updateCurrentAttendee('foodPreference', value)}
                  >
                    <SelectTrigger id="food">
                      <SelectValue placeholder="Select food preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                      <SelectItem value="gluten-free">Gluten Free</SelectItem>
                      <SelectItem value="halal">Halal</SelectItem>
                      <SelectItem value="kosher">Kosher</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="accommodation">Accommodation Required</Label>
                  <Select
                    value={currentAttendee.accommodation}
                    onValueChange={(value) => updateCurrentAttendee('accommodation', value)}
                  >
                    <SelectTrigger id="accommodation">
                      <SelectValue placeholder="Select accommodation preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Accommodation</SelectItem>
                      <SelectItem value="single">Single Room</SelectItem>
                      <SelectItem value="double">Double Room</SelectItem>
                      <SelectItem value="suite">Suite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="special">Special Requests</Label>
                  <Textarea
                    id="special"
                    placeholder="Any special requests or requirements..."
                    value={currentAttendee.specialRequests}
                    onChange={(e) => updateCurrentAttendee('specialRequests', e.target.value)}
                    rows={3}
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
            >
              Back
            </Button>
            <Button onClick={handleNext}>
              {currentTicketIndex < allTickets.length - 1 ? 'Next Attendee' : 'Continue to Payment'}
            </Button>
          </div>
        </Card>

        {/* All tickets overview */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">All Tickets</h3>
          <div className="flex flex-wrap gap-2">
            {allTickets.map((ticket, index) => (
              <button
                key={index}
                onClick={() => setCurrentTicketIndex(index)}
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                  index === currentTicketIndex
                    ? 'bg-primary text-primary-foreground'
                    : attendeesData[index].name && attendeesData[index].email && attendeesData[index].phone
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {index + 1}. {ticket.name}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AttendeeInfo;
