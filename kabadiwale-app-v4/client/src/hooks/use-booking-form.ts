import { useState } from "react";

interface FormData {
  address: string;
  date: string;
  timeSlot: string;
}

export function useBookingForm() {
  const [formData, setFormData] = useState<FormData>({
    address: "",
    date: "",
    timeSlot: "",
  });

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const resetFormData = () => {
    setFormData({
      address: "",
      date: "",
      timeSlot: "",
    });
  };

  return {
    formData,
    updateFormData,
    resetFormData,
  };
}
