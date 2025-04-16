
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import ProductCard from "./ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export interface ProductData {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category_id: number;
  category_name?: string;
  rating?: number;
  is_featured?: boolean;
  stock_quantity: number;
}

const FeaturedProducts = () => {
  const [currentTab, setCurrentTab] = useState("featured");
  const [products, setProducts] = useState<Record<string, ProductData[]>>({
    featured: [],
    newest: [],
    sale: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        // Fetch featured products
        const { data: featuredProducts, error: featuredError } = await supabase
          .from("products")
          .select(`
            *,
            categories!inner(name)
          `)
          .eq("is_featured", true)
          .limit(4);

        if (featuredError) throw featuredError;

        // Fetch newest products (ordered by created_at)
        const { data: newestProducts, error: newestError } = await supabase
          .from("products")
          .select(`
            *,
            categories!inner(name)
          `)
          .order("created_at", { ascending: false })
          .limit(4);

        if (newestError) throw newestError;

        // Fetch sale products (just using some products for demo)
        const { data: saleProducts, error: saleError } = await supabase
          .from("products")
          .select(`
            *,
            categories!inner(name)
          `)
          .limit(4)
          .offset(4);  // Just to get different products

        if (saleError) throw saleError;

        setProducts({
          featured: featuredProducts.map(p => ({
            ...p,
            category_name: p.categories.name,
            rating: 4 + Math.random() * 1, // Random rating between 4 and 5
          })),
          newest: newestProducts.map(p => ({
            ...p,
            category_name: p.categories.name,
            rating: 4 + Math.random() * 1,
            isNew: true
          })),
          sale: saleProducts.map(p => ({
            ...p,
            category_name: p.categories.name,
            rating: 4 + Math.random() * 1,
            isSale: true,
            discount: Math.floor(Math.random() * 20) + 10 // Random discount between 10% and 30%
          }))
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderProductSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array(4).fill(0).map((_, i) => (
        <div key={i} className="border rounded-lg overflow-hidden">
          <Skeleton className="h-[240px] w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="py-12">
      <div className="container">
        <div className="flex flex-col items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-dbms-primary mb-2">Our Products</h2>
          <p className="text-muted-foreground text-center max-w-2xl">
            Explore our curated selection of high-quality products for all your needs.
          </p>
          
          <Tabs defaultValue="featured" value={currentTab} onValueChange={setCurrentTab} className="mt-6 w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="newest">New Arrivals</TabsTrigger>
              <TabsTrigger value="sale">On Sale</TabsTrigger>
            </TabsList>
            
            {Object.keys(products).map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-6 w-full">
                {loading ? (
                  renderProductSkeletons()
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products[tab].map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
