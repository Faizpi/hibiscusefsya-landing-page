import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import Stack from "./Stack";
import { ExternalLink, Clock, Sparkles, Plane, Shirt, Laptop } from "lucide-react";
import { getServices } from "@/lib/api";

import bodycareImg from "@/assets/service-bodycare.jpg";
import fashionImg from "@/assets/service-fashion.jpg";
import travelImg from "@/assets/service-travel.jpg";
import techImg from "@/assets/service-akuntansi.jpg";

interface SubService {
  name: string;
  description: string;
  image: string;
  link?: string;
  comingSoon?: boolean;
}

interface CategoryData {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  services: SubService[];
}

const defaultCategories: CategoryData[] = [
  {
    id: 1,
    title: "Body Care",
    description: "Produk perawatan tubuh berkualitas tinggi untuk kesehatan dan kecantikan kulit Anda",
    icon: <Sparkles className="w-5 h-5" />,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    services: [
      {
        name: "MBK Body Care",
        description: "Rangkaian produk perawatan tubuh: Bedak Biang Keringat, Body Lotion, Body Mist, Deodorant Roll On, dan P.O. Powder",
        image: bodycareImg,
        link: "https://bodycare.hibiscusefsya.com"
      },
      {
        name: "Herbal Beauty",
        description: "Produk kecantikan berbahan herbal alami",
        image: bodycareImg,
        comingSoon: true
      },
      {
        name: "Aromatherapy",
        description: "Essential oil dan produk aromaterapi untuk relaksasi",
        image: bodycareImg,
        comingSoon: true
      },
      {
        name: "Spa Products",
        description: "Perlengkapan spa profesional untuk perawatan tubuh",
        image: bodycareImg,
        comingSoon: true
      },
    ],
  },
  {
    id: 2,
    title: "Fashion",
    description: "Koleksi busana modern dengan desain trendy untuk tampil stylish setiap hari",
    icon: <Shirt className="w-5 h-5" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    services: [
      {
        name: "Casual Wear",
        description: "Koleksi pakaian kasual untuk aktivitas sehari-hari",
        image: fashionImg,
        comingSoon: true
      },
      {
        name: "Hijab Collection",
        description: "Koleksi hijab trendy dengan berbagai model dan warna",
        image: fashionImg,
        comingSoon: true
      },
      {
        name: "Accessories",
        description: "Aksesoris fashion untuk melengkapi penampilan",
        image: fashionImg,
        comingSoon: true
      },
      {
        name: "Footwear",
        description: "Koleksi sepatu dan sandal berkualitas",
        image: fashionImg,
        comingSoon: true
      },
    ],
  },
  {
    id: 3,
    title: "Travel",
    description: "Paket wisata domestik dan internasional dengan pengalaman perjalanan terbaik",
    icon: <Plane className="w-5 h-5" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    services: [
      {
        name: "Domestic Tour",
        description: "Paket wisata domestik ke destinasi populer Indonesia",
        image: travelImg,
        comingSoon: true
      },
      {
        name: "International Tour",
        description: "Paket wisata ke luar negeri dengan guide profesional",
        image: travelImg,
        comingSoon: true
      },
      {
        name: "Umrah & Haji",
        description: "Paket ibadah umrah dan haji dengan layanan premium",
        image: travelImg,
        comingSoon: true
      },
      {
        name: "Corporate Travel",
        description: "Layanan perjalanan bisnis untuk perusahaan",
        image: travelImg,
        comingSoon: true
      },
    ],
  },
  {
    id: 4,
    title: "Technology",
    description: "Solusi digital dan teknologi untuk mendukung pertumbuhan bisnis Anda",
    icon: <Laptop className="w-5 h-5" />,
    color: "text-green-600",
    bgColor: "bg-green-50",
    services: [
      {
        name: "Website Branding",
        description: "Pembuatan website profesional untuk branding bisnis",
        image: techImg,
        link: "https://tech.hibiscusefsya.com"
      },
      {
        name: "Akuntansi Online",
        description: "Sistem pembukuan dan akuntansi berbasis cloud",
        image: techImg,
        link: "https://akuntansi.hibiscusefsya.com"
      },
      {
        name: "Online Shop",
        description: "Platform e-commerce untuk jualan online",
        image: techImg,
        link: "https://shop.hibiscusefsya.com"
      },
      {
        name: "Sistem POS",
        description: "Point of Sale system untuk retail dan F&B",
        image: techImg,
        link: "https://pos.hibiscusefsya.com"
      },
    ],
  },
];

