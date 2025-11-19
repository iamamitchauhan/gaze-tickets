import concertImage from "@/assets/concert-event.jpg";
import sportsImage from "@/assets/sports-event.jpg";
import conferenceImage from "@/assets/conference-event.jpg";
import festivalImage from "@/assets/event-poster.jpg";

export interface TicketType {
  id: string;
  name: string;
  price: number;
  available: number;
  description: string;
  features: string[];
}

export interface Event {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  date: string;
  time: string;
  venue: string;
  venueAddress: string;
  image: string;
  category: string;
  ticketTypes: TicketType[];
}

export const mockEvents: Event[] = [
  {
    id: "1",
    name: "Summer Music Festival 2025",
    description: "The biggest music festival of the year featuring top artists",
    longDescription: "Join us for an unforgettable weekend of music, art, and culture. Featuring performances from world-renowned artists across multiple stages. Food trucks, art installations, and camping available.",
    date: "2025-07-15",
    time: "12:00 PM - 11:00 PM",
    venue: "Central Park Arena",
    venueAddress: "123 Park Avenue, New York, NY 10001",
    image: concertImage,
    category: "Music",
    ticketTypes: [
      {
        id: "1-early",
        name: "Early Bird",
        price: 89.99,
        available: 0,
        description: "Limited early access tickets (SOLD OUT)",
        features: ["Standard entry", "Early purchase discount"]
      },
      {
        id: "1-general",
        name: "General Admission",
        price: 129.99,
        available: 500,
        description: "Standard access to all stages and areas",
        features: ["Access to all stages", "General seating", "Food court access"]
      },
      {
        id: "1-vip",
        name: "VIP Pass",
        price: 299.99,
        available: 50,
        description: "Premium experience with exclusive perks",
        features: ["Priority entry", "VIP lounge access", "Complimentary drinks", "Meet & greet opportunity", "Premium seating"]
      }
    ]
  },
  {
    id: "2",
    name: "Championship Finals 2025",
    description: "Watch the most anticipated sports event of the season",
    longDescription: "Experience the thrill of championship sports live! Witness history in the making as the top teams compete for the ultimate title. Premium stadium facilities and world-class hospitality.",
    date: "2025-08-20",
    time: "7:00 PM - 10:00 PM",
    venue: "National Stadium",
    venueAddress: "456 Stadium Drive, Los Angeles, CA 90012",
    image: sportsImage,
    category: "Sports",
    ticketTypes: [
      {
        id: "2-early",
        name: "Early Bird",
        price: 59.99,
        available: 10,
        description: "Last few early bird tickets available!",
        features: ["Upper deck seating", "Early purchase discount"]
      },
      {
        id: "2-general",
        name: "General Admission",
        price: 89.99,
        available: 1000,
        description: "Standard stadium seating",
        features: ["Reserved seating", "Access to concessions", "Digital program"]
      },
      {
        id: "2-vip",
        name: "VIP Experience",
        price: 349.99,
        available: 25,
        description: "Luxury box seating with catering",
        features: ["Premium box seats", "All-inclusive food & drinks", "VIP parking", "Exclusive merchandise", "Pre-game access"]
      }
    ]
  },
  {
    id: "3",
    name: "Tech Summit 2025",
    description: "Annual technology conference with industry leaders",
    longDescription: "Connect with innovators, learn from experts, and discover the latest in technology. Three days of keynotes, workshops, and networking opportunities with tech industry leaders from around the globe.",
    date: "2025-09-10",
    time: "9:00 AM - 6:00 PM",
    venue: "Convention Center",
    venueAddress: "789 Convention Blvd, San Francisco, CA 94102",
    image: conferenceImage,
    category: "Conference",
    ticketTypes: [
      {
        id: "3-early",
        name: "Early Bird",
        price: 199.99,
        available: 150,
        description: "Save 50% with early registration",
        features: ["3-day access", "Basic workshop access", "Networking events"]
      },
      {
        id: "3-general",
        name: "Standard Pass",
        price: 399.99,
        available: 300,
        description: "Full conference access",
        features: ["3-day access", "All workshops", "Lunch included", "Conference materials", "Certificate"]
      },
      {
        id: "3-vip",
        name: "Premium Pass",
        price: 799.99,
        available: 75,
        description: "Exclusive access and benefits",
        features: ["3-day premium access", "Private sessions with speakers", "VIP lounge", "All meals included", "Premium swag bag", "1-on-1 mentorship session"]
      }
    ]
  },
  {
    id: "4",
    name: "Diwali Mela - Festival of Lights",
    description: "Celebrate the Festival of Lights with cultural performances and festivities",
    longDescription: "Experience the magic of Diwali at Southfork Ranch! Enjoy traditional carnival rides, spectacular fireworks, authentic cuisine from the Diwali Bazaar, and mesmerizing fashion shows. A celebration of culture, lights, and community.",
    date: "2025-10-13",
    time: "12:00 PM - 10:00 PM",
    venue: "Southfork Ranch",
    venueAddress: "3700 Hogge Drive, Parker, TX 75002",
    image: festivalImage,
    category: "Festival",
    ticketTypes: [
      {
        id: "4-early",
        name: "Early Bird",
        price: 9.99,
        available: 5,
        description: "Limited early access discount (Almost Gone!)",
        features: ["Standard entry", "Access to all activities"]
      },
      {
        id: "4-general",
        name: "General Admission",
        price: 12.50,
        available: 800,
        description: "Standard festival access for all ages",
        features: ["Entry to all festival areas", "Carnival rides access", "Live performances", "Fireworks show"]
      },
      {
        id: "4-vip",
        name: "VIP Package",
        price: 35.00,
        available: 100,
        description: "Premium festival experience",
        features: ["Priority entry", "VIP seating for shows", "Complimentary food vouchers", "Exclusive meet & greet", "Premium parking"]
      }
    ]
  }
];

export interface Purchase {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  eventImage: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  notes: string;
  tickets: PurchasedTicket[];
  totalAmount: number;
  purchaseDate: string;
  isGuest: boolean;
}

export interface PurchasedTicket {
  id: string;
  ticketTypeId: string;
  ticketTypeName: string;
  price: number;
  qrCode: string;
  publicId: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string;
  foodPreference?: string;
  accommodation?: string;
  specialRequests?: string;
}

// Helper functions for localStorage
export const savePurchase = (purchase: Purchase) => {
  const purchases = getPurchases();
  purchases.push(purchase);
  localStorage.setItem('purchases', JSON.stringify(purchases));
};

export const getPurchases = (): Purchase[] => {
  const stored = localStorage.getItem('purchases');
  return stored ? JSON.parse(stored) : [];
};

export const getPurchaseByPublicId = (publicId: string): { purchase: Purchase; ticket: PurchasedTicket } | null => {
  const purchases = getPurchases();
  for (const purchase of purchases) {
    const ticket = purchase.tickets.find(t => t.publicId === publicId);
    if (ticket) {
      return { purchase, ticket };
    }
  }
  return null;
};
