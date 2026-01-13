import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Mail, Phone, MapPin, Send, Loader2, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getContactContent, ContactContent, submitContactForm } from "@/lib/api";

// Default content
const defaultContactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "admin@hibiscusefsya.com",
    href: "mailto:admin@hibiscusefsya.com",
  },
  {
    icon: Phone,
    title: "Telepon",
    value: "+62 812 3456 7890",
    href: "tel:+6281234567890",
  },
  {
    icon: MapPin,
    title: "Alamat",
    value: "Jakarta, Indonesia",
    href: "#",
  },
];

const defaultContent: ContactContent = {
  section_title: "Hubungi Kami",
  section_subtitle: "Tertarik Bermitra?",
  heading: "Tertarik Bermitra?",
  description: "Ceritakan minat Anda untuk bermitra dengan kami dan tim kami akan segera menghubungi untuk memberikan informasi lengkap tentang peluang franchise.",
  contact_info: {
    email: "admin@hibiscusefsya.com",
    phone: "+62 812 3456 7890",
    address: "Jakarta, Indonesia",
  },
  social_links: {
    whatsapp: "https://wa.me/6281234567890",
  },
  map_embed: "",
};

export const ContactSection = () => {
  const { toast } = useToast();
  const [content, setContent] = useState<ContactContent>(defaultContent);
  const [contactInfo, setContactInfo] = useState(defaultContactInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getContactContent();
      if (data) {
        // Parse JSON strings jika perlu
        const parsedContactInfo = typeof data.contact_info === 'string' ? JSON.parse(data.contact_info) : data.contact_info;
        const parsedSocialLinks = typeof data.social_links === 'string' ? JSON.parse(data.social_links) : data.social_links;
        
        setContent({
          ...data,
          contact_info: parsedContactInfo || defaultContent.contact_info,
          social_links: parsedSocialLinks || defaultContent.social_links,
        });
        
        // Update contact info display
        if (parsedContactInfo) {
          setContactInfo([
            {
              icon: Mail,
              title: "Email",
              value: parsedContactInfo.email || defaultContactInfo[0].value,
              href: `mailto:${parsedContactInfo.email || defaultContactInfo[0].value}`,
            },
            {
              icon: Phone,
              title: "Telepon",
              value: parsedContactInfo.phone || defaultContactInfo[1].value,
              href: `tel:${(parsedContactInfo.phone || defaultContactInfo[1].value).replace(/\s/g, '')}`,
            },
            {
              icon: MapPin,
              title: "Alamat",
              value: parsedContactInfo.address || defaultContactInfo[2].value,
              href: "#",
            },
          ]);
        }
      }
    };
    fetchContent();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Mohon isi semua field yang wajib diisi",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Coba submit ke API dulu
      const result = await submitContactForm(formData);
      
      if (result.success) {
        toast({
          title: "Berhasil!",
          description: "Pesan Anda telah terkirim. Tim kami akan menghubungi Anda segera.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        // Fallback ke mailto jika API gagal
        const mailtoLink = `mailto:${content.contact_info.email}?subject=${encodeURIComponent(formData.subject || 'Pesan dari Website')}&body=${encodeURIComponent(`Nama: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
        window.location.href = mailtoLink;
        
        toast({
          title: "Info",
          description: "Email client telah dibuka. Silakan kirim pesan Anda.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">{content.section_title}</span>
          <h2 className="text-2xl md:text-5xl font-bold mt-3 mb-6 text-foreground">
            {content.heading.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{content.heading.split(' ').slice(-1)}</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {content.description}
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <ScrollReveal direction="left">
            <div className="glass-card p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                      placeholder="Masukkan nama Anda"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                      placeholder="email@contoh.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subjek
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder="Subjek pesan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Pesan *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none text-foreground placeholder:text-muted-foreground"
                    placeholder="Ceritakan kebutuhan Anda..."
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary-glow text-primary-foreground w-full flex items-center justify-center gap-2 disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                  {isLoading ? "Mengirim..." : "Kirim Pesan"}
                </motion.button>
              </form>
            </div>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <div className="glass-card-red p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold mb-6 gradient-text">
                  Informasi Kontak
                </h3>
                <div className="space-y-5 md:space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.href}
                      className="flex items-center gap-4 group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{info.title}</div>
                        <div className="text-foreground font-medium">{info.value}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick CTA */}
              <div className="glass-card p-6">
                <p className="text-muted-foreground mb-4">
                  Butuh respons cepat? Chat langsung dengan tim kami melalui WhatsApp.
                </p>
                <motion.a
                  href={content.social_links.whatsapp || "https://wa.me/6289608667949"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass text-foreground w-full flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat via WhatsApp
                </motion.a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
