import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rahul Sharma",
      location: "Jaipur",
      rating: 5,
      comment: "Kabadiwale made selling scrap so easy. Their team was punctual, professional, and offered great rates. The UPI payment was instant. Highly recommend!",
      initials: "RS",
    },
    {
      name: "Priya Patel",
      location: "Jaipur",
      rating: 4.5,
      comment: "I had a lot of e-waste and old papers that were taking up space. Kabadiwale picked it all up and paid me a fair price. The process was smooth and hassle-free.",
      initials: "PP",
    },
    {
      name: "Arjun Kumar",
      location: "Jaipur",
      rating: 5,
      comment: "As a business owner, I had a lot of cardboard and packaging waste. Kabadiwale's commercial pickup service is excellent. Their digital weighing system is transparent and trustworthy.",
      initials: "AK",
    },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-yellow-400 text-yellow-400 h-4 w-4" />);
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400 h-4 w-4">
          <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" fill="#FACC15" stroke="#FACC15" />
          <path d="M12 2v15.8l-6.2 3.2 1.2-6.9-5-4.8 7-1L12 2z" fill="none" />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-yellow-400 h-4 w-4" />);
    }

    return stars;
  };

  return (
    <section id="testimonials" className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-poppins dark:text-gray-300 font-bold text-3xl mb-3">What Our Customers Say</h2>
          <p className="text-gray-600 dark:text-white max-w-2xl mx-auto">
            Don't just take our word for it. Here's what people who have used our service have to say.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-xl dark:bg-gray-900 transition-colors duration-300 p-6 shadow-sm">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {renderStars(testimonial.rating)}
                  </div>
                  <span className="ml-2 text-sm dark:text-white text-gray-600">{testimonial.rating.toFixed(1)}</span>
                </div>
                <p className="text-gray-700 dark:text-white mb-4">{testimonial.comment}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-3">
                    <span className="font-medium">{testimonial.initials}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-gray-600 dark:text-white text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
