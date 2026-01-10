import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

// Default blog posts
const defaultPosts = [
  {
    id: "1",
    title: "The Art of Brand Identity Design",
    slug: "art-of-brand-identity",
    excerpt: "Discover how to create a memorable brand identity that resonates with your target audience and stands the test of time.",
    cover_image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    published_at: new Date().toISOString(),
    profiles: { full_name: "Alex Parker" },
  },
  {
    id: "2",
    title: "Web Design Trends for 2024",
    slug: "web-design-trends-2024",
    excerpt: "Stay ahead of the curve with these emerging web design trends that are reshaping the digital landscape.",
    cover_image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    published_at: new Date().toISOString(),
    profiles: { full_name: "Sarah Chen" },
  },
  {
    id: "3",
    title: "The Psychology of Color in Marketing",
    slug: "psychology-of-color",
    excerpt: "Learn how color choices can influence consumer behavior and boost your marketing effectiveness.",
    cover_image: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=800&q=80",
    published_at: new Date().toISOString(),
    profiles: { full_name: "Emily Davis" },
  },
];

const Blog = () => {
  const [posts, setPosts] = useState<any[]>(defaultPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          profiles:author_id (full_name)
        `)
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (!error && data && data.length > 0) {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="section-heading mb-6">
                Design <span className="text-gradient-accent">Blog</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Insights, tips, and inspiration from our creative team.
              </p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-border rounded-xl overflow-hidden group"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.cover_image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.published_at ? format(new Date(post.published_at), "MMM d, yyyy") : "Draft"}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.profiles?.full_name || "AP Creation"}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}

            {posts.length === 0 && !loading && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
