import { motion } from "framer-motion";
import { ArrowRight, Star, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const banners = [
  {
    id: 1,
    title: "Premium Design Services",
    subtitle: "Professional branding & visual identity solutions",
    description: "Transform your brand with stunning logos, packaging, and marketing materials that captivate your audience.",
    icon: Star,
    bgColor: "bg-gradient-to-r from-blue-500 to-purple-600",
    textColor: "text-white",
    buttonText: "Get Started",
    buttonLink: "/services"
  },
  {
    id: 2,
    title: "Lightning Fast Delivery",
    subtitle: "Quick turnaround without compromising quality",
    description: "Get your design projects completed in record time with our efficient workflow and dedicated team.",
    icon: Zap,
    bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
    textColor: "text-white",
    buttonText: "View Portfolio",
    buttonLink: "/portfolio"
  },
  {
    id: 3,
    title: "Client Satisfaction Guaranteed",
    subtitle: "100% satisfaction with unlimited revisions",
    description: "Your happiness is our priority. We work closely with you until you're completely satisfied with the results.",
    icon: Heart,
    bgColor: "bg-gradient-to-r from-green-500 to-teal-500",
    textColor: "text-white",
    buttonText: "Contact Us",
    buttonLink: "/contact"
  }
];

export const WebBanners = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="space-y-8">
          {banners.map((banner, index) => {
            const IconComponent = banner.icon;
            return (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`${banner.bgColor} rounded-2xl p-8 lg:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white/20 rounded-full">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`text-xl lg:text-2xl font-bold ${banner.textColor}`}>
                        {banner.title}
                      </h3>
                    </div>
                    <p className={`text-lg ${banner.textColor} opacity-90`}>
                      {banner.subtitle}
                    </p>
                    <p className={`text-base ${banner.textColor} opacity-80 leading-relaxed`}>
                      {banner.description}
                    </p>
                    <Link to={banner.buttonLink}>
                      <Button
                        className="bg-white text-gray-800 hover:bg-gray-100 font-semibold px-6 py-3 rounded-full group transition-all duration-300"
                      >
                        {banner.buttonText}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                      <IconComponent className="w-16 h-16 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};