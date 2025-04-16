
import { Search, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Navbar = () => {
  // Hardcoded cart item count for demo
  const cartItemCount = 3;

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="font-bold text-xl text-dbms-primary">
              <span>PL/SQL</span>
              <span className="text-dbms-accent"> Commerce</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/products" className="text-sm font-medium link-underline">All Products</Link>
            <Link to="/category/electronics" className="text-sm font-medium link-underline">Electronics</Link>
            <Link to="/category/clothing" className="text-sm font-medium link-underline">Clothing</Link>
            <Link to="/category/home" className="text-sm font-medium link-underline">Home</Link>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-[200px] pl-8 md:w-[300px] rounded-full bg-muted"
            />
          </div>
          
          <Link to="/account">
            <Button variant="ghost" size="icon" className="relative">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs bg-dbms-accent text-black">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
