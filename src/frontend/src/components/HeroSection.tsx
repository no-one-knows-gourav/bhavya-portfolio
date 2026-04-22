import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";

const ROLES = [
  "Visionary Leader",
  "Technical Architect",
  "AI Researcher",
  "Strategy Consultant",
  "Fullstack Engineer",
  "Design Thinker",
] as const;
// ── Firefly data — fixed so animations are stable across renders ──────────
const FIREFLIES = [
  { id: 1, left: "12%",  top: "65%", size: 3, dur: 14, delay: 0,   kx: [0, 40, 20, -10, 0],  ky: [0, -40, -90, -60, 0]  },
  { id: 2, left: "78%",  top: "55%", size: 4, dur: 18, delay: 2.5, kx: [0, -30, -55, -20, 0], ky: [0, -30, -80, -50, 0]  },
  { id: 3, left: "33%",  top: "75%", size: 3, dur: 12, delay: 5,   kx: [0, 25, 50, 35, 0],   ky: [0, -50, -100, -70, 0] },
  { id: 4, left: "60%",  top: "40%", size: 5, dur: 16, delay: 1,   kx: [0, -40, -20, 10, 0],  ky: [0, -35, -75, -45, 0]  },
  { id: 5, left: "88%",  top: "70%", size: 3, dur: 20, delay: 7,   kx: [0, -20, -45, -25, 0], ky: [0, -45, -95, -65, 0]  },
  { id: 6, left: "22%",  top: "35%", size: 4, dur: 15, delay: 3.5, kx: [0, 30, 10, -15, 0],   ky: [0, -25, -60, -40, 0]  },
];

