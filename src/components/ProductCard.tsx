
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";

export interface ProductData {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
}

interface ProductCardProps {
  product: ProductData;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  const discountedPrice = product.discount 
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(product.price * (1 - product.discount / 100))
    : null;

  return (
    <Card className="overflow-hidden product-card">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-dbms-primary text-white">New</Badge>
            )}
            {product.isSale && (
              <Badge className="bg-dbms-accent text-black">
                {product.discount}% OFF
              </Badge>
            )}
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold hover:underline truncate">{product.name}</h3>
          </Link>
          <div className="flex items-center gap-2">
            {product.isSale && discountedPrice ? (
              <>
                <p className="font-semibold text-dbms-secondary">{discountedPrice}</p>
                <p className="text-sm text-muted-foreground line-through">{formattedPrice}</p>
              </>
            ) : (
              <p className="font-semibold">{formattedPrice}</p>
            )}
          </div>
          <div className="flex items-center text-yellow-500">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={i < Math.floor(product.rating) ? 0 : 1.5}
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              ))}
            <span className="ml-1 text-xs text-gray-500">
              ({product.rating.toFixed(1)})
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-dbms-primary hover:bg-dbms-secondary">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
