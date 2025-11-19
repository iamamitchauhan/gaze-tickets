import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Ticket } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md px-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <Ticket className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground">Ticket Management</h1>
        <p className="text-lg text-muted-foreground">
          View and manage your event tickets with ease
        </p>
        <Button 
          onClick={() => navigate("/tickets")}
          className="mt-4"
          size="lg"
        >
          View My Tickets
        </Button>
      </div>
    </div>
  );
};

export default Index;
