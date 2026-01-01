import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import Stack from "./Stack";

import bodycareImg from "@/assets/service-bodycare.jpg";
import travelImg from "@/assets/service-travel.jpg";
import fashionImg from "@/assets/service-fashion.jpg";
import akuntansiImg from "@/assets/service-akuntansi.jpg";

interface ServiceData {
  id: number;
  title: string;
  description: string;
  image: string;
  fullDescription: string;
  link?: string;
  comingSoon?: boolean;
}

const services: ServiceData[] = [
  {
    id: 1,
    title: "Body Care",
    description: "Perawatan tubuh profesional",
    image: bodycareImg,
    fullDescription:
      "Nikmati pengalaman perawatan tubuh yang menyegarkan dengan produk dan layanan berkualitas tinggi. Kami menawarkan berbagai treatment spa, massage therapy, dan skincare yang disesuaikan dengan kebutuhan kulit Anda untuk hasil yang maksimal.",
    link: "https://bodycare.hibiscusefsya.com",
  },
  {
    id: 2,
    title: "Travel",
    description: "Paket wisata eksklusif",
    image: travelImg,
    fullDescription:
      "Jelajahi destinasi impian Anda bersama kami. Dari wisata domestik hingga internasional, kami menyediakan paket perjalanan yang terencana dengan baik, akomodasi premium, dan pengalaman tak terlupakan untuk liburan Anda.",
    comingSoon: true,
  },
  {
    id: 3,
    title: "Fashion",
    description: "Koleksi busana terkini",
    image: fashionImg,
    fullDescription:
      "Tampil stylish dengan koleksi fashion terbaru kami. Dari casual hingga formal, kami menghadirkan busana berkualitas dengan desain modern yang sesuai dengan tren terkini dan gaya personal Anda.",
    comingSoon: true,
  },
  {
    id: 4,
    title: "Akuntansi",
    description: "Layanan pembukuan bisnis",
    image: akuntansiImg,
    fullDescription:
      "Kelola keuangan bisnis Anda dengan lebih baik. Tim akuntan profesional kami siap membantu pembukuan, laporan keuangan, perpajakan, dan konsultasi finansial untuk mendukung pertumbuhan usaha Anda.",
    link: "https://akuntansi.hibiscusefsya.com",
  },
];

export const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];

  const serviceCards = services.map((service, i) => (
    <div key={i} className="relative w-full h-full">
      <img
        src={service.image}
        alt={service.title}
        className="w-full h-full object-cover"
      />
      {service.comingSoon && (
        <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
          Coming Soon
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <h4 className="text-white font-semibold text-lg">{service.title}</h4>
        <p className="text-white/80 text-sm">{service.description}</p>
      </div>
    </div>
  ));

  return (
    <section id="services" className="relative py-24 overflow-hidden bg-secondary/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Unit Bisnis</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-6 text-foreground">
            Peluang <span className="gradient-text">Kemitraan</span> Franchise
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Bergabunglah dengan jaringan bisnis kami dan raih kesuksesan bersama Hibiscus Efsya
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-5xl mx-auto">
            {/* Stack Cards */}
            <div className="w-72 h-80 flex-shrink-0">
              <Stack
                randomRotation={true}
                sensitivity={180}
                sendToBackOnClick={true}
                autoplay={true}
                autoplayDelay={4000}
                pauseOnHover={true}
                cards={serviceCards}
                onCardChange={(index) => setActiveIndex(index)}
              />
            </div>

            {/* Description Panel */}
            <div className="flex-1 max-w-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="glass-card p-8"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-primary">
                      <span className="text-primary-foreground font-bold text-lg">
                        {activeService.title.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{activeService.title}</h3>
                      <p className="text-sm text-muted-foreground">{activeService.description}</p>
                    </div>
                  </div>
                  <p className="text-foreground/80 leading-relaxed mb-4">
                    {activeService.fullDescription}
                  </p>
                  
                  {/* Action Button */}
                  {activeService.comingSoon ? (
                    <div className="inline-flex items-center gap-2 bg-muted text-muted-foreground px-4 py-2 rounded-full text-sm font-medium">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                      Coming Soon
                    </div>
                  ) : activeService.link ? (
                    <motion.a
                      href={activeService.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Kunjungi Layanan
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.a>
                  ) : null}
                  
                  {/* Progress Indicators */}
                  <div className="flex gap-2 mt-6 pt-6 border-t border-border">
                    {services.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === activeIndex 
                            ? "w-8 bg-primary" 
                            : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Instruction */}
              <p className="text-center text-sm text-muted-foreground mt-4">
                Geser atau klik kartu untuk melihat layanan lainnya
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ServicesSection;