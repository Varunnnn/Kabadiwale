import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useBookingForm } from "@/hooks/use-booking-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  Cable, FilesIcon, TicketCheck, MoreHorizontal,
  CreditCard, BanknoteIcon
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  { id: "others", name: "Others", rate: "Various rates", icon: <MoreHorizontal className="text-gray-700 h-5 w-5 mr-2" /> }
];

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<"upi" | "cash" | "">("");
  const { toast } = useToast();
  const { formData, updateFormData } = useBookingForm();

  const bookingMutation = useMutation({
    mutationFn: (bookingData: any) => apiRequest("POST", "/api/bookings", bookingData),
    onSuccess: () => {
      toast({
        title: "Booking Confirmed!",
        description: "Our team will contact you shortly to confirm the pickup.",
      });
      setCurrentStep(1);
      setSelectedItems([]);
      setSelectedPayment("");
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: `Error: ${error.message || "Something went wrong."}`,
        variant: "destructive",
      });
    },
  });

  const toggleScrapItemSelection = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
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
      if (!formData.address || !formData.date || !formData.timeSlot) {
        toast({
          title: "Incomplete Details",
          description: "Please fill out address, date, and time slot",
          variant: "destructive",
        });
        return;
      }
    }

    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
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

  const getTimeSlotText = (slot: string) => {
    switch (slot) {
      case "morning": return "Morning (8:00 AM - 12:00 PM)";
      case "afternoon": return "Afternoon (12:00 PM - 4:00 PM)";
      case "evening": return "Evening (4:00 PM - 8:00 PM)";
      default: return "";
    }
  };

  // --- Updated step indicator with lines between steps ---
  const renderStepIndicator = () => (
    <div className="relative mb-8">
      {/* Background line */}
      <div className="absolute top-5 left-5 right-5 h-1 bg-gray-300 dark:bg-gray-700"></div>

      {/* Progress line */}
      <div
        className="absolute top-5 left-5 h-1 bg-primary dark:bg-primary transition-all duration-300"
        style={{
          width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%",
        }}
      ></div>

      <div className="flex justify-between relative z-10">
        {[1, 2, 3].map((step) => {
          const isActive = currentStep >= step;
          return (
            <div key={step} className="flex flex-col items-center w-1/3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium
                ${isActive ? "bg-primary text-white" : "bg-gray-200 text-gray-600"}`}
              >
                {step}
              </div>
              <div className="text-sm mt-2 text-center">
                {step === 1 ? "Select Items" : step === 2 ? "Schedule Pickup" : "Confirm Details"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div>
      <h3 className="font-medium text-lg mb-4">Select Scrap Items</h3>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {scrapItems.map((item) => (
          <div
            key={item.id}
            className={`border rounded-lg p-3 cursor-pointer ${
              selectedItems.includes(item.id) ? "border-primary bg-primary/10" : "border-gray-200"
            }`}
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
      <Button className="w-full" onClick={handleNextStep} disabled={bookingMutation.isPending}>
        Continue
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h3 className="font-medium text-lg mb-4">Schedule Pickup</h3>
      <div className="mb-4">
        <label className="block dark:text-white text-gray-700 text-sm font-medium mb-2">Address</label>
        <Input
          type="text"
          placeholder="Enter your full address"
          value={formData.address}
          onChange={(e) => updateFormData({ address: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block dark:text-white text-gray-700 text-sm font-medium mb-2">Pickup Date</label>
        <DatePicker
          selected={formData.date ? new Date(formData.date) : null}
          onChange={(date: Date) => updateFormData({ date: date.toISOString().split("T")[0] })}
          minDate={new Date()}
          placeholderText="Select a date"
          className="w-full px-4 py-2 border border-gray-300 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none"
          calendarClassName="!z-50"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-white text-sm font-medium mb-2">Pickup Time Slot</label>
        <Select value={formData.timeSlot} onValueChange={(value) => updateFormData({ timeSlot: value })}>
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
        <Button variant="outline" className="w-1/2" onClick={handlePrevStep} disabled={bookingMutation.isPending}>Back</Button>
        <Button className="w-1/2" onClick={handleNextStep} disabled={bookingMutation.isPending}>Continue</Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <h3 className="font-medium text-lg mb-4">Confirm Details</h3>
      <Card className="bg-gray-50 p-4 mb-4 dark:bg-gray-900">
        <h4 className="font-medium mb-2">Selected Items</h4>
        <div className="mb-3">
          {scrapItems.filter(i => selectedItems.includes(i.id)).map((item, i) => (
            <div key={i} className="flex justify-between text-sm mb-1">
              <span>{item.name}</span>
              <span className="text-primary">{item.rate}</span>
            </div>
          ))}
        </div>
        <h4 className="font-medium mb-2">Pickup Details</h4>
        <div className="text-sm">
          <div className="mb-1"><span className="text-gray-600">Address:</span> {formData.address}</div>
          <div className="mb-1"><span className="text-gray-600">Date:</span> {formData.date}</div>
          <div><span className="text-gray-600">Time Slot:</span> {getTimeSlotText(formData.timeSlot)}</div>
        </div>
      </Card>
      <div className="mb-4">
        <label className="block text-white text-sm font-medium mb-2">Payment Method</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "upi", label: "UPI/IMPS", icon: <CreditCard className="text-secondary h-5 w-5 mr-2" /> },
            { value: "cash", label: "Cash", icon: <BanknoteIcon className="text-primary h-5 w-5 mr-2" /> }
          ].map(option => (
            <div
              key={option.value}
              className={`border rounded-lg p-3 cursor-pointer ${
                selectedPayment === option.value ? "border-primary bg-primary/10" : "border-gray-200"
              }`}
              onClick={() => setSelectedPayment(option.value as "upi" | "cash")}
            >
              <div className="flex items-center">{option.icon}<div>{option.label}</div></div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex space-x-3">
        <Button variant="outline" className="w-1/2" onClick={handlePrevStep} disabled={bookingMutation.isPending}>Back</Button>
        <Button className="w-1/2" onClick={handleConfirmBooking} disabled={bookingMutation.isPending}>
          {bookingMutation.isPending ? "Processing..." : "Confirm Booking"}
        </Button>
      </div>
    </div>
  );

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
