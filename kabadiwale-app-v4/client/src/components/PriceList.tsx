import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cable, FilesIcon, TicketCheck, Computer, MoreHorizontal } from "lucide-react";

const PriceList = () => {
  return (
    <section id="price-list" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-poppins dark:text-white font-bold text-3xl mb-3">Scrap Rate Card</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We offer competitive rates for all types of scrap materials. Rates may vary based on quality and market conditions.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Metal */}
          <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
            <CardHeader className="bg-primary text-white p-4">
              <div className="flex items-center">
                <Cable className="h-6 w-6 mr-3" />
                <h3 className="font-poppins font-semibold text-xl">Metal</h3>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Iron</span>
                  <span className="font-medium">₹25/kg</span>
                </li>
                <li className="flex justify-between">
                  <span>Aluminum</span>
                  <span className="font-medium">₹100/kg</span>
                </li>
                <li className="flex justify-between">
                  <span>Cable</span>
                  <span className="font-medium">₹400/kg</span>
                </li>
                <li className="flex justify-between">
                  <span>Brass</span>
                  <span className="font-medium">₹300/kg</span>
                </li>
                <li className="flex justify-between">
                  <span>Steel</span>
                  <span className="font-medium">₹35/kg</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Paper */}
          <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
            <CardHeader className="bg-primary text-white p-4">
              <div className="flex items-center">
                <FilesIcon className="h-6 w-6 mr-3" />
                <h3 className="font-poppins font-semibold text-xl">Paper</h3>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Newspaper</span>
                  <span className="font-medium">₹16/kg</span>
                </li>
                <li className="flex justify-between">
                  <span>Books & Magazines</span>
                  <span className="font-medium">₹12/kg</span>
                </li>
                <li className="flex justify-between">
                  <span>Cardboard</span>
                  <span className="font-medium">₹8/kg</span>
                </li>
                <li className="flex justify-between">
                  <span>White Paper</span>
                  <span className="font-medium">₹20/kg</span>
                </li>
                <li className="flex justify-between">
                  <span>Grey Board</span>
                  <span className="font-medium">₹6/kg</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Plastic */}
          <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
            <CardHeader className="bg-primary text-white p-4">
              <div className="flex items-center">
                <TicketCheck className="h-6 w-6 mr-3" />
                <h3 className="font-poppins font-semibold text-xl">Plastic</h3>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Hard Plastic</span>
                  <span className="font-medium">₹15/kg</span>
                </li>
                <li className="flex justify-between">
                  <span>Soft Plastic</span>
                  <span className="font-medium">₹10/kg</span>
                </li>
                <li className="flex justify-between">
                  <span>PET Bottles</span>
                  <span className="font-medium">₹20/kg</span>
                </li>
                <li className="flex justify-between">
                  <span>Milk Packets</span>
                  <span className="font-medium">₹12/kg</span>
                </li>
                <li className="flex justify-between">
                  <span>Mixed Plastic</span>
                  <span className="font-medium">₹8/kg</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
           {/* E-Waste */}
          {/* This is a JSX comment <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
            <CardHeader className="bg-primary text-white p-4">
              <div className="flex items-center">
                <Computer className="h-6 w-6 mr-3" />
                <h3 className="font-poppins font-semibold text-xl">E-Waste</h3>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Computers/Laptops</span>
                  <span className="font-medium">₹40/kg</span>
                </li>
                <li className="flex justify-between">
                  <span>Mobile Phones</span>
                  <span className="font-medium">₹100/kg</span>
                </li>
                <li className="flex justify-between">
                  <span>Wires & Cables</span>
                  <span className="font-medium">₹150/kg</span>
                </li>
                <li className="flex justify-between">
                  <span>Batteries</span>
                  <span className="font-medium">₹60/kg</span>
                </li>
                <li className="flex justify-between">
                  <span>Circuit Boards</span>
                  <span className="font-medium">₹200/kg</span>
                </li>
              </ul>
            </CardContent>
          </Card> */}
          
          {/* Other Items */}
          <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
            <CardHeader className="bg-primary text-white p-4">
              <div className="flex items-center">
                <MoreHorizontal className="h-6 w-6 mr-3" />
                <h3 className="font-poppins font-semibold text-xl">Other Items</h3>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Glass Bottles</span>
                  <span className="font-medium">₹2/kg</span>
                </li>
                <li className="flex justify-between">
                  <span>Tin</span>
                  <span className="font-medium">₹15/kg</span>
                </li>
                <li className="flex justify-between">
                  <span>Beer Bottles</span>
                  <span className="font-medium">₹5/piece</span>
                </li>
                <li className="flex justify-between">
                  <span>Tyre & Rubber</span>
                  <span className="font-medium">₹6/kg</span>
                </li>
                <li className="flex justify-between">
                  <span>AC & Fridge</span>
                  <span className="font-medium">₹45/kg</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Call to action */}
          <Card className="bg-secondary/10 flex flex-col justify-center p-6">
            <h3 className="font-poppins font-semibold text-xl mb-3 text-secondary">Ready to sell your scrap?</h3>
            <p className="text-gray-700 mb-4">Book a pickup now and get the best rates for your recyclable waste.</p>
            <a href="#book-pickup">
              <Button className="w-full bg-secondary hover:bg-secondary/90">
                Book Pickup Now
              </Button>
            </a>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PriceList;
