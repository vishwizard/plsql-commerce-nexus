
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <div className="relative bg-dbms-dark text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-dbms-dark to-transparent opacity-90"></div>
        <img
          src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2215&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="E-commerce hero background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container relative z-10 py-24 lg:py-32">
        <div className="flex flex-col max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            PL/SQL Commerce Nexus
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in">
            A powerful e-commerce platform showcasing the integration of modern web technologies 
            with PL/SQL database operations for your DBMS project.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-fade-in">
            <Link to="/products">
              <Button size="lg" className="bg-dbms-accent text-black hover:bg-dbms-accent/90">
                Browse Products <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/db-schema">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Database Schema
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-3 gap-4 md:gap-8">
            <div className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <span className="font-bold text-xl md:text-2xl mb-1">10K+</span>
              <span className="text-xs md:text-sm text-center">Products</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <span className="font-bold text-xl md:text-2xl mb-1">5K+</span>
              <span className="text-xs md:text-sm text-center">Happy Customers</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <span className="font-bold text-xl md:text-2xl mb-1">99%</span>
              <span className="text-xs md:text-sm text-center">Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
