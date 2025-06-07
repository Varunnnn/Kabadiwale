import { CheckSquare, CalendarCheck, Wallet, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

const steps = [
  {
    id: 1,
    title: "Select Scrap Items",
    description:
      "Choose the types of scrap materials you want to sell. We accept metals, paper, plastic, e-waste, and more.",
    icon: <CheckSquare className="w-8 h-8 text-primary" />,
  },
  {
    id: 2,
    title: "Schedule Pickup",
    description:
      "Select a convenient date and time slot for our team to visit your location and collect the scrap.",
    icon: <CalendarCheck className="w-8 h-8 text-primary" />,
  },
  {
    id: 3,
    title: "Get Paid",
    description:
      "Our team will weigh your scrap at your doorstep and pay you instantly via UPI, IMPS, or cash.",
    icon: <Wallet className="w-8 h-8 text-primary" />,
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);
  const sectionRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % steps.length) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Intersection animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".step-card").forEach((el, index) => {
            setTimeout(() => {
              (el as HTMLElement).classList.add("animate-fadeInUp");
            }, index * 200);
          });
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl mb-3 dark:text-white">
            How It Works
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Selling your scrap with Kabadiwale is simple and hassle-free. Just
            follow these easy steps:
          </p>
        </div>

        {/* Step buttons with lines */}
        <div className="relative flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center relative z-10">
              <button
                onClick={() => setActiveStep(step.id)}
                className={`z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                ${
                  activeStep === step.id
                    ? "bg-primary text-white scale-110 shadow-md"
                    : "bg-gray-300 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-400"
                }`}
              >
                {step.id}
              </button>
              {index < steps.length - 1 && (
                <div className="w-16 h-1 bg-gray-300 dark:bg-gray-700 mx-3 rounded-full"></div>
              )}
            </div>
          ))}
        </div>

        {/* Step Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`step-card p-6 rounded-xl text-center transition-all duration-300 cursor-pointer 
              ${
                activeStep === step.id
                  ? "bg-primary/10 ring-2 ring-primary scale-[1.02] shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 opacity-80 hover:opacity-100"
              }`}
              onClick={() => setActiveStep(step.id)}
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 dark:bg-primary/30">
                {step.icon}
              </div>
              <h3 className="font-semibold text-lg dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#book-pickup">
            <Button size="lg" className="group">
              Book a Pickup Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
