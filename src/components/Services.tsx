import { motion } from "framer-motion";
import { Play, Film, Mic, Package, Users, Sparkles } from "lucide-react";

const services = [
  {
    icon: Play,
    title: "Explainers & Training Videos",
    description:
      "Need to explain complex concepts to your team and clients? Explainer videos, training videos, tutorials and animated videos work best.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
  },
  {
    icon: Film,
    title: "Corporate Videos",
    description:
      "A strong corporate film helps people understand your company. Tie together your work, your culture, and your purpose through watchable company profiles.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
  },
  {
    icon: Mic,
    title: "Events & Live Coverage",
    description:
      "Got a conference, workshop, offsite, or internal event coming up? Turn it into an event film that documents the day.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
  {
    icon: Package,
    title: "Product Ads & Demos",
    description:
      "When buyers want to see before they choose, a product demo makes the decision easier. Highlight real usage, key features, and outcomes.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  },
  {
    icon: Users,
    title: "Testimonial Videos",
    description:
      "Nothing builds trust like a customer explaining what changed for them. Give prospects a grounded, human view of your product's impact.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80",
  },
  {
    icon: Sparkles,
    title: "Animation & AI Videos",
    description:
      "Some ideas are easier shown than spoken. Animation and AI visuals simplify complex products and technical concepts.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
  },
];

export const Services = () => {
  return (
    <section className="py-20 lg:py-32" id="services">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="section-heading mb-6">
            Professional Video Production Across Genres.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Good video is much more than a camera and an editor. It comes from a 
            series of thoughtful decisions and planned execution - creative direction, 
            narrative flow, scripting, shot planning, execution, and editing.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-service group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
