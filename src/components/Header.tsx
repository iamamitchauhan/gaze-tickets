import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Ticket, ShoppingCart, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="rounded-lg bg-primary p-2">
            <Ticket className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">TicketHub</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Events
          </Link>
          <Link to="/my-tickets" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            My Tickets
          </Link>
          <Link to="/my-tickets-v2" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            My Tickets v2
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/my-tickets')}>
                  My Tickets
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/my-tickets-v2')}>
                  My Tickets v2
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
