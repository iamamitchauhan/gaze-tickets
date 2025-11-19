import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import AttendeeInfo from "./pages/AttendeeInfo";
import Checkout from "./pages/Checkout";
import PurchaseSuccess from "./pages/PurchaseSuccess";
import MyTickets from "./pages/MyTickets";
import TicketView from "./pages/TicketView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/attendee-info" element={<AttendeeInfo />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/purchase-success" element={<PurchaseSuccess />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/ticket/:publicId" element={<TicketView />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