function Fireflies() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    >
      {FIREFLIES.map((f) => (
        <motion.div
          key={f.id}
          style={{
            position: "absolute",
            left: f.left,
            top: f.top,
            width: f.size,
            height: f.size,
            borderRadius: "50%",
            background: "oklch(0.78 0.2 280)",
            boxShadow: [
              `0 0 ${f.size * 2}px ${f.size}px oklch(0.72 0.24 270 / 0.6)`,
              `0 0 ${f.size * 5}px ${f.size * 2}px oklch(0.65 0.22 280 / 0.2)`,
            ].join(", "),
          }}
          animate={{
            x: f.kx,
            y: f.ky,
            opacity: [0.15, 0.65, 0.3, 0.75, 0.2, 0.15],
            scale:   [0.8,  1.4,  0.9,  1.3,  0.8,  0.8],
          }}
          transition={{
            duration: f.dur,
            delay: f.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}


export function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    const currentWord = ROLES[roleIndex];

    if (!isDeleting && displayText === currentWord) {
      // Pause at full word before deleting
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      // Move to next word after fully deleted
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    } else {
      const speed = isDeleting ? 50 : 90;
      timeoutRef.current = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentWord.substring(0, displayText.length - 1)
            : currentWord.substring(0, displayText.length + 1)
        );
      }, speed);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, roleIndex, isDeleting]);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-[100svh] flex flex-col items-center relative overflow-hidden"
      data-ocid="hero.section"
    >
      {/*
       * Layout is a normal flex COLUMN — no element overlaps another vertically.
       * The only z-index trick is: "Bharadwaj" outline sits BEHIND the photo
       * inside the same relative container.
       */}

      {/* ── Fireflies ambient layer ── */}
      <Fireflies />

      {/* ── 1. "BHAVYA" — solid, in flow, above photo ── */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full text-center select-none pointer-events-none"
        style={{ paddingTop: "0", marginBottom: "-0.5vh", zIndex: 30, position: "relative" }}
        data-ocid="hero.name_bhavya"
      >
        <span
          className="font-display font-extrabold leading-none block"
          style={{
            fontSize: "clamp(4.5rem, 17vw, 20rem)",
            letterSpacing: "-0.03em",
            lineHeight: 0.9,
            /* lavender accent — no glow */
            color: "oklch(0.78 0.2 280)",
          }}
        >
          Bhavya
        </span>
      </motion.div>

      {/* ── 2. Photo panel — "Bharadwaj" outline behind photo inside this block ── */}
      <div
        className="relative flex justify-center items-end w-full"
        style={{ marginTop: "-1vw", flexShrink: 0 }}
      >
        {/* ── 2a. "BHARADWAJ" outline — z:10, behind photo ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="absolute inset-x-0 flex justify-center items-center pointer-events-none select-none"
          style={{ zIndex: 10, top: "18%", transform: "translateY(0%)" }}
          data-ocid="hero.name_bharadwaj"
        >
          <span
            className="font-display font-extrabold leading-none whitespace-nowrap"
            style={{
              fontSize: "clamp(3.5rem, 15vw, 18rem)",
              letterSpacing: "-0.02em",
              color: "transparent",
              WebkitTextStroke:
                "clamp(1px, 0.12vw, 2px) oklch(0.78 0.18 270 / 0.7)",
            }}
          >
            Bharadwaj
          </span>
        </motion.div>

        {/*
         * ── 2b. Photo — z:20, in front of outline ──
         *
         * The image is 1348 × 2292 (portrait, ratio ≈ 1 : 1.70).
         * We want to show head → elbow ≈ top 58% of height.
         *
         * Trick: wrap in a div with overflow:hidden and a fixed height.
         * img width:100% + height:auto → image renders taller than the
         * container, and overflow:hidden clips the bottom.
         *
         * Target crop: show top 58%  →  container height = 58% of natural height
         *   natural height of 500px-wide img = 500 × (2292/1348) ≈ 850px
         *   container height = 850 × 0.58 ≈ 493px  →  aspect ≈ 500:493 ≈ 1:0.99
         * We'll use a convenient responsive height via clamp.
         */}
        {/* ── Purple glow halo behind photo — z:15 ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            zIndex: 15,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "clamp(260px, 50vw, 580px)",
            height: "clamp(260px, 50vw, 580px)",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, oklch(0.65 0.25 280 / 0.22) 0%, oklch(0.55 0.22 270 / 0.08) 55%, transparent 75%)",
            pointerEvents: "none",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto overflow-hidden"
          style={{
            zIndex: 20,
            /* Smaller photo so more of "Bharadwaj" peeks out on both sides */
            width: "clamp(170px, 30vw, 360px)",
            /* 58% crop → height = width × (2292/1348) × 0.58 ≈ width × 0.987 */
            height: "clamp(168px, 29.6vw, 355px)",
          }}
          data-ocid="hero.photo"
        >
          <img
            src="/assets/images/bhavya.png"
            alt="Bhavya Bharadwaj"
            className="block select-none"
            style={{
              width: "100%",
              height: "auto",
              // Crop centers horizontally; top of image aligns to top of container
              objectFit: "cover",
              objectPosition: "center top",
              // B&W → sepia → hue-rotate → purple tint
              filter:
                "grayscale(100%) sepia(35%) hue-rotate(230deg) saturate(280%) brightness(0.88)",
            }}
            draggable={false}
          />
        </motion.div>
      </div>
      {/* ── 2c. IIT Goa bordered platform — photo rests on this ── */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.6 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center select-none"
        style={{
          /* wider than photo (clamp 170px, 30vw, 360px) */
          width: "clamp(320px, 55vw, 640px)",
          borderTop: "none",
          borderLeft: "1px solid oklch(0.78 0.18 270 / 0.45)",
          borderRight: "1px solid oklch(0.78 0.18 270 / 0.45)",
          borderBottom: "1px solid oklch(0.78 0.18 270 / 0.45)",
          padding: "10px 28px 10px",
          borderRadius: "0 0 12px 12px",
          background: "oklch(0.72 0.24 270 / 0.04)",
          backdropFilter: "blur(8px)",
          zIndex: 30,
          position: "relative",
          /* flush against photo bottom */
          marginTop: 0,
        }}
      >
        <span className="font-body text-[9px] tracking-[0.4em] uppercase font-semibold"
          style={{ color: "oklch(0.78 0.18 270 / 0.65)" }}
        >
          Indian Institute of Technology, Goa
        </span>
      </motion.div>

      {/* ── 3. Role · tagline · CTAs ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative flex flex-col items-center text-center gap-5 px-6 pb-16 pt-6 w-full"
        style={{ zIndex: 30 }}
      >

        {/* Cycling role — typewriter */}
        <div className="h-14 flex items-center justify-center">
          <div className="flex items-center gap-4" data-ocid="hero.role_badge">
            <div className="w-8 h-px bg-accent/50" />
            <span className="font-display font-semibold text-2xl md:text-4xl text-accent">
              {displayText}
              <span
                className="inline-block w-[3px] h-[1em] bg-accent ml-0.5 align-middle"
                style={{
                  animation: "blink-cursor 0.75s step-end infinite",
                }}
              />
            </span>
            <div className="w-8 h-px bg-accent/50" />
          </div>
        </div>

        {/* Tagline */}
        <p className="font-body text-white/50 text-sm md:text-base max-w-lg leading-relaxed font-light">
          Architecting high-impact solutions at the frontier of{" "}
          <span className="text-white/85 font-medium">technology</span>, driven
          by <span className="text-white/85 font-medium">research</span> and
          anchored in{" "}
          <span className="text-white/85 font-medium">strategic leadership</span>.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-1">
          <Button
            size="lg"
            onClick={scrollToProjects}
            className="group relative overflow-hidden rounded-full bg-primary px-10 py-5 text-base font-display font-bold text-primary-foreground hover:scale-105 active:scale-95 transition-all shadow-2xl"
            data-ocid="hero.explore_button"
          >
            <div className="absolute inset-0 bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 flex items-center gap-2">
              View Portfolio{" "}
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </span>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={scrollToContact}
            className="rounded-full px-8 py-5 text-base font-display font-medium text-white/55 hover:text-accent hover:bg-accent/5 transition-all"
            data-ocid="hero.contact_button"
          >
            Get In Touch
          </Button>
        </div>
      </motion.div>

      {/* ── Scroll hint ── */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25 hover:opacity-70 transition-opacity cursor-pointer"
        style={{ zIndex: 30 }}
        onClick={scrollToProjects}
        data-ocid="hero.scroll_hint"
      >
        <span className="font-body text-[9px] tracking-[0.5em] uppercase text-accent font-bold">
          Scroll
        </span>
        <div className="w-px h-9 bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
}
