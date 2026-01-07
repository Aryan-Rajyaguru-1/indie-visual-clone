import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const portfolioItems = [
  { image: portfolio1, title: "Anthem Biosciences", category: "Corporate Video" },
  { image: portfolio2, title: "Corporate Connections", category: "Interview" },
  { image: portfolio3, title: "Barosi Foods", category: "Product Video" },
  { image: portfolio4, title: "Philips India", category: "Testimonial" },
  { image: portfolio5, title: "Tech Summit 2024", category: "Event Coverage" },
  { image: portfolio6, title: "Sturlite Energy", category: "Animation" },
];

export const Portfolio = () => {
  return (
    <section className="py-20 lg:py-32 bg-secondary/20" id="portfolio">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="section-heading mb-6">Our Work</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Brands rely on video across marketing, sales, HR, leadership, and internal 
            communication. With 1,500 videos delivered across 150 clients, we work as 
            a long-term production partner.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Play className="w-6 h-6 text-accent-foreground fill-current ml-1" />
                </div>
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs text-primary font-medium uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <Button className="btn-primary">Get a Quote</Button>
          <Button className="btn-outline">See Our Portfolio</Button>
        </motion.div>
      </div>
    </section>
  );
};
