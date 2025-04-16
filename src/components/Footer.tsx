
import { Link } from "react-router-dom";
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dbms-primary text-white pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">PL/SQL Commerce</h3>
            <p className="text-sm text-gray-300 mb-4">
              An e-commerce platform demonstrating PL/SQL database integration for academic projects.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </Link>
              <Link to="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </Link>
              <Link to="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </Link>
              <Link to="#" className="text-gray-300 hover:text-white">
                <Github size={20} />
              </Link>
              <Link to="#" className="text-gray-300 hover:text-white">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/products" className="hover:text-white">All Products</Link></li>
              <li><Link to="/category/electronics" className="hover:text-white">Electronics</Link></li>
              <li><Link to="/category/clothing" className="hover:text-white">Clothing</Link></li>
              <li><Link to="/category/home" className="hover:text-white">Home Goods</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-white">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-white">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-white">Returns & Exchanges</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Developer Info</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/db-schema" className="hover:text-white">Database Schema</Link></li>
              <li><Link to="/plsql-examples" className="hover:text-white">PL/SQL Examples</Link></li>
              <li><Link to="/api-docs" className="hover:text-white">API Documentation</Link></li>
              <li><Link to="/tech-stack" className="hover:text-white">Tech Stack</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-6 text-sm text-gray-300">
          <p>© {new Date().getFullYear()} PL/SQL Commerce Nexus. Created for educational purposes.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
