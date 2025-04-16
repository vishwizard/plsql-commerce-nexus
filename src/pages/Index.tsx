
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySection from "@/components/CategorySection";
import DatabaseSchemaSection from "@/components/DatabaseSchemaSection";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <Separator className="my-12" />
      <DatabaseSchemaSection />
    </Layout>
  );
};

export default Index;
