import { CheckSquare, CalendarCheck, Wallet, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);
  const stepRefs = [useRef(null), useRef(null), useRef(null)];
  const sectionRef = useRef(null);

  // Auto-cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 3) + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Intersection observer to check if section is visible
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Start the animation when the section is visible
          document.querySelectorAll('.step-item').forEach((el, index) => {
            setTimeout(() => {
              (el as HTMLElement).classList.add('animate-fadeIn');
            }, index * 200);
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleStepClick = (stepNumber: number) => {
    setActiveStep(stepNumber);
  };

  return (
    <section id="how-it-works" ref={sectionRef} className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl mb-3 dark:text-white">How It Works</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Selling your scrap with Kabadiwale is simple and hassle-free. Just follow these easy steps:
          </p>
        </div>
        
        {/* Step Indicators */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <button
                  onClick={() => handleStepClick(step)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${activeStep === step 
                      ? 'bg-primary text-white scale-110' 
                      : 'bg-gray-900 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  aria-label={`Step ${step}`}
                >
                  {step}
                </button>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 transition-all duration-500 ${
                    step < activeStep ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div 
            ref={stepRefs[0]} 
            className={`step-item bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center transition-all duration-300 
              ${activeStep === 1 ? 'ring-2 ring-primary shadow-2xl transform scale-105' : 'opacity-70 hover:opacity-100'}`}
            onClick={() => handleStepClick(1)}
          >
            <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="h-8 w-8" />
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3 dark:text-white">Select Scrap Items</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Choose the types of scrap materials you want to sell. We accept metals, paper, plastic, e-waste, and more.
            </p>
          </div>
          
          {/* Step 2 */}
          <div 
            ref={stepRefs[1]}
            className={`step-item bg-gray-50 block dark:bg-gray-800 p-6 rounded-lg text-center transition-all duration-300 
              ${activeStep === 2 ? 'ring-2 ring-primary shadow-2xl transform scale-105' : 'opacity-70 hover:opacity-100'}`}
            onClick={() => handleStepClick(2)}
          >
            <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarCheck className="h-8 w-8" />
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3 dark:text-white">Schedule Pickup</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Select a convenient date and time slot for our team to visit your location and collect the scrap.
            </p>
          </div>
          
          {/* Step 3 */}
          <div 
            ref={stepRefs[2]}
            className={`step-item bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center transition-all duration-300 
              ${activeStep === 3 ? 'ring-2 ring-primary shadow-2xl transform scale-105' : 'opacity-70 hover:opacity-100'}`}
            onClick={() => handleStepClick(3)}
          >
            <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="h-8 w-8" />
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3 dark:text-white">Get Paid</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our team will weigh your scrap at your doorstep and pay you instantly via UPI, IMPS, or cash.
            </p>
          </div>
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
