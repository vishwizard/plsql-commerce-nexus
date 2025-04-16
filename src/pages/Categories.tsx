
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ProductCard, { ProductData } from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";

const Categories = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<ProductData[]>([]);
  const [category, setCategory] = useState<{ name: string; description: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      setLoading(true);
      try {
        // Fetch category details
        if (id) {
          const { data: categoryData, error: categoryError } = await supabase
            .from("categories")
            .select("*")
            .eq("id", parseInt(id)) // Fix: Convert string to number
            .single();

          if (categoryError) throw categoryError;
          setCategory(categoryData);

          // Fetch products in this category
          const { data: productsData, error: productsError } = await supabase
            .from("products")
            .select(`
              *,
              categories!inner(name)
            `)
            .eq("category_id", parseInt(id)); // Fix: Convert string to number

          if (productsError) throw productsError;
          setProducts(productsData.map(p => ({
            ...p,
            category_name: p.categories.name,
            rating: 4 + Math.random() * 1, // Random rating between 4 and 5
          })));
        } else {
          // Fetch all products if no category ID provided
          const { data, error } = await supabase
            .from("products")
            .select(`
              *,
              categories!inner(name)
            `);

          if (error) throw error;
          setProducts(data.map(p => ({
            ...p,
            category_name: p.categories.name,
            rating: 4 + Math.random() * 1,
          })));
          setCategory({ name: "All Products", description: "Browse all available products" });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndProducts();
  }, [id]);

  const renderProductSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array(8).fill(0).map((_, i) => (
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
    <Layout>
      <div className="container py-8">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-dbms-primary hover:text-dbms-secondary">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Homepage
          </Link>
        </div>
        
        {loading ? (
          <div className="mb-8">
            <Skeleton className="h-10 w-1/3 mb-2" />
            <Skeleton className="h-6 w-1/2" />
          </div>
        ) : (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-dbms-primary">{category?.name}</h1>
            <p className="text-muted-foreground">{category?.description}</p>
          </div>
        )}
        
        {loading ? (
          renderProductSkeletons()
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No products found</h2>
            <p className="text-muted-foreground">
              There are no products available in this category yet.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Categories;
