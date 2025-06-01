import { HomeIcon, Scale, CreditCard, Globe } from "lucide-react";

const Benefits = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-poppins dark:text-white font-bold text-3xl mb-3">Why Choose Kabadiwale?</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We make selling scrap convenient, transparent, and rewarding.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Benefit 1 */}
          <div className="bg-white dark:bg-gray-900 shadow-2xl p-5 rounded-lg shadow-sm">
            <div className="text-primary mb-3">
              <HomeIcon className="h-8 w-8" />
            </div>
            <h3 className="font-poppins dark:text-white font-semibold text-lg mb-2">Doorstep Service</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              We come to your location to collect scrap, saving you time and effort.
            </p>
          </div>
          
          {/* Benefit 2 */}
          <div className="bg-white dark:bg-gray-900 shadow-2xl p-5 rounded-lg shadow-sm">
            <div className="text-primary mb-3">
              <Scale className="h-8 w-8" />
            </div>
            <h3 className="font-poppins dark:text-white font-semibold text-lg mb-2">Transparent Weighing</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              We weigh your scrap in front of you using digital scales for complete transparency.
            </p>
          </div>
          
          {/* Benefit 3 */}
          <div className="bg-white dark:bg-gray-900 shadow-2xl p-5 rounded-lg shadow-sm">
            <div className="text-primary mb-3">
              <CreditCard className="h-8 w-8" />
            </div>
            <h3 className="font-poppins dark:text-white font-semibold text-lg mb-2">Instant Payment</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Get paid immediately after weighing through your preferred payment method.
            </p>
          </div>
          
          {/* Benefit 4 */}
          <div className="bg-white dark:bg-gray-900 shadow-2xl p-5 rounded-lg shadow-sm">
            <div className="text-primary mb-3">
              <Globe className="h-8 w-8" />
            </div>
            <h3 className="font-poppins dark:text-white font-semibold text-lg mb-2">Eco-Friendly</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Help reduce landfill waste and contribute to a cleaner environment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
