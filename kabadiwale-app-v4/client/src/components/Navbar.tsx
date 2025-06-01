import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Recycle, Sun, Moon, Laptop, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, navigate] = useLocation(); // useLocation gives a navigate function in wouter
  const { theme, setTheme } = useTheme();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      localStorage.removeItem('auth');
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const NavbarBrand = () => (
    <div className="text-primary font-poppins font-bold text-xl md:text-2xl flex items-center">
      <Recycle className="mr-2 h-6 w-6 md:h-7 md:w-7" />
      Kabadiwale
    </div>
  );

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <NavbarBrand />
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8 font-medium">
            <a href="#home" className="text-primary hover:text-primary/80 dark:text-white dark:hover:text-primary">Home</a>
            <a href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">How It Works</a>
            <a href="#price-list" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Price List</a>
            <a href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Testimonials</a>
            <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Contact</a>
          </nav>
          <div className="flex items-center space-x-4">
            {/* Theme toggle buttons */}
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
              <button
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded-full ${
                  theme === 'light'
                    ? 'bg-white text-yellow-500 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-yellow-500'
                }`}
                title="Light mode"
              >
                <Sun className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTheme('system')}
                className={`p-1.5 rounded-full ${
                  theme === 'system'
                    ? 'bg-white dark:bg-gray-700 text-primary dark:text-blue-400 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-blue-400'
                }`}
                title="System theme"
              >
                <Laptop className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-full ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-blue-400 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-blue-400'
                }`}
                title="Dark mode"
              >
                <Moon className="h-4 w-4" />
              </button>
            </div>

            <a href="#book-pickup">
              <Button className="hidden md:block">Book Pickup</Button>
            </a>

            {/* Logout Button - Desktop */}
            <Button 
              variant="outline" 
              className="hidden md:flex items-center gap-1"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>

            <button 
              className="md:hidden text-gray-700 dark:text-white" 
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 py-2">
          <nav className="flex flex-col space-y-3 font-medium">
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How It Works</a>
            <a href="#price-list" onClick={() => setIsMobileMenuOpen(false)}>Price List</a>
            <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            <a href="#book-pickup" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full">Book Pickup</Button>
            </a>
            {/* Logout Button - Mobile */}
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
