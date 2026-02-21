import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Palette, Layout, Share2, Package, FileText, PenTool, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { applyHeaderGap } from "@/lib/heroSpacing";

const services = [
  {
    icon: Palette,
    title: "Brand Identity",
    description: "Complete brand identity systems including logos, color palettes, typography, and comprehensive brand guidelines.",
    features: ["Logo Design", "Color Palette", "Typography System", "Brand Guidelines", "Stationery Design"],
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&q=80",
  },
  {
    icon: Layout,
    title: "Web Design",
    description: "Beautiful and intuitive user interfaces for websites, mobile apps, and dashboards that enhance user experience.",
    features: ["Website Design", "Mobile App UI", "Dashboard Design", "Wireframing", "Prototyping"],
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&q=80",
  },
  {
    icon: Share2,
    title: "Social Media Graphics",
    description: "Eye-catching social media graphics, templates, and campaign visuals that boost engagement.",
    features: ["Post Templates", "Story Designs", "Ad Creatives", "Profile Graphics", "Carousel Designs"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80",
  },
  {
    icon: Package,
    title: "Packaging Design",
    description: "Product packaging that tells your brand story and stands out on shelves and in digital marketplaces.",
    features: ["Product Packaging", "Label Design", "Box Design", "Mockups", "Print-Ready Files"],
    image: "https://images.unsplash.com/photo-1605293945408-db7c0c9e4c8c?w=600&q=80",
  },
  {
    icon: FileText,
    title: "Print & Marketing",
    description: "Professional print materials from business cards to brochures and large format displays.",
    features: ["Business Cards", "Brochures", "Flyers", "Posters", "Banners"],
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&q=80",
  },
  {
    icon: PenTool,
    title: "Logo Design",
    description: "Custom logos and icon sets that add personality and uniqueness to your brand communications.",
    features: ["Logo Concepts", "Icon Design", "Variations", "File Formats", "Usage Guidelines"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
  },
];

const ServicesPage = () => {
  useEffect(() => {
    const cleanup = applyHeaderGap('.hero-gap-target', 60);
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        {/* Hero */}
          <section className="py-20 lg:py-32 hero-gap-target">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
                <h1 className="section-heading mt-0 mb-6">
                Our <span className="text-gradient-accent">Services</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                From brand identity to web design, we offer comprehensive creative services 
                to help your business stand out and succeed.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="space-y-24">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center">
                        <service.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h2 className="text-3xl font-bold">{service.title}</h2>
                    </div>
                    <p className="text-lg text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact">
                      <Button className="btn-primary group">
                        Get Started
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="rounded-xl w-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-xl" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Let's discuss your design needs and create something amazing together.
              </p>
              <Link to="/contact">
                <Button className="btn-primary text-lg px-8 py-4 group">
                  Get a Free Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
