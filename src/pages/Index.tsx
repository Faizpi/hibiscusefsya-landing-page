import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Set page title and meta
    document.title = "Hibiscus Efsya | Part of M.B.K Indonesia - Solusi Digital Terpercaya";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Hibiscus Efsya - Partner strategis transformasi digital bisnis Anda. Web Development, Mobile App, UI/UX Design, Digital Marketing. Part of M.B.K Indonesia.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Hibiscus Efsya - Partner strategis transformasi digital bisnis Anda. Web Development, Mobile App, UI/UX Design, Digital Marketing. Part of M.B.K Indonesia.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
