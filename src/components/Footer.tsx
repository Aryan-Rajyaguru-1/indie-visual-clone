import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = [
  {
    title: "Company",
    links: ["Home", "About Us", "Contact Us", "Careers"],
  },
  {
    title: "Services",
    links: ["Video Production", "Animation", "Corporate Films", "Event Coverage"],
  },
  {
    title: "Resources",
    links: ["Blog", "Case Studies", "Packages", "FAQ"],
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
            Ready to Launch Your Next Video Campaign?
          </h3>
          <Button className="btn-primary group">
            Let's Talk
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
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-semibold">IndieVisual</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Enterprise video production delivered at scale, without the chaos.
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
              © {new Date().getFullYear()} IndieVisual. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Twitter
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Instagram
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
