import { motion } from "framer-motion";
import { Palette, Layout, Smartphone, Package, Brush, PenTool, Camera, Video } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Brand Identity Design",
    description:
      "Complete brand identity packages including logos, color palettes, typography, and brand guidelines that make your business memorable.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
  },
  {
    icon: Layout,
    title: "Web designing",
    description:
      "Beautiful and intuitive user interfaces for websites, mobile apps, and dashboards that enhance user experience and drive conversions.",
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&q=80",
  },
  {
    icon: Smartphone,
    title: "Social Media Graphics",
    description:
      "Eye-catching social media content, posts, stories, and ad creatives that boost engagement and grow your online presence.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80",
  },
  {
    icon: Package,
    title: "Packaging Design",
    description:
      "Premium product packaging that stands out on shelves and creates memorable unboxing experiences for your customers.",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80",
  },
  {
    icon: Brush,
    title: "Print & Marketing",
    description:
      "Professional print designs including brochures, flyers, business cards, banners, and all marketing collateral your business needs.",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&q=80",
  },
  {
    icon: PenTool,
    title: "Logo designing",
    description:
      "Custom illustrations, icon sets, and visual assets that add personality and uniqueness to your brand communications.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
  },
  {
    icon: Layout,
    title: "Web Designing & Developing",
    description:
      "Full-stack web designing and development — responsive sites, landing pages, and CMS integrations built to convert.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  },
  {
    icon: Camera,
    title: "Photo & Video shoot",
    description:
      "Professional photography and videography services including product shoots, brand films, and editing.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
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
            Creative Design Services That Elevate Brands
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Great design is more than aesthetics. It is strategic thinking translated 
            into visuals - understanding your audience, crafting the right message, 
            and delivering it with stunning creativity.
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
              id={service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
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
