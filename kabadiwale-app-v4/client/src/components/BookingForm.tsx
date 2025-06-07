import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useBookingForm } from "@/hooks/use-booking-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Cable, FilesIcon, TicketCheck, Box, Computer, MoreHorizontal, 
  CreditCard, BanknoteIcon 
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface ScrapItem {
  id: string;
  name: string;
  rate: string;
  icon: React.ReactNode;
}

const scrapItems: ScrapItem[] = [
  { id: "metal", name: "Metal", rate: "Up to ₹60/kg", icon: <Cable className="text-secondary h-5 w-5 mr-2" /> },
  { id: "paper", name: "Paper", rate: "Up to ₹11/kg", icon: <FilesIcon className="text-primary h-5 w-5 mr-2" /> },
  { id: "plastic", name: "Plastic", rate: "Up to ₹13/kg", icon: <TicketCheck className="text-secondary h-5 w-5 mr-2" /> },
  {/* id: "milk_packets", name: "Milk Packets", rate: "Up to ₹12/kg", icon: <Box className="text-primary h-5 w-5 mr-2" /> },
  { id: "e_waste", name: "E-Waste", rate: "Up to ₹40/kg", icon: <Computer className="text-secondary h-5 w-5 mr-2" /> */},
  { id: "others", name: "Others", rate: "Various rates", icon: <MoreHorizontal className="text-gray-700 h-5 w-5 mr-2" /> },
];

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<"upi" | "cash" | "">("");
  const { toast } = useToast();
  const { formData, updateFormData } = useBookingForm();

  const bookingMutation = useMutation({
    mutationFn: (bookingData: any) => {
      return apiRequest("POST", "/api/bookings", bookingData);
    },
    onSuccess: () => {
      toast({
        title: "Booking Confirmed!",
        description: "Our team will contact you shortly to confirm the pickup.",
      });
      // Reset form after successful booking
      setCurrentStep(1);
      setSelectedItems([]);
      setSelectedPayment("");
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: `Error: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const toggleScrapItemSelection = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1 && selectedItems.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one scrap item",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 2) {
      if (!formData.address) {
        toast({
          title: "Address Required",
          description: "Please enter your address",
          variant: "destructive",
        });
        return;
      }
      if (!formData.date) {
        toast({
          title: "Date Required",
          description: "Please select a pickup date",
          variant: "destructive",
        });
        return;
      }
      if (!formData.timeSlot) {
        toast({
          title: "Time Slot Required",
          description: "Please select a time slot",
          variant: "destructive",
        });
        return;
      }
    }

    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleConfirmBooking = () => {
    if (!selectedPayment) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method",
        variant: "destructive",
      });
      return;
    }

    const bookingData = {
      items: selectedItems,
      address: formData.address,
      date: formData.date,
      timeSlot: formData.timeSlot,
      paymentMethod: selectedPayment,
    };

    bookingMutation.mutate(bookingData);
  };

  const renderStepIndicator = () => {
    return (
      <div className="stepper mb-8">
        <div className="flex justify-between">
          <div className={`step-item flex flex-col items-center w-1/3 ${currentStep >= 1 ? 'active' : ''}`}>
            <div className="step-count w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-medium">1</div>
            <div className="text-sm mt-2 text-center">Select Items</div>
          </div>
          <div className={`step-item flex flex-col items-center w-1/3 ${currentStep >= 2 ? 'active' : ''}`}>
            <div className="step-count w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-medium">2</div>
            <div className="text-sm mt-2 text-center">Schedule Pickup</div>
          </div>
          <div className={`step-item flex flex-col items-center w-1/3 ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="step-count w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-medium">3</div>
            <div className="text-sm mt-2 text-center">Confirm Details</div>
          </div>
        </div>
      </div>
    );
  };

  const renderStep1 = () => {
    return (
      <div className="step-content">
        <h3 className="font-medium text-lg mb-4">Select Scrap Items</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {scrapItems.map((item) => (
            <div
              key={item.id}
              className={`border ${
                selectedItems.includes(item.id)
                  ? "border-primary bg-primary/10"
                  : "border-gray-200"
              } rounded-lg p-3 cursor-pointer hover:bg-gray-50 hover:border-primary`}
              onClick={() => toggleScrapItemSelection(item.id)}
            >
              <div className="flex items-center">
                {item.icon}
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.rate}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button 
          className="w-full" 
          onClick={handleNextStep}
          disabled={bookingMutation.isPending}
        >
          Continue
        </Button>
      </div>
    );
  };

  const renderStep2 = () => {
    return (
      <div className="step-content">
        <h3 className="font-medium text-lg mb-4">Schedule Pickup</h3>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Address</label>
          <Input
            type="text"
            placeholder="Enter your full address"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Pickup Date</label>
          <Input 
            type="date" 
            value={formData.date}
            onChange={(e) => updateFormData({ date: e.target.value })}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Pickup Time Slot</label>
          <Select 
            value={formData.timeSlot} 
            onValueChange={(value) => updateFormData({ timeSlot: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a time slot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning (8:00 AM - 12:00 PM)</SelectItem>
              <SelectItem value="afternoon">Afternoon (12:00 PM - 4:00 PM)</SelectItem>
              <SelectItem value="evening">Evening (4:00 PM - 8:00 PM)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="w-1/2" 
            onClick={handlePrevStep}
            disabled={bookingMutation.isPending}
          >
            Back
          </Button>
          <Button 
            className="w-1/2" 
            onClick={handleNextStep}
            disabled={bookingMutation.isPending}
          >
            Continue
          </Button>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    const selectedScrapItems = scrapItems.filter(item => 
      selectedItems.includes(item.id)
    );

    const getTimeSlotText = (slot: string) => {
      switch(slot) {
        case "morning": return "Morning (8:00 AM - 12:00 PM)";
        case "afternoon": return "Afternoon (12:00 PM - 4:00 PM)";
        case "evening": return "Evening (4:00 PM - 8:00 PM)";
        default: return "";
      }
    };

    return (
      <div className="step-content">
        <h3 className="font-medium text-lg mb-4">Confirm Details</h3>
        <Card className="bg-gray-50 p-4 mb-4">
          <h4 className="font-medium mb-2">Selected Items</h4>
          <div className="mb-3">
            {selectedScrapItems.map((item, index) => (
              <div key={index} className="flex justify-between text-sm mb-1">
                <span>{item.name}</span>
                <span className="text-primary">{item.rate}</span>
              </div>
            ))}
          </div>
          <h4 className="font-medium mb-2">Pickup Details</h4>
          <div className="text-sm mb-1">
            <div className="mb-1"><span className="text-gray-600">Address:</span> {formData.address}</div>
            <div className="mb-1"><span className="text-gray-600">Date:</span> {formData.date}</div>
            <div><span className="text-gray-600">Time Slot:</span> {getTimeSlotText(formData.timeSlot)}</div>
          </div>
        </Card>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Payment Method</label>
          <div className="grid grid-cols-2 gap-3">
            <div
              className={`border ${
                selectedPayment === "upi"
                  ? "border-primary bg-primary/10"
                  : "border-gray-200"
              } rounded-lg p-3 cursor-pointer hover:bg-gray-50 hover:border-primary`}
              onClick={() => setSelectedPayment("upi")}
            >
              <div className="flex items-center">
                <CreditCard className="text-secondary h-5 w-5 mr-2" />
                <div>UPI/IMPS</div>
              </div>
            </div>
            <div
              className={`border ${
                selectedPayment === "cash"
                  ? "border-primary bg-primary/10"
                  : "border-gray-200"
              } rounded-lg p-3 cursor-pointer hover:bg-gray-50 hover:border-primary`}
              onClick={() => setSelectedPayment("cash")}
            >
              <div className="flex items-center">
                <BanknoteIcon className="text-primary h-5 w-5 mr-2" />
                <div>Cash</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="w-1/2" 
            onClick={handlePrevStep}
            disabled={bookingMutation.isPending}
          >
            Back
          </Button>
          <Button 
            className="w-1/2" 
            onClick={handleConfirmBooking}
            disabled={bookingMutation.isPending}
          >
            {bookingMutation.isPending ? "Processing..." : "Confirm Booking"}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="booking-form">
      {renderStepIndicator()}
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
    </div>
  );
};

export default BookingForm;
