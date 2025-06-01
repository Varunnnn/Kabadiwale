import { Link } from "wouter";
import { 
  Recycle, Facebook, Instagram, Twitter, Linkedin,
  MapPin, Phone, Mail, Clock, ArrowUp
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useState, useEffect } from "react";

const Footer = () => {
  const { theme } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="animate-fadeIn">
            <Link href="/">
              <a className="font-poppins font-bold text-xl mb-4 flex items-center">
                <Recycle className="h-6 w-6 mr-2 text-primary" />
                Kabadiwale
              </a>
            </Link>
            <p className="text-gray-400 mb-4">
              Jaipur's leading scrap collection service. We make recycling easy, convenient, and rewarding.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200 transform hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200 transform hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200 transform hover:scale-110">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200 transform hover:scale-110">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="animate-fadeIn animation-delay-200">
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-primary transition-colors duration-200">Home</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-primary transition-colors duration-200">How It Works</a></li>
              <li><a href="#price-list" className="text-gray-400 hover:text-primary transition-colors duration-200">Price List</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-primary transition-colors duration-200">Testimonials</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-primary transition-colors duration-200">Contact Us</a></li>
            </ul>
          </div>
          <div className="animate-fadeIn animation-delay-400">
            <h3 className="font-medium text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">Residential Pickup</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">Commercial Pickup</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">E-Waste Collection</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">Paper Recycling</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">Metal Recycling</a></li>
            </ul>
          </div>
          <div className="animate-fadeIn animation-delay-600">
            <h3 className="font-medium text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center group">
                <MapPin className="h-5 w-5 mr-2 text-gray-400 group-hover:text-primary transition-colors duration-200" />
                <span className="text-gray-400 group-hover:text-white transition-colors duration-200">8, Bhairav Nagar, Hatwara Road, Jaipur Rajasthan 302006</span>
              </li>
              <li className="flex items-center group">
                <Phone className="h-5 w-5 mr-2 text-gray-400 group-hover:text-primary transition-colors duration-200" />
                <span className="text-gray-400 group-hover:text-white transition-colors duration-200">+91 8905075718</span>
              </li>
              <li className="flex items-center group">
                <Mail className="h-5 w-5 mr-2 text-gray-400 group-hover:text-primary transition-colors duration-200" />
                <span className="text-gray-400 group-hover:text-white transition-colors duration-200">Help.kabadiwale@gmail.com</span>
              </li>
              <li className="flex items-center group">
                <Clock className="h-5 w-5 mr-2 text-gray-400 group-hover:text-primary transition-colors duration-200" />
                <span className="text-gray-400 group-hover:text-white transition-colors duration-200">Mon-Sat: 8:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Kabadiwale. All rights reserved.</p>
        </div>
      </div>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
