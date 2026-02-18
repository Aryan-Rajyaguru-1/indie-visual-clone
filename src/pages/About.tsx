import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Users, Award, Clock, Target } from "lucide-react";
import { useEffect } from "react";
import { applyHeaderGap } from "@/lib/heroSpacing";

const stats = [
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Clock, value: "1000+", label: "Projects Delivered" },
  { icon: Target, value: "100%", label: "Client Satisfaction" },
];

const team = [
  { name: "Alex Parker", role: "Founder & Creative Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Sarah Chen", role: "Lead Designer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
  { name: "Marcus Johnson", role: "UI/UX Specialist", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
  { name: "Emily Davis", role: "Brand Strategist", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
];

const About = () => {
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
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="section-heading mt-0 mb-6">
                About <span className="text-gradient-accent">AP Creation</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We're a passionate team of designers dedicated to transforming ideas 
                into stunning visual experiences. With over 15 years of combined experience, 
                we've helped hundreds of brands stand out in the digital landscape.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Founded in 2010, AP Creation started with a simple mission: to make 
                  exceptional design accessible to businesses of all sizes. What began 
                  as a small freelance operation has grown into a full-service creative studio.
                </p>
                <p className="text-muted-foreground mb-4">
                  We believe that great design isn't just about aesthetics—it's about 
                  solving problems and creating meaningful connections between brands 
                  and their audiences.
                </p>
                <p className="text-muted-foreground">
                  Today, we work with clients across the globe, from startups to 
                  Fortune 500 companies, helping them tell their stories through 
                  compelling visual design.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Team collaboration"
                  className="rounded-xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-12"
            >
              Meet Our Team
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl overflow-hidden border border-border"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
