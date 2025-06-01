import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I book a scrap pickup?",
      answer: "You can book a scrap pickup by filling out the form on our website or mobile app. Select the types of scrap you have, choose a convenient date and time slot, and confirm your address details. Our team will arrive at your location during the selected time slot."
    },
    {
      question: "What types of scrap do you accept?",
      answer: "We accept a wide range of scrap materials including metals (iron, aluminum, copper, brass, etc.), paper (newspaper, books, cardboard), plastic, e-waste (computers, phones, cables), and other items like glass bottles, tires, and rubber."
    },
    {
      question: "How is the payment calculated?",
      answer: "The payment is calculated based on the weight and type of scrap materials. Our team will weigh your scrap using digital scales at your doorstep and calculate the amount based on our current rate card. The rates may vary depending on market conditions and the quality of the materials."
    },
    {
      question: "What payment methods do you offer?",
      answer: "We offer multiple payment options for your convenience. You can choose to receive payment via UPI, IMPS, or cash. The payment is made instantly after weighing your scrap materials."
    },
    {
      question: "Is there a minimum quantity requirement for pickup?",
      answer: "Yes, we have a minimum quantity requirement of 5 kg for a pickup. However, if you have mixed scrap types, the combined weight should be at least 5 kg. For certain high-value items like copper or brass, lower quantities may be accepted."
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-poppins dark:text-white font-bold text-3xl mb-3">Frequently Asked Questions</h2>
          <p className="text-gray-600 dark:text-white max-w-2xl mx-auto">
            Find answers to commonly asked questions about our scrap collection service.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`}
                className="border border-gray-200 rounded-lg px-4"
              >
                <AccordionTrigger className="font-medium text-left py-3">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
