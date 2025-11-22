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
  },
  {
    id: "5",
    name: "New Year's Eve Gala 2026",
    description: "Ring in the new year with an unforgettable celebration",
    longDescription: "Welcome 2026 in style at our spectacular New Year's Eve Gala! Enjoy live music, gourmet dining, premium champagne toast at midnight, and breathtaking fireworks display. Dress to impress for this black-tie event of the year.",
    date: "2025-12-31",
    time: "8:00 PM - 2:00 AM",
    venue: "Grand Ballroom Hotel",
    venueAddress: "100 Luxury Lane, Miami, FL 33101",
    image: concertImage,
    category: "Entertainment",
    ticketTypes: [
      {
        id: "5-early",
        name: "Early Bird",
        price: 149.99,
        available: 75,
        description: "Special early booking rate",
        features: ["Standard entry", "Welcome cocktail", "Party favors"]
      },
      {
        id: "5-general",
        name: "General Admission",
        price: 199.99,
        available: 300,
        description: "Full night celebration access",
        features: ["Entry to main ballroom", "Champagne toast", "Live entertainment", "Premium open bar", "Midnight buffet"]
      },
      {
        id: "5-vip",
        name: "VIP Package",
        price: 449.99,
        available: 50,
        description: "Ultimate New Year's experience",
        features: ["Private VIP lounge access", "Reserved premium seating", "Premium bottle service", "Gourmet 5-course dinner", "Exclusive after-party access", "VIP valet parking"]
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
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Return dummy data with multiple events and attendees
  return [
    {
      id: "ORD-2025-001",
      eventId: "1",
      eventName: "Summer Music Festival 2025",
      eventDate: "2025-07-15",
      eventTime: "12:00 PM - 11:00 PM",
      eventVenue: "Central Park Arena",
      eventImage: concertImage,
      buyerName: "John Doe",
      buyerEmail: "john.doe@email.com",
      buyerPhone: "+1 (555) 123-4567",
      notes: "Looking forward to the festival!",
      tickets: [
        {
          id: "TKT-001-001",
          ticketTypeId: "1-general",
          ticketTypeName: "General Admission",
          price: 129.99,
          qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT-001-001",
          publicId: "SMF2025-GA-001",
          attendeeName: "John Doe",
          attendeeEmail: "john.doe@email.com",
          attendeePhone: "+1 (555) 123-4567",
          foodPreference: "Vegetarian",
          specialRequests: "Wheelchair accessible seating preferred"
        },
        {
          id: "TKT-001-002",
          ticketTypeId: "1-general",
          ticketTypeName: "General Admission",
          price: 129.99,
          qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT-001-002",
          publicId: "SMF2025-GA-002",
          attendeeName: "Jane Smith",
          attendeeEmail: "jane.smith@email.com",
          attendeePhone: "+1 (555) 234-5678",
          foodPreference: "Vegan",
          specialRequests: "None"
        }
      ],
      totalAmount: 259.98,
      purchaseDate: "2025-03-15T10:30:00Z",
      isGuest: false
    },
    {
      id: "ORD-2025-002",
      eventId: "2",
      eventName: "Championship Finals 2025",
      eventDate: "2025-08-20",
      eventTime: "7:00 PM - 10:00 PM",
      eventVenue: "National Stadium",
      eventImage: sportsImage,
      buyerName: "Sarah Johnson",
      buyerEmail: "sarah.j@email.com",
      buyerPhone: "+1 (555) 345-6789",
      notes: "Can't wait for the finals!",
      tickets: [
        {
          id: "TKT-002-001",
          ticketTypeId: "2-vip",
          ticketTypeName: "VIP Experience",
          price: 349.99,
          qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT-002-001",
          publicId: "CF2025-VIP-001",
          attendeeName: "Sarah Johnson",
          attendeeEmail: "sarah.j@email.com",
          attendeePhone: "+1 (555) 345-6789",
          foodPreference: "No restrictions",
          specialRequests: "Box 12 preferred if available"
        }
      ],
      totalAmount: 349.99,
      purchaseDate: "2025-04-10T14:20:00Z",
      isGuest: false
    },
    {
      id: "ORD-2025-003",
      eventId: "4",
      eventName: "Diwali Mela - Festival of Lights",
      eventDate: "2025-10-13",
      eventTime: "12:00 PM - 10:00 PM",
      eventVenue: "Southfork Ranch",
      eventImage: festivalImage,
      buyerName: "Raj Patel",
      buyerEmail: "raj.patel@email.com",
      buyerPhone: "+1 (555) 456-7890",
      notes: "Family celebration",
      tickets: [
        {
          id: "TKT-003-001",
          ticketTypeId: "4-general",
          ticketTypeName: "General Admission",
          price: 12.50,
          qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT-003-001",
          publicId: "DM2025-GA-001",
          attendeeName: "Raj Patel",
          attendeeEmail: "raj.patel@email.com",
          attendeePhone: "+1 (555) 456-7890",
          foodPreference: "Vegetarian",
          specialRequests: "None"
        },
        {
          id: "TKT-003-002",
          ticketTypeId: "4-general",
          ticketTypeName: "General Admission",
          price: 12.50,
          qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT-003-002",
          publicId: "DM2025-GA-002",
          attendeeName: "Priya Patel",
          attendeeEmail: "priya.patel@email.com",
          attendeePhone: "+1 (555) 456-7890",
          foodPreference: "Vegetarian",
          specialRequests: "None"
        },
        {
          id: "TKT-003-003",
          ticketTypeId: "4-general",
          ticketTypeName: "General Admission",
          price: 12.50,
          qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT-003-003",
          publicId: "DM2025-GA-003",
          attendeeName: "Aarav Patel",
          attendeeEmail: "raj.patel@email.com",
          attendeePhone: "+1 (555) 456-7890",
          foodPreference: "No restrictions",
          specialRequests: "Child seat required"
        },
        {
          id: "TKT-003-004",
          ticketTypeId: "4-general",
          ticketTypeName: "General Admission",
          price: 12.50,
          qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT-003-004",
          publicId: "DM2025-GA-004",
          attendeeName: "Diya Patel",
          attendeeEmail: "raj.patel@email.com",
          attendeePhone: "+1 (555) 456-7890",
          foodPreference: "No restrictions",
          specialRequests: "Child seat required"
        }
      ],
      totalAmount: 50.00,
      purchaseDate: "2025-05-20T09:15:00Z",
      isGuest: false
    }
  ];
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
