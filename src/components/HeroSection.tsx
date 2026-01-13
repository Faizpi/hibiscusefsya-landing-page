import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FloatingElement from "./FloatingElement";
import Plasma from "./Plasma";
import defaultHeroImage from "@/assets/hero-hibiscus.jpg";
import { getHeroContent, HeroContent } from "@/lib/api";

// Default content jika API gagal
const defaultContent: HeroContent = {
  badge_text: "🌺 Peluang Kemitraan & Franchise",
  title: "Raih Kesuksesan Bersama Kami",
  subtitle: "Bisnis Terpercaya",
  description: "Hibiscus Efsya membuka kesempatan kemitraan franchise untuk Anda yang ingin memulai bisnis dengan sistem yang sudah teruji dan dukungan penuh dari tim profesional kami.",
  primary_button_text: "Daftar Franchise",
  primary_button_link: "#contact",
  secondary_button_text: "Pelajari Lebih Lanjut",
  secondary_button_link: "#services",
  background_image: "",
  stats: [
    { value: "4+", label: "Unit Bisnis" },
    { value: "50+", label: "Mitra Aktif" },
    { value: "5+", label: "Tahun Pengalaman" },
  ],
};

export const HeroSection = () => {
  const [content, setContent] = useState<HeroContent>(defaultContent);
  const [heroImage, setHeroImage] = useState<string>(defaultHeroImage);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getHeroContent();
      if (data) {
        // Parse stats - handle double escaping
        let stats = defaultContent.stats;
        if (data.stats) {
          try {
            let statsData = data.stats;
            // Handle double-escaped JSON
            while (typeof statsData === 'string') {
              statsData = JSON.parse(statsData);
            }
            stats = Array.isArray(statsData) ? statsData : defaultContent.stats;
          } catch (e) {
            console.warn('Failed to parse stats:', e);
            stats = defaultContent.stats;
          }
        }
        
        const parsedData = {
          ...data,
          stats,
        };
        setContent(parsedData);
        
        // Set hero image from API or use default
        if (data.background_image && data.background_image.trim() !== '') {
          setHeroImage(data.background_image);
        }
      }
    };
    fetchContent();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Plasma Background */}
      <div className="absolute inset-0 opacity-30">
        <Plasma 
          color="#dc2626"
          speed={0.4}
          direction="forward"
          scale={1.2}
          opacity={0.6}
          mouseInteractive={true}
        />
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Floating Decorative Elements */}
      <FloatingElement className="absolute top-20 right-20 opacity-10" duration={8} yOffset={30}>
        <div className="w-32 h-32 border border-primary/20 rounded-full" />
      </FloatingElement>
      <FloatingElement className="absolute bottom-32 left-20 opacity-10" duration={10} yOffset={25} delay={2}>
        <div className="w-24 h-24 border border-foreground/10 rotate-45" />
      </FloatingElement>

      <div className="container mx-auto px-4 md:px-6 py-20 pt-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-block glass-card px-4 py-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm text-muted-foreground">{content.badge_text}</span>
            </motion.div>

            <motion.h1
              className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {content.title.split(' ').slice(0, -2).join(' ')}{" "}
              <span className="gradient-text">{content.title.split(' ').slice(-2).join(' ')}</span>
            </motion.h1>

            <motion.p
              className="text-base md:text-xl text-muted-foreground max-w-xl mb-8 mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {content.description}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <motion.a
                href={content.primary_button_link}
                className="btn-primary-glow text-primary-foreground"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {content.primary_button_text}
              </motion.a>
              <motion.a
                href={content.secondary_button_link}
                className="btn-glass text-foreground"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {content.secondary_button_text}
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-6 md:gap-8 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {content.stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="flex-1 relative w-full max-w-md lg:max-w-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <FloatingElement duration={8} yOffset={15} rotate={3}>
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl opacity-40" />
                <div className="glass-card-red p-2 md:p-3 overflow-hidden">
                  <img
                    src={heroImage}
                    alt="Hibiscus Efsya"
                    className="w-full aspect-video rounded-2xl object-cover"
                  />
                </div>
              </div>
            </FloatingElement>

            {/* Floating Stats Card */}
            <motion.div
              className="absolute -left-2 md:-left-10 bottom-4 md:bottom-10 glass-card p-3 md:p-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <span className="text-lg md:text-xl">🎯</span>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-foreground">99%</div>
                  <div className="text-xs text-muted-foreground">Client Satisfaction</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
