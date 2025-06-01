import { Button } from "@/components/ui/button";
import BookingForm from "./BookingForm";

const Hero = () => {
  return (
    <section id="home" className="relative hero-section">
      <div className="overlay absolute inset-0"></div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h1 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl mb-4 animate-fadeIn">
              Turn Your Scrap Into Cash
            </h1>
            <p className="text-lg mb-8 text-gray-200 animate-fadeIn animation-delay-200">
              Kabadiwale provides a convenient way to sell your recyclable waste. Book a pickup, we'll collect, weigh, and pay you instantly.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fadeIn animation-delay-400">
              <a href="#book-pickup">
                <Button size="lg" className="w-full sm:w-auto transition-transform hover:scale-105">Book Scrap Pickup</Button>
              </a>
              <a href="#how-it-works">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white dark:bg-gray-800 text-primary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-transform hover:scale-105">
                  How It Works
                </Button>
              </a>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl" id="book-pickup">
            <h2 className="font-poppins font-semibold text-2xl mb-4 text-gray-800 dark:text-white">Book a Pickup</h2>
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
