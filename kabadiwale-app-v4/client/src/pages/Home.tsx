import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import PriceList from "@/components/PriceList";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import DownloadApp from "@/components/DownloadApp";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";



const Home = () => {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Benefits />
      <PriceList />
      <Testimonials />
      <FAQ />
      <DownloadApp />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
