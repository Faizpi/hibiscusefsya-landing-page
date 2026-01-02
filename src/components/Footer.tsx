import { motion } from "framer-motion";

const footerLinks = {
  layanan: [
    { name: "Body Care", href: "#services" },
    { name: "Fashion", href: "#services" },
    { name: "Travel", href: "#services" },
    { name: "Technology", href: "#services" },
  ],
  perusahaan: [
    { name: "Tentang Kami", href: "#about" },
    { name: "Daftar Franchise", href: "#contact" },
    { name: "Karir", href: "#" },
    { name: "Kontak", href: "#contact" },
  ],
  legal: [
    { name: "Kebijakan Privasi", href: "#" },
    { name: "Syarat & Ketentuan", href: "#" },
  ],
};

const socialLinks = [
  { name: "Instagram", icon: "📸", href: "#" },
  { name: "LinkedIn", icon: "💼", href: "#" },
  { name: "Twitter", icon: "🐦", href: "#" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card border-t border-border overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-primary/3 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-lg">H</span>
              </div>
              <div>
                <span className="font-bold text-lg text-foreground">Hibiscus Efsya</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-2 max-w-sm">
              Korporasi bisnis yang membuka peluang kemitraan di bidang Body Care, Fashion, Travel, dan Technology.
            </p>
            <p className="text-muted-foreground mb-6">
              Email: <a href="mailto:admin@hibiscusefsya.com" className="text-primary hover:underline">admin@hibiscusefsya.com</a>
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 glass-card flex items-center justify-center text-xl hover:bg-primary/10 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Layanan</h4>
            <ul className="space-y-3">
              {footerLinks.layanan.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Perusahaan</h4>
            <ul className="space-y-3">
              {footerLinks.perusahaan.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Hibiscus Efsya. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ in Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;