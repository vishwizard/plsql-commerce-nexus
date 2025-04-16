
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingBag, Trash, ChevronLeft, ShoppingCart } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

interface CartItem {
  cart_id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  subtotal: number;
  image_url: string;
}

const Cart = () => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_cart_details', {
        p_user_id: user.id
      });
      
      if (error) throw error;
      setCartItems(data || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast({
        title: "Error",
        description: "Failed to load your cart",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId: number) => {
    if (!user) return;
    
    try {
      const cartId = cartItems[0]?.cart_id;
      if (!cartId) return;
      
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cartId)
        .eq('product_id', productId);
      
      if (error) throw error;
      
      // Update local state
      setCartItems(cartItems.filter(item => item.product_id !== productId));
      
      toast({
        title: "Item removed",
        description: "The item has been removed from your cart."
      });
    } catch (error) {
      console.error("Error removing item:", error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive"
      });
    }
  };

  const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
    if (!user) return;
    if (newQuantity < 1) return;
    
    try {
      const cartId = cartItems[0]?.cart_id;
      if (!cartId) return;
      
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('cart_id', cartId)
        .eq('product_id', productId);
      
      if (error) throw error;
      
      // Update local state
      setCartItems(cartItems.map(item => 
        item.product_id === productId 
          ? { ...item, quantity: newQuantity, subtotal: item.price * newQuantity } 
          : item
      ));
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast({
        title: "Error",
        description: "Failed to update item quantity",
        variant: "destructive"
      });
    }
  };

  const handleCheckout = async () => {
    if (!user || cartItems.length === 0) return;
    
    setCheckoutLoading(true);
    try {
      // For this demo, we'll use a simplified shipping address
      const shippingAddress = "154 Ganga Sadan Khemanand Marg Bheemgoda Haridwar";
      
      const { data, error } = await supabase.rpc('place_order', {
        p_user_id: user.id,
        p_shipping_address: shippingAddress
      });
      
      if (error) throw error;
      
      setCartItems([]);
      
      toast({
        title: "Order placed!",
        description: "Your order has been placed successfully."
      });
      
      // Navigate to a confirmation or order details page
      navigate('/checkout-success');
    } catch (error: any) {
      console.error("Error placing order:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to place order",
        variant: "destructive"
      });
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="h-12 w-12 mx-auto text-dbms-primary mb-4" />
            <h1 className="text-2xl font-bold text-dbms-primary mb-4">Sign In to View Your Cart</h1>
            <p className="mb-6 text-muted-foreground">
              Please sign in to view your shopping cart and continue shopping.
            </p>
            <Link to="/auth">
              <Button className="bg-dbms-primary hover:bg-dbms-secondary">Sign In</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <h1 className="text-2xl font-bold text-dbms-primary mb-6">Your Cart</h1>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex border rounded p-4">
                <Skeleton className="h-24 w-24 rounded mr-4" />
                <div className="flex-1">
                  <Skeleton className="h-6 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-1/4 mb-4" />
                  <Skeleton className="h-8 w-20" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(totalAmount);

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-dbms-primary hover:text-dbms-secondary">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Continue Shopping
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold text-dbms-primary mb-6">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-12 w-12 mx-auto text-dbms-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/">
              <Button className="bg-dbms-primary hover:bg-dbms-secondary">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product_id} className="border rounded-lg overflow-hidden bg-white">
                    <div className="flex flex-col sm:flex-row p-4">
                      <div className="sm:w-24 sm:h-24 mb-4 sm:mb-0">
                        <img
                          src={item.image_url}
                          alt={item.product_name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 sm:ml-6 flex flex-col sm:flex-row sm:items-center justify-between">
                        <div>
                          <Link 
                            to={`/product/${item.product_id}`}
                            className="font-semibold hover:text-dbms-primary hover:underline"
                          >
                            {item.product_name}
                          </Link>
                          <p className="text-muted-foreground text-sm">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            }).format(item.price)} each
                          </p>
                          
                          <div className="flex items-center mt-2">
                            <button
                              className="w-8 h-8 border rounded-l flex items-center justify-center"
                              onClick={() => handleUpdateQuantity(item.product_id, Math.max(1, item.quantity - 1))}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="w-12 h-8 border-t border-b text-center"
                              value={item.quantity}
                              readOnly
                            />
                            <button
                              className="w-8 h-8 border rounded-r flex items-center justify-center"
                              onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 sm:mt-0">
                          <span className="font-semibold">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            }).format(item.subtotal)}
                          </span>
                          <button
                            className="sm:ml-4 text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveItem(item.product_id)}
                            aria-label="Remove item"
                          >
                            <Trash className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6 bg-white sticky top-8">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formattedTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between mb-6">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">{formattedTotal}</span>
                </div>
                
                <Button
                  className="w-full py-6 bg-dbms-primary hover:bg-dbms-secondary"
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? "Processing..." : "Checkout"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
