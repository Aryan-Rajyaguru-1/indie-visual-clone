import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "The videos came out fantastic. It was a very quick, professionally planned and well-managed production.",
    author: "Loveleen Kaur",
    role: "Creative Lead",
    company: "Philips",
  },
  {
    quote:
      "We needed a lot of very structured, professional, seamlessly-organized video production work. And well within our budget. IndieVisual delivered!",
    author: "Amit Kumar Srivastava",
    role: "AVP Marketing",
    company: "Enterprise Client",
  },
  {
    quote:
      "IndieVisual streamlined our video production entirely. Their platform offers on-demand access and makes their team feel like a seamless internal extension.",
    author: "Nanki Jassal",
    role: "Strategic Consultant",
    company: "Fortune 500",
  },
  {
    quote:
      "We've collaborated with IndieVisual on several events and video projects, and the experience has consistently been smooth and hassle-free.",
    author: "Aaditya Vinayak",
    role: "Senior Associate",
    company: "Investment Firm",
  },
  {
    quote:
      "It was really a pleasure working with your team on our corporate videos. We will continue to use your services wherever we can.",
    author: "Rahul Guha",
    role: "Managing Director & CEO",
    company: "Tech Company",
  },
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 lg:py-32 bg-secondary/20" id="testimonials">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">What Our Clients Say About Us</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border rounded-2xl p-8 lg:p-12 relative"
          >
            <Quote className="absolute top-8 left-8 w-12 h-12 text-primary/20" />
            
            <blockquote className="text-xl lg:text-2xl font-medium leading-relaxed mb-8 pt-8 lg:pt-4">
              "{testimonials[activeIndex].quote}"
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">
                  {testimonials[activeIndex].author.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-semibold">{testimonials[activeIndex].author}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
