import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="section-heading mb-6">
            Get Professional Video Campaigns in Weeks.
          </h2>
          <p className="text-2xl md:text-3xl font-medium text-muted-foreground mb-4">
            Send your brief. Get your quote. Launch your campaign.
          </p>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            No more waiting months for video content. Get agency-level creatives, 
            and peak professionalism - at startup speed.
          </p>
          
          <Button className="btn-primary text-lg px-8 py-4 group">
            Let's Go
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Decorative Images */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 flex justify-center gap-4 overflow-hidden"
        >
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className="w-32 h-48 md:w-40 md:h-60 rounded-xl bg-gradient-to-br from-primary/20 to-secondary overflow-hidden"
              style={{
                transform: `rotate(${(index - 1.5) * 3}deg)`,
              }}
            >
              <div className="w-full h-full bg-card/50" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
