
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { Button } from "./ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "./ui/badge";

const Navbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Fetch cart items count when user is logged in
    if (user) {
      fetchCartCount();
    } else {
      setCartItemCount(0);
    }
  }, [user]);

  const fetchCartCount = async () => {
    try {
      const { data: cartDetails } = await supabase.rpc('get_cart_details', {
        p_user_id: user!.id
      });
      
      if (cartDetails) {
        setCartItemCount(cartDetails.length);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out successfully"
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-dbms-primary">PL/SQL Commerce</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/"
            className="text-sm font-medium transition-colors hover:text-dbms-primary"
          >
            Home
          </Link>
          <Link
            to="/category"
            className="text-sm font-medium transition-colors hover:text-dbms-primary"
          >
            Products
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-dbms-primary" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-dbms-secondary text-white">
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full p-2">
                    <User className="h-5 w-5 text-dbms-primary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {user.email}
                  </div>
                  <DropdownMenuSeparator />
                  <Link to="/profile">
                    <DropdownMenuItem>My Profile</DropdownMenuItem>
                  </Link>
                  <Link to="/orders">
                    <DropdownMenuItem>My Orders</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/auth">
              <Button className="bg-dbms-primary hover:bg-dbms-secondary">
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          {user && (
            <Link to="/cart" className="relative mr-4">
              <ShoppingCart className="h-6 w-6 text-dbms-primary" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-dbms-secondary text-white">
                  {cartItemCount}
                </Badge>
              )}
            </Link>
          )}
          <button 
            className="text-dbms-primary"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t py-4 px-6 bg-white flex flex-col space-y-4">
          <Link 
            to="/"
            className="text-sm font-medium transition-colors hover:text-dbms-primary py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/category"
            className="text-sm font-medium transition-colors hover:text-dbms-primary py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Products
          </Link>
          <div className="border-t pt-4">
            {user ? (
              <>
                <Link 
                  to="/profile"
                  className="flex items-center text-sm font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4 mr-2" /> My Profile
                </Link>
                <Link 
                  to="/orders"
                  className="flex items-center text-sm font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Orders
                </Link>
                <button 
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center text-sm font-medium text-red-600 py-2 w-full text-left"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </button>
              </>
            ) : (
              <Link 
                to="/auth" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full bg-dbms-primary hover:bg-dbms-secondary">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
