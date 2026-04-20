import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const ROLES = [
  "Coder",
  "Researcher",
  "Analyst",
  "Strategist",
  "Leader",
  "Mentor",
] as const;

const ORBS = [
  {
    size: "w-72 h-72",
    pos: "top-[-4rem] left-[-4rem]",
    delay: "0s",
    blur: "blur-3xl",
    opacity: "opacity-20",
  },
  {
    size: "w-96 h-96",
    pos: "bottom-[-6rem] right-[-4rem]",
    delay: "1.2s",
    blur: "blur-3xl",
    opacity: "opacity-15",
  },
  {
    size: "w-48 h-48",
    pos: "top-1/3 left-1/4",
    delay: "0.6s",
    blur: "blur-2xl",
    opacity: "opacity-25",
  },
  {
    size: "w-32 h-32",
    pos: "top-1/4 right-1/3",
    delay: "1.8s",
    blur: "blur-xl",
    opacity: "opacity-30",
  },
  {
    size: "w-20 h-20",
    pos: "bottom-1/3 left-1/3",
    delay: "0.9s",
    blur: "blur-xl",
    opacity: "opacity-20",
  },
  {
    size: "w-56 h-56",
    pos: "bottom-1/4 right-1/4",
    delay: "2.4s",
    blur: "blur-3xl",
    opacity: "opacity-15",
  },
];

const STAR_POSITIONS: {
  top: string;
  left?: string;
  right?: string;
  size: number;
  delay: string;
}[] = [
  { top: "15%", left: "8%", size: 2, delay: "0.3s" },
  { top: "25%", right: "12%", size: 3, delay: "0.8s" },
  { top: "60%", left: "5%", size: 2, delay: "1.5s" },
  { top: "75%", right: "8%", size: 2, delay: "0.5s" },
  { top: "40%", left: "90%", size: 3, delay: "1.2s" },
  { top: "80%", left: "18%", size: 2, delay: "2.0s" },
  { top: "10%", left: "55%", size: 2, delay: "0.7s" },
  { top: "45%", right: "20%", size: 2, delay: "1.7s" },
];

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % ROLES.length);
        setIsVisible(true);
      }, 300);
    }, 2000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleScrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-[100svh] flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1600x900.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Deep overlay for text legibility */}
      <div className="absolute inset-0 z-0 bg-primary/70" />

      {/* Floating ambient orbs */}
      {ORBS.map((orb) => (
        <div
          key={orb.delay + orb.size}
          className={`absolute ${orb.size} ${orb.pos} rounded-full bg-accent animate-float ${orb.blur} ${orb.opacity} pointer-events-none`}
          style={{ animationDelay: orb.delay }}
        />
      ))}

      {/* Sparkle stars */}
      {STAR_POSITIONS.map((star) => (
        <div
          key={star.delay + String(star.top)}
          className="absolute rounded-full bg-accent/60 animate-pulse-glow pointer-events-none"
          style={{
            top: star.top,
            left: star.left,
            right: star.right,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* University badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6"
        >
          <Badge
            variant="outline"
            className="border-accent/50 text-accent/90 bg-primary/30 backdrop-blur-sm font-body text-xs tracking-[0.25em] uppercase px-5 py-2 rounded-full"
            data-ocid="hero.university_badge"
          >
            Indian Institute of Technology, Goa
          </Badge>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          <h1
            className="font-display font-bold leading-none tracking-tight mb-4"
            data-ocid="hero.name_heading"
          >
            <span
              className="block text-7xl sm:text-8xl md:text-[9rem] lg:text-[10rem] text-gradient-purple"
              style={{ letterSpacing: "-0.03em" }}
            >
              Bhavya
            </span>
            <span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary-foreground/90 mt-1"
              style={{ letterSpacing: "-0.02em" }}
            >
              Bharadwaj
            </span>
          </h1>
        </motion.div>

        {/* Animated cycling role */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-col items-center gap-4 mb-8"
          data-ocid="hero.role_section"
        >
          {/* Cycling single role */}
          <div
            className="h-12 flex items-center justify-center"
            data-ocid="hero.role_badge"
          >
            <AnimatePresence mode="wait">
              {isVisible && (
                <motion.span
                  key={currentRole}
                  initial={{ opacity: 0, y: 10, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.92 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="inline-block px-8 py-2.5 rounded-full border border-accent/60 text-accent font-display font-semibold text-2xl md:text-3xl bg-accent/10 backdrop-blur-sm shadow-glow"
                >
                  {ROLES[currentRole]}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* All roles as small static tags below */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {ROLES.map((role, i) => (
              <span
                key={role}
                className={`px-3 py-1 rounded-full text-xs font-body font-medium tracking-wide border transition-smooth ${
                  i === currentRole
                    ? "border-accent text-accent bg-accent/20"
                    : "border-accent/20 text-primary-foreground/50 bg-primary/20"
                }`}
              >
                {role}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-body text-primary-foreground/65 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          data-ocid="hero.tagline"
        >
          Building elegant solutions at the intersection of technology,
          research, and leadership.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            type="button"
            onClick={handleScrollToProjects}
            className="rounded-full px-10 py-4 text-base font-display font-semibold bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow transition-bounce"
            data-ocid="hero.explore_button"
          >
            Explore My Work →
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="rounded-full px-8 py-4 text-base font-display font-medium border-accent/40 text-accent hover:bg-accent/10 transition-smooth"
            data-ocid="hero.contact_button"
          >
            Get In Touch
          </Button>
        </motion.div>
      </div>

      {/* Bottom scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
        data-ocid="hero.scroll_hint"
      >
        <span className="font-body text-primary-foreground/40 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-accent/60 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
