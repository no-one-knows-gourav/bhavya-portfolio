import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Markdown } from "@/components/ui/Markdown";

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.3], [40, 0]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-[90svh] flex items-center justify-center py-20 px-6 overflow-hidden"
      data-ocid="about.section"
    >
      {/* ── Background decoration ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        {/* ── Left: Animated Visual Element ── */}
        <div className="relative flex justify-center lg:justify-end order-2 lg:order-1">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Main glowing sphere */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 40px 10px oklch(0.72 0.24 270 / 0.15)",
                  "0 0 60px 20px oklch(0.72 0.24 270 / 0.25)",
                  "0 0 40px 10px oklch(0.72 0.24 270 / 0.15)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 via-accent/5 to-white/5 border border-white/10 flex items-center justify-center"
            >
              <div className="w-1/2 h-1/2 rounded-full bg-accent/20 blur-2xl" />
            </motion.div>

            {/* Orbital paths */}
            <div className="absolute inset-[-20px] rounded-full border border-white/5" />
            <div className="absolute inset-[-50px] rounded-full border border-white/5" />

            {/* Orbiting nodes */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8 + i * 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0"
              >
                <div
                  className="absolute w-4 h-4 rounded-full bg-accent shadow-glow"
                  style={{
                    top: -8,
                    left: "50%",
                    marginLeft: -8,
                    transform: `translateY(${-20 - i * 30}px) scale(${1 - i * 0.15})`,
                  }}
                />
              </motion.div>
            ))}

            {/* Center focus indicator */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="font-display font-black text-6xl text-white/10 select-none">
                IIT
              </span>
              <span className="font-display font-medium text-xs tracking-[0.5em] text-accent/40 -mt-2">
                GOA
              </span>
            </div>
          </div>
        </div>

        {/* ── Right: Personal Narrative ── */}
        <div className="order-1 lg:order-2 text-left space-y-8">
          <header className="space-y-4">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-body text-accent tracking-[0.2em] uppercase text-xs font-bold"
            >
              Who I Am
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight"
            >
              Bridging Visionary <br />
              <span className="text-gradient-purple">Architecture & AI</span>
            </motion.h2>
          </header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <Markdown 
              className="text-base md:text-lg font-light"
              content="I am a **Technical Architect** and **AI Researcher** based at IIT Goa, specializing in high-impact solutions that bridge the gap between complex engineering and strategic leadership."
            />
            
            <Markdown 
              className="text-base md:text-lg font-light"
              content="With a track record of solving **600+ algorithmic problems** and architecting robust systems—from real-time market data ingestion to multilingual agricultural AI—I thrive at the intersection of innovation and practicality."
            />

            <Markdown 
              className="text-base md:text-lg font-light"
              content="Whether it's leading institutional outreach for **IEEE** or engineering scalable full-stack ecosystems, my goal is always the same: to build technology that moves the needle and empowers users across borders."
            />
          </motion.div>

          {/* ── Signature / Callout ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-6 flex items-center gap-6"
          >
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl text-white/90">
                Bhavya Bharadwaj
              </span>
              <span className="font-body text-[10px] uppercase tracking-widest text-white/40">
                Architect · Researcher · Leader
              </span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
