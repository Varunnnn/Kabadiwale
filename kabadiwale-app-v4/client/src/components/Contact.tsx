import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { 
  MapPin, Phone, Mail, Clock, 
  Facebook, Instagram, Twitter, Linkedin 
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We will get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-poppins font-bold text-3xl mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6">
              Have questions or need assistance? Reach out to our team for support.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-primary mt-1 mr-3">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Our Office</h3>
                  <p className="text-gray-600">08, Bhairav Nagar, Hatwara Road, Sodala, Jaipur - 3020006 </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-primary mt-1 mr-3">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Phone</h3>
                  <p className="text-gray-600">+91 7984827191,8905075718</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-primary mt-1 mr-3">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p className="text-gray-600">help.kabadiwale@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-primary mt-1 mr-3">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Working Hours</h3>
                  <p className="text-gray-600">Monday to Sunday: 8:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-medium mb-3">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-primary hover:text-primary/80">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-primary hover:text-primary/80">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-primary hover:text-primary/80">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-primary hover:text-primary/80">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div>
            <Card className="bg-gray-50 dark:bg-gray-900 p-6">
              <h3 className="font-poppins font-semibold text-xl mb-4">Send Us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                  <Input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name" 
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                  <Input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email" 
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Phone</label>
                  <Input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number" 
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Message</label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message" 
                    className="h-32" 
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
