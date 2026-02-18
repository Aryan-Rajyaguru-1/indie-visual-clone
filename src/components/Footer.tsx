import { Link } from "react-router-dom";
import { ArrowRight, Instagram, Facebook, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Careers", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Brand Identity", href: "/services" },
      { label: "Web Design", href: "/services" },
      { label: "Social Media", href: "/services" },
      { label: "Packaging", href: "/services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "FAQ", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/about" },
      { label: "Terms & Conditions", href: "/about" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-border">
      {/* CTA Section */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-primary/20 to-secondary rounded-2xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Ready to Elevate Your Brand?
          </h3>
          <Link to="/contact">
            <Button className="btn-primary group">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">AP</span>
              </div>
              <span className="text-xl font-semibold">AP Creation</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Creative graphic design studio delivering pixel-perfect designs that elevate brands.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4 text-sm">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AP Creation. All rights reserved.
            </p>
            <div className="flex gap-4 items-center">
              <a
                href="https://www.behance.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Behance"
              >
                Behance
              </a>

              <a
                href="https://dribbble.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Dribbble"
              >
                Dribbble
              </a>

              <a
                href="https://www.instagram.com/ap_creation_offical_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full bg-transparent hover:bg-accent/5"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61588010453210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full bg-transparent hover:bg-accent/5"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full bg-transparent hover:bg-accent/5"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
