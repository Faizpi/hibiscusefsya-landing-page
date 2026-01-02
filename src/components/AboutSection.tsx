import { useState, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import FloatingElement from "./FloatingElement";
import { motion } from "framer-motion";
import { getAboutContent, AboutContent } from "@/lib/api";

// Default content jika API gagal
const defaultFeatures = [
  {
    icon: "💡",
    title: "Sistem Teruji",
    description: "Model bisnis yang sudah terbukti sukses dan siap direplikasi",
  },
  {
    icon: "🤝",
    title: "Dukungan Penuh",
    description: "Tim support yang siap membantu mitra dalam setiap tahap",
  },
  {
    icon: "⚡",
    title: "Proses Cepat",
    description: "Pendaftaran dan setup bisnis yang efisien",
  },
  {
    icon: "🛡️",
    title: "Brand Terpercaya",
    description: "Reputasi dan kualitas yang sudah diakui",
  },
];

const defaultContent: AboutContent = {
  section_title: "Tentang Kami",
  section_subtitle: "Hibiscus Efsya",
  heading: "Mengapa Bermitra dengan Hibiscus Efsya?",
  description: "Hibiscus Efsya adalah korporasi bisnis yang membuka kesempatan kemitraan untuk berbagai unit bisnis kami. Bergabunglah dengan jaringan bisnis yang sudah teruji dan raih kesuksesan bersama kami.",
  features: defaultFeatures,
  stats: [
    { value: "5+", label: "Tahun" },
    { value: "4", label: "Unit Bisnis" },
    { value: "50+", label: "Mitra" },
  ],
  image: "",
};

// Icon mapping dari string ke emoji
const iconMap: Record<string, string> = {
  Shield: "🛡️",
  Users: "🤝",
  Zap: "⚡",
  Award: "🏆",
  Star: "⭐",
  Heart: "❤️",
  Lightbulb: "💡",
};

export const AboutSection = () => {
  const [content, setContent] = useState<AboutContent>(defaultContent);
  const [features, setFeatures] = useState(defaultFeatures);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getAboutContent();
      if (data) {
        // Parse features dan stats jika string
        const parsedFeatures = typeof data.features === 'string' ? JSON.parse(data.features) : data.features;
        const parsedStats = typeof data.stats === 'string' ? JSON.parse(data.stats) : data.stats;
        
        setContent({
          ...data,
          features: parsedFeatures || defaultFeatures,
          stats: parsedStats || defaultContent.stats,
        });
        
        if (parsedFeatures && parsedFeatures.length > 0) {
          setFeatures(parsedFeatures.map((f: { icon: string; title: string; description: string }) => ({
            ...f,
            icon: iconMap[f.icon] || f.icon || "💡",
          })));
        }
      }
    };
    fetchContent();
  }, []);

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex-1">
            <ScrollReveal direction="left">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">{content.section_title}</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-6 text-foreground">
                {content.heading.split(' ').slice(0, -2).join(' ')}{" "}
                <span className="gradient-text">{content.heading.split(' ').slice(-2).join(' ')}</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {content.description}
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <ScrollReveal key={index} delay={index * 0.1} direction="up">
                  <motion.div
                    className="glass-card p-5 group cursor-pointer"
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex-1 relative">
            <ScrollReveal direction="right">
              <FloatingElement duration={10} yOffset={20}>
                <div className="relative">
                  {/* Decorative circles */}
                  <div className="absolute -inset-8 border-2 border-primary/10 rounded-full animate-spin-slow" />
                  <div className="absolute -inset-16 border border-foreground/5 rounded-full animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
                  
                  {/* Main glass card */}
                  <div className="glass-card-red p-8 relative z-10">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-primary">
                        <span className="text-5xl">🌺</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 gradient-text">Hibiscus Efsya</h3>
                      <p className="text-muted-foreground">Korporasi Bisnis Indonesia</p>
                      
                      <div className="mt-6 pt-6 border-t border-border">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          {content.stats.slice(0, 3).map((stat, index) => (
                            <div key={index}>
                              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                              <div className="text-xs text-muted-foreground">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FloatingElement>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;