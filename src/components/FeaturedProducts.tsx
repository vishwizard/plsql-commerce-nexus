
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import ProductCard, { ProductData } from "./ProductCard";

// Mock data for product listings
const mockProducts: Record<string, ProductData[]> = {
  featured: [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Electronics",
      rating: 4.5,
      isNew: true
    },
    {
      id: 2,
      name: "Premium Ergonomic Office Chair",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1596079890744-c1a0462d0975?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Home Office",
      rating: 4.8
    },
    {
      id: 3,
      name: "Smart Fitness Tracker",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Electronics",
      rating: 4.3,
      isNew: true
    },
    {
      id: 4,
      name: "Stylish Summer Dress",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Clothing",
      rating: 4.2,
      isSale: true,
      discount: 20
    }
  ],
  newest: [
    {
      id: 5,
      name: "Ultra-Thin Laptop Pro",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Electronics",
      rating: 4.9,
      isNew: true
    },
    {
      id: 6,
      name: "Smart Home Security System",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Smart Home",
      rating: 4.7,
      isNew: true
    },
    {
      id: 7,
      name: "Noise Cancelling Earbuds",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Electronics",
      rating: 4.6,
      isNew: true
    },
    {
      id: 8,
      name: "Premium Leather Wallet",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Accessories",
      rating: 4.4,
      isNew: true
    }
  ],
  sale: [
    {
      id: 9,
      name: "Smart 4K TV - 55 inch",
      price: 699.99,
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Electronics",
      rating: 4.5,
      isSale: true,
      discount: 15
    },
    {
      id: 10,
      name: "Professional Blender",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1621849400072-f554417f7051?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Kitchen",
      rating: 4.3,
      isSale: true,
      discount: 25
    },
    {
      id: 11,
      name: "Casual Athletic Sneakers",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Footwear",
      rating: 4.1,
      isSale: true,
      discount: 30
    },
    {
      id: 12,
      name: "Stainless Steel Water Bottle",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Accessories",
      rating: 4.4,
      isSale: true,
      discount: 10
    }
  ]
};

const FeaturedProducts = () => {
  const [currentTab, setCurrentTab] = useState("featured");

  return (
    <div className="py-12">
      <div className="container">
        <div className="flex flex-col items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-dbms-primary mb-2">Our Products</h2>
          <p className="text-muted-foreground text-center max-w-2xl">
            Explore our curated selection of high-quality products for all your needs.
          </p>
          
          <Tabs defaultValue="featured" value={currentTab} onValueChange={setCurrentTab} className="mt-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="newest">New Arrivals</TabsTrigger>
              <TabsTrigger value="sale">On Sale</TabsTrigger>
            </TabsList>
            
            {Object.keys(mockProducts).map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-6 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {mockProducts[tab].map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
