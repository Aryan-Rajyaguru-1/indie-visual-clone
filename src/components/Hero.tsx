import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { number: "1500+", label: "Total Videos" },
  { number: "150+", label: "Clients" },
  { number: "40+", label: "Cities" },
  { number: "10+", label: "Languages" },
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-0">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-12 lg:py-0">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Enterprise Video Production.
              <br />
              Delivered at Scale.
              <br />
              <span className="text-gradient-accent">Without the Chaos.</span>
            </h1>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              IndieVisual creates high-quality video - quickly, reliably, and at scale - 
              through a structured production system that brings together creative experts, 
              professional crews, and tech-first workflows.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From explainers, AI videos & ads, to interviews, podcasts, training, 
              & internal films. One video production company in India that does it all.
            </p>
            <Button className="btn-primary group">
              Talk to an Expert
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 lg:mt-20 pb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="text-center lg:text-left"
              >
                <div className="stat-number">{stat.number}</div>
                <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