// Image mapping based on category
const categoryImages: Record<string, string> = {
  'Body Care': bodycareImg,
  'Fashion': fashionImg,
  'Travel': travelImg,
  'Technology': techImg,
};

// Icon mapping
const categoryIcons: Record<string, React.ReactNode> = {
  'Sparkles': <Sparkles className="w-5 h-5" />,
  'Shirt': <Shirt className="w-5 h-5" />,
  'Plane': <Plane className="w-5 h-5" />,
  'Calculator': <Laptop className="w-5 h-5" />,
  'Laptop': <Laptop className="w-5 h-5" />,
};

// Service Card Component - untuk digunakan di dalam Stack
const ServiceCard = ({ service }: { service: SubService }) => (
  <div
    className="w-full h-full rounded-3xl overflow-hidden bg-background/40 border border-border/50 shadow-xl"
    style={{
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    }}
  >
    <div className="flex flex-col md:flex-row h-full">
      {/* Image Section with Bezel */}
      <div className="relative md:w-2/5 lg:w-1/2 flex-shrink-0 p-3 md:p-4">
        <div className="relative h-48 md:h-full w-full overflow-hidden rounded-2xl bg-muted/50">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
          />

          {/* Coming Soon Badge */}
          {service.comingSoon && (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Coming Soon
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-5 md:p-6 md:pl-2 flex flex-col justify-center">
        {/* Service Name */}
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          {service.name}
        </h3>

        {/* Description */}
        <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
          {service.description}
        </p>

        {/* Status/Action */}
        {service.comingSoon ? (
          <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
            Segera Hadir
          </div>
        ) : service.link ? (
          <a
            href={service.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-semibold text-sm w-fit hover:bg-primary/85 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            Kunjungi Layanan
            <ExternalLink className="w-4 h-4" />
          </a>
        ) : null}
      </div>
    </div>
  </div>
);

export const ServicesSection = () => {
  const [categories, setCategories] = useState<CategoryData[]>(defaultCategories);
  const [activeCategory, setActiveCategory] = useState(0);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      const data = await getServices();
      if (data && data.length > 0) {
        // Transform API data to component format
        const transformed: CategoryData[] = data.map((cat, idx) => ({
          id: cat.id || idx + 1,
          title: cat.title,
          description: `Layanan ${cat.title} dari Hibiscus Efsya`,
          icon: categoryIcons[cat.icon] || <Sparkles className="w-5 h-5" />,
          color: cat.color || 'text-pink-600',
          bgColor: cat.bg_color || 'bg-pink-50',
          services: cat.services.map(svc => ({
            name: svc.name,
            description: svc.description,
            image: svc.image || categoryImages[cat.title] || bodycareImg,
            link: svc.link || undefined,
            comingSoon: svc.is_coming_soon,
          })),
        }));
        setCategories(transformed);
      }
    };
    fetchData();
  }, []);

  const active = categories[activeCategory];

  // Create full service cards for Stack
  const serviceCards = active.services.map((service, i) => (
    <ServiceCard key={i} service={service} />
  ));

  // Reset when category changes
  const handleCategoryChange = (index: number) => {
    setActiveCategory(index);
  };

  return (
    <section id="services" className="relative py-24 overflow-hidden bg-secondary/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Unit Bisnis</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-6 text-foreground">
            Peluang <span className="gradient-text">Kemitraan</span> Bisnis
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hibiscus Efsya hadir dengan 4 kategori bisnis untuk memenuhi berbagai kebutuhan Anda
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {/* Category Tabs - Glass Effect */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat, index) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(index)}
                className={`btn-glass-tab flex items-center gap-2 ${activeCategory === index ? "active" : ""}`}
                style={activeCategory !== index ? {
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                } : {}}
              >
                {cat.icon}
                {cat.title}
              </button>
            ))}
          </div>

          {/* Main Content - Stack Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              {/* Stack Container */}
              <div className="w-full max-w-2xl h-[420px] md:h-[280px]">
                <Stack
                  randomRotation={true}
                  sensitivity={200}
                  sendToBackOnClick={true}
                  autoplay={true}
                  autoplayDelay={4000}
                  pauseOnHover={true}
                  cards={serviceCards}
                />
              </div>

              {/* Instruction */}
              <p className="text-sm text-muted-foreground mt-8 text-center">
                Geser atau klik kartu untuk melihat layanan lainnya
              </p>
            </motion.div>
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ServicesSection;
