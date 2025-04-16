
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    count: 432,
    path: "/category/electronics"
  },
  {
    id: 2,
    name: "Clothing",
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    count: 256,
    path: "/category/clothing"
  },
  {
    id: 3,
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1584346133934-a3a4db4c8b5c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    count: 189,
    path: "/category/home"
  },
  {
    id: 4,
    name: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    count: 147,
    path: "/category/sports"
  }
];

const CategorySection = () => {
  return (
    <div className="py-12 bg-muted/50">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-dbms-primary mb-2">Shop by Category</h2>
          <p className="text-muted-foreground">
            Browse our wide selection of products across popular categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={category.path}>
              <Card className="overflow-hidden h-full product-card border-0 shadow-md">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-all hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dbms-dark/90 to-transparent flex items-end">
                    <div className="p-6 w-full">
                      <h3 className="text-xl font-semibold text-white mb-1">{category.name}</h3>
                      <p className="text-sm text-white/80">{category.count} products</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <Separator className="my-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 bg-dbms-primary text-white rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="5" rx="2" />
                <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
                <path d="M10 13h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Fast Shipping</h3>
            <p className="text-sm text-muted-foreground">
              Free shipping on orders over $50. Quick delivery within 2-3 business days.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 bg-dbms-primary text-white rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Satisfaction Guaranteed</h3>
            <p className="text-sm text-muted-foreground">
              Not satisfied with your purchase? Return it within 30 days for a full refund.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 bg-dbms-primary text-white rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h16a2 2 0 0 1 1.2.4" />
                <path d="M2 10h20" />
                <path d="M7 15h0" />
                <path d="M11 15h0" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
            <p className="text-sm text-muted-foreground">
              Your payment information is always secure. We use the latest encryption technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
