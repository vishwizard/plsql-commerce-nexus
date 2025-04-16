
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, ChevronLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ProductData } from "@/components/ProductCard";
import { useUser } from "@/context/UserContext";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from("products")
          .select(`
            *,
            categories!inner(name)
          `)
          .eq("id", id)
          .single();

        if (error) throw error;

        setProduct({
          ...data,
          category_name: data.categories.name,
          rating: 4.5, // Hardcoded for now, could come from reviews average
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({
          title: "Error",
          description: "Failed to load product details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= (product?.stock_quantity || 1)) {
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add items to your cart",
        variant: "destructive",
      });
      return;
    }

    if (!product) return;

    setAddingToCart(true);
    try {
      const { data, error } = await supabase.rpc('add_to_cart', {
        p_user_id: user.id,
        p_product_id: product.id,
        p_quantity: quantity
      });

      if (error) throw error;

      toast({
        title: "Added to cart",
        description: `${quantity} ${quantity > 1 ? "items" : "item"} added to your cart.`
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add item to cart",
        variant: "destructive",
      });
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-[400px] w-full" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-1/4" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container py-8 text-center">
          <h2 className="text-2xl font-bold text-dbms-primary mb-4">Product Not Found</h2>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Homepage
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-dbms-primary hover:text-dbms-secondary">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg overflow-hidden border">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-auto object-contain aspect-square"
            />
          </div>

          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-dbms-primary">{product.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">{product.category_name}</p>
            </div>
            
            <div className="flex items-center text-yellow-500">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={i < Math.floor(product.rating || 0) ? 0 : 1.5}
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                ))}
              <span className="ml-1 text-xs text-gray-500">
                ({(product.rating || 0).toFixed(1)})
              </span>
            </div>
            
            <p className="text-2xl font-bold">{formattedPrice}</p>

            {product.stock_quantity > 0 ? (
              <p className="text-green-600">In Stock ({product.stock_quantity} available)</p>
            ) : (
              <p className="text-red-600">Out of Stock</p>
            )}
            
            <Separator />
            
            <div className="prose max-w-none">
              <p>{product.description || "No description available for this product."}</p>
            </div>

            <div className="pt-4">
              <div className="flex items-center space-x-4 mb-4">
                <label htmlFor="quantity" className="text-sm font-medium">
                  Quantity:
                </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max={product.stock_quantity}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 border rounded p-2 text-center"
                />
              </div>

              <Button 
                onClick={handleAddToCart} 
                className="w-full py-6 text-lg bg-dbms-primary hover:bg-dbms-secondary"
                disabled={addingToCart || product.stock_quantity === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> 
                {addingToCart ? "Adding..." : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
