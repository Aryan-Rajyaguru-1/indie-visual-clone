import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
const heroSlides = [
  {
    id: 1,
    background: heroBg,
    title: "Digital Marketing Graphics",
    subtitle: "Engage Your Audience with Stunning Visuals",
    description: "Elevate your digital presence with eye-catching graphics, social media content, and marketing materials that convert visitors Into customers.",
    buttonText: "Explore Services",
    buttonLink: "/services",
  },
  {
    id: 2,
    background: portfolio1,
    title: "Creative Design Solutions",
    subtitle: "Transforming Ideas Into Visual Masterpieces",
    description: "AP Creation delivers stunning visual identities—from logos and branding to social media graphics and print designs—through a creative process that brings your vision to life.",
    buttonText: "Start Your Project",
    buttonLink: "/contact",
  },
  {
    id: 3,
    background: portfolio2,
    title: "Premium Brand Identity",
    subtitle: "Build a Strong, Memorable Brand Presence",
    description: "From concept to execution, we create comprehensive brand identities that resonate with your audience and drive business growth across all platforms.",
    buttonText: "View Our Work",
    buttonLink: "/portfolio",
  },
];

const stats = [
  { number: "50K", label: "Designs Delivered" },
  { number: "379+", label: "Happy Clients" },
  { number: "25+", label: "Years Experience" },
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [logoOffsetLeft, setLogoOffsetLeft] = useState<number | null>(null);
  const [offsetDelta, setOffsetDelta] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerGridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isAutoPlaying || isDragging) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setProgress(0);
    }, 6000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + (100 / 60), 100)); // 60 intervals for 6 seconds
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [isAutoPlaying, isDragging]);

  useEffect(() => {
    const computeOffsetLeft = () => {
      const logo = document.getElementById("site-logo");
      const container = containerRef.current;
      if (!logo || !container) {
        setLogoOffsetLeft(null);
        return;
      }

      const logoRect = logo.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const offsetLeft = Math.max(0, Math.round(logoRect.left - containerRect.left));

      // apply only on desktop (lg >= 1024)
      if (window.innerWidth >= 1024) {
        setLogoOffsetLeft(offsetLeft);
      } else {
        setLogoOffsetLeft(null);
      }
    };

    computeOffsetLeft();
    window.addEventListener("resize", computeOffsetLeft);
    return () => window.removeEventListener("resize", computeOffsetLeft);
  }, []);

  // Ensure there is exactly 60px visible gap between header bottom and hero content on all screens
  useEffect(() => {
    const updateHeroPadding = () => {
      const header = document.querySelector('header');
      const section = sectionRef.current;
      if (!header || !section) return;

      const headerHeight = Math.round(header.getBoundingClientRect().height);
      const desiredGap = 60; // px
      section.style.paddingTop = `${headerHeight + desiredGap}px`;
    };

    updateHeroPadding();
    window.addEventListener('resize', updateHeroPadding);
    return () => window.removeEventListener('resize', updateHeroPadding);
  }, []);

  // compute precise delta between logo left and inner grid left and apply translateX
  useEffect(() => {
    const computeDelta = () => {
      const logo = document.getElementById("site-logo");
      const inner = innerGridRef.current;
      if (!logo || !inner) {
        setOffsetDelta(null);
        return;
      }

      const logoRect = logo.getBoundingClientRect();
      const innerRect = inner.getBoundingClientRect();
      const delta = Math.round(logoRect.left - innerRect.left);

      if (window.innerWidth >= 1024) {
        setOffsetDelta(delta);
      } else {
        setOffsetDelta(null);
      }
    };

    computeDelta();
    window.addEventListener("resize", computeDelta);
    return () => window.removeEventListener("resize", computeDelta);
  }, []);

  

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsAutoPlaying(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const diff = startX - currentX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Drag left - next slide
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      } else {
        // Drag right - previous slide
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      }
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
    setProgress(0);

    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const diff = startX - currentX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - next slide
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      } else {
        // Swipe right - previous slide
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      }
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
    setProgress(0);

    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentHero = heroSlides[currentSlide];

  // render slide content with consistent spacing and structure
  const renderSlideContent = (hero: typeof heroSlides[0]) => {
    return (
      <>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-0 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight"
        >
          {hero.title}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-xl md:text-2xl lg:text-3xl text-primary font-semibold"
        >
          {hero.subtitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-lg text-muted-foreground leading-relaxed max-w-xl"
        >
          {hero.description}
        </motion.p>

        {currentSlide === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm text-foreground/80 mt-2"
          >
            <div>Profess goals.</div>
            <div className="mt-2">Get a</div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Link to={hero.buttonLink}>
            <Button className="btn-primary group text-lg px-8 py-4">
              {hero.buttonText}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </>
    );
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-start pt-0 overflow-hidden hero-gap-target">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${currentHero.background})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container with Drag */}
      <div
        ref={containerRef}
        className="container mx-auto px-4 lg:px-8 relative z-10 w-full select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div
          ref={innerGridRef}
          className="grid lg:grid-cols-1 gap-12 lg:gap-20 items-center py-12 lg:py-0 max-w-4xl mx-auto"
          style={{
            transform: offsetDelta ? `translateX(${offsetDelta}px)` : undefined,
            transition: offsetDelta ? 'transform 300ms ease' : undefined,
          }}
        >
          {/* Left Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 lg:space-y-10"
            >
              {renderSlideContent(currentHero)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 lg:mt-20 pb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 lg:gap-28 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="text-left"
              >
                <div className="stat-number text-6xl md:text-7xl lg:text-8xl text-orange-500 font-black">{stat.number}</div>
                <div className="text-muted-foreground text-base md:text-lg mt-2 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Slide Indicators */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 -mb-12">
          <div className="flex space-x-4 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
            {heroSlides.map((_, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => {
                    setCurrentSlide(index);
                    setIsAutoPlaying(false);
                    setProgress(0);
                    setTimeout(() => setIsAutoPlaying(true), 10000);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                    index === currentSlide
                      ? 'bg-white scale-125 shadow-lg'
                      : 'bg-white/50 hover:bg-white/75 hover:scale-110'
                  }`}
                  aria-label={`Go to banner ${index + 1}`}
                />
                {index === currentSlide && isAutoPlaying && (
                  <div className="absolute inset-0 rounded-full border-2 border-white/30">
                    <div
                      className="absolute inset-0 rounded-full border-2 border-white transition-all duration-100 ease-linear"
                      style={{
                        clipPath: `polygon(0 0, ${progress}% 0, ${progress}% 100%, 0 100%)`
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};