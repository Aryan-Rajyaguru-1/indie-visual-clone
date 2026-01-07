import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = [
  {
    title: "Company",
    links: ["Home", "About Us", "Contact Us", "Careers"],
  },
  {
    title: "Services",
    links: ["Brand Identity", "Web designing", "Social Media", "Packaging"],
  },
  {
    title: "Resources",
    links: ["Blog", "Case Studies", "Pricing", "FAQ"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms & Conditions"],
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
          <Button className="btn-primary group">
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">AP</span>
              </div>
              <span className="text-xl font-semibold">AP Creation</span>
            </a>
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
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
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
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Behance
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dribbble
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Instagram
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
