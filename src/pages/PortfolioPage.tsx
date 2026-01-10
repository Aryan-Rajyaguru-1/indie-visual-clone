import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const categories = ["All", "Brand Identity", "Web Design", "Social Media", "Print Design", "Packaging", "Logo Design"];

// Default portfolio items
const defaultProjects = [
  { id: "1", image_url: portfolio1, title: "Gauntlet Tech", category: "Brand Identity" },
  { id: "2", image_url: portfolio2, title: "Social Campaign", category: "Social Media" },
  { id: "3", image_url: portfolio3, title: "Vogue Editorial", category: "Print Design" },
  { id: "4", image_url: portfolio4, title: "SaaS Dashboard", category: "Web Design" },
  { id: "5", image_url: portfolio5, title: "Luxe Cosmetics", category: "Packaging" },
  { id: "6", image_url: portfolio6, title: "Creative Series", category: "Logo Design" },
];

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<any[]>(defaultProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="section-heading mb-6">
                Our <span className="text-gradient-accent">Portfolio</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore our latest work across brand identity, web design, packaging, and more.
              </p>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Projects Grid */}
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-xl bg-card border border-border"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-sm text-primary font-medium mb-2">{project.category}</span>
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      {project.description && (
                        <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {filteredProjects.length === 0 && !loading && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No projects found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
