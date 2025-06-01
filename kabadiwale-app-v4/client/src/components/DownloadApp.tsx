import { Button } from "@/components/ui/button";
import { Play, Apple } from "lucide-react";

const DownloadApp = () => {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-poppins font-bold text-3xl mb-4">Download Our App</h2>
            <p className="mb-6">
              Get the Kabadiwale app for a seamless experience. Book pickups, track your scrap sales, and get paid instantly, all from your smartphone.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button variant="outline" className="bg-black hover:bg-gray-900 text-white py-3 px-6 flex items-center justify-center border-black">
                <Play className="h-6 w-6 mr-2 fill-white" />
                <div>
                  <div className="text-xs">GET IT ON</div>
                  <div className="font-medium">Google Play</div>
                </div>
              </Button>
              <Button variant="outline" className="bg-black hover:bg-gray-900 text-white py-3 px-6 flex items-center justify-center border-black">
                <Apple className="h-6 w-6 mr-2" />
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="font-medium">App Store</div>
                </div>
              </Button>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            {/* A mockup of a mobile app showing the scrap booking interface */}
            <div className="w-64 h-96 bg-white rounded-3xl shadow-xl overflow-hidden relative">
              <div className="h-8 bg-gray-200 flex items-center justify-center">
                <div className="w-20 h-4 bg-gray-300 rounded-full"></div>
              </div>
              <div className="p-3">
                <div className="bg-primary/90 text-white p-2 rounded-lg text-center text-sm font-medium mb-3">
                  Kabadiwale App
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Select Scrap Type</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white p-1 rounded border border-gray-200 text-xs text-center">Metal</div>
                      <div className="bg-white p-1 rounded border border-gray-200 text-xs text-center">Paper</div>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Schedule Pickup</div>
                    <div className="bg-white p-1 rounded border border-gray-200 text-xs text-center">
                      May 25, 2023 - Morning
                    </div>
                  </div>
                  <div className="bg-primary p-2 rounded-lg text-white text-xs text-center">
                    Confirm Booking
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
