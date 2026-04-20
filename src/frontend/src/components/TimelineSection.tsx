import type { TimelineItem } from "@/types/portfolio";
import { useEffect, useRef, useState } from "react";

const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 1,
    date: "2023 – Present",
    title: "Technical Lead",
    organization: "IIT Goa Coding Club",
    description:
      "Steering 200+ member club through technical initiatives, hackathons, and peer-learning programs. Architecting curriculum for full-stack and competitive programming tracks.",
    type: "work",
  },
  {
    id: 2,
    date: "Summer 2023",
    title: "Research Intern",
    organization: "National Institute of Oceanography",
    description:
      "Developed ML-driven data pipelines to analyse oceanic sensor readings. Published findings contributing to climate pattern modelling research.",
    type: "work",
  },
  {
    id: 3,
    date: "2022 – 2023",
    title: "Analyst Intern",
    organization: "XYZ Fintech Startup",
    description:
      "Built data-driven dashboards tracking KPIs across product lines. Translated complex financial datasets into actionable insights for C-suite stakeholders.",
    type: "work",
  },
  {
    id: 4,
    date: "2022 – Present",
    title: "Strategy Mentor",
    organization: "Women in Tech · IIT Goa",
    description:
      "Mentoring the next generation of women engineers through one-on-one coaching, resume reviews, and strategy sessions on breaking into top tech roles.",
    type: "work",
  },
  {
    id: 5,
    date: "2021 – 2022",
    title: "Core Team Member",
    organization: "Google Developer Student Club",
    description:
      "Organised Google-sponsored workshops, speaker sessions, and open-source sprints that reached 500+ students across campus.",
    type: "work",
  },
];

const TYPE_ICONS: Record<string, string> = {
  work: "◈",
  education: "◉",
  achievement: "★",
};

const TYPE_ACCENT: Record<string, string> = {
  work: "bg-accent/20 border-accent/40 text-accent",
  education: "bg-primary/20 border-primary/40 text-primary-foreground",
  achievement: "bg-secondary border-border text-foreground",
};

function useIntersectionObserver(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function TimelineCard({
  item,
  index,
  isLeft,
}: {
  item: TimelineItem;
  index: number;
  isLeft: boolean;
}) {
  const { ref, visible } = useIntersectionObserver(0.15);

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-0 w-full ${isLeft ? "flex-row" : "flex-row-reverse"}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0) translateY(0)"
          : `translateX(${isLeft ? "-40px" : "40px"}) translateY(20px)`,
        transition: `opacity 0.7s ease ${index * 0.18}s, transform 0.7s ease ${index * 0.18}s`,
      }}
    >
      {/* Card */}
      <div
        className={`w-[calc(50%-2.5rem)] ${isLeft ? "pr-0 text-right" : "pl-0 text-left"}`}
      >
        <div
          className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-subtle hover:shadow-glow hover:border-accent/40 transition-smooth cursor-default"
          data-ocid={`timeline.item.${item.id}`}
        >
          {/* Connector arrow */}
          <div
            className={`absolute top-5 ${
              isLeft
                ? "-right-3 border-l-card border-l-8 border-y-transparent border-y-[6px] border-r-0"
                : "-left-3 border-r-card border-r-8 border-y-transparent border-y-[6px] border-l-0"
            } w-0 h-0`}
            style={{
              borderStyle: "solid",
              borderTopWidth: 6,
              borderBottomWidth: 6,
              borderTopColor: "transparent",
              borderBottomColor: "transparent",
              ...(isLeft
                ? {
                    borderLeftWidth: 12,
                    borderLeftColor: "oklch(var(--card))",
                    borderRightWidth: 0,
                  }
                : {
                    borderRightWidth: 12,
                    borderRightColor: "oklch(var(--card))",
                    borderLeftWidth: 0,
                  }),
            }}
          />

          {/* Date badge */}
          <span
            className={`inline-block text-xs font-display font-semibold tracking-widest uppercase mb-2 px-3 py-1 rounded-full border ${TYPE_ACCENT[item.type]}`}
          >
            {item.date}
          </span>

          {/* Role */}
          <h3 className="font-display font-bold text-lg text-foreground leading-tight mb-0.5 group-hover:text-accent transition-colors duration-200">
            {item.title}
          </h3>

          {/* Org */}
          <p className="font-body text-muted-foreground text-sm font-medium mb-3">
            {item.organization}
          </p>

          {/* Description */}
          <p className="font-body text-sm text-foreground/80 leading-relaxed">
            {item.description}
          </p>

          {/* Loading bar — decorative shimmer */}
          <div
            className="absolute bottom-0 left-0 h-[3px] rounded-b-2xl bg-gradient-to-r from-accent/60 to-primary/60 transition-all duration-1000"
            style={{ width: visible ? "100%" : "0%" }}
          />
        </div>
      </div>

      {/* Spacer for centre line */}
      <div className="w-20 flex-shrink-0" />
    </div>
  );
}

function TimelineDot({
  index,
  visible,
  icon,
}: {
  index: number;
  visible: boolean;
  icon: string;
}) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
      style={{ top: `${index * 200 + 24}px` }}
    >
      <div
        className="relative w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-glow z-10 transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.4)",
          transitionDelay: `${index * 0.18 + 0.1}s`,
        }}
        data-ocid={`timeline.dot.${index + 1}`}
      >
        <span className="text-accent-foreground font-display text-xs font-bold">
          {icon}
        </span>

        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full animate-ping bg-accent/30"
          style={{
            animationDuration: "2.4s",
            animationDelay: `${index * 0.3}s`,
          }}
        />
      </div>
    </div>
  );
}

export function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);

  // Grow the timeline line based on scroll position
  useEffect(() => {
    const section = sectionRef.current;
    const lineEl = lineRef.current;
    if (!section || !lineEl) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalH = section.offsetHeight;

      const scrolled = Math.max(0, windowH - rect.top);
      const fraction = Math.min(1, scrolled / (totalH + windowH * 0.5));
      setLineHeight(fraction * 100);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSectionVisible(true);
      },
      { threshold: 0.05 },
    );
    observer.observe(section);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="timeline"
      className="py-28 relative overflow-hidden"
      data-ocid="timeline.section"
      ref={sectionRef}
    >
      {/* Ambient background orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div
          className="text-center mb-20"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p className="font-body text-accent tracking-[0.25em] uppercase text-xs font-semibold mb-4">
            Career Journey
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Positions & <span className="text-gradient-purple">Leadership</span>
          </h2>
          <p className="font-body text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            Every role a chapter — building expertise, driving impact, mentoring
            the next wave.
          </p>

          {/* Decorative underline */}
          <div className="mt-6 flex justify-center">
            <div
              className="h-1 rounded-full bg-gradient-to-r from-accent/60 via-primary to-accent/60 transition-all duration-1000"
              style={{ width: sectionVisible ? "120px" : "0px" }}
            />
          </div>
        </div>

        {/* Timeline container */}
        <div
          className="relative"
          style={{ minHeight: `${TIMELINE_ITEMS.length * 200 + 80}px` }}
        >
          {/* Vertical track (background) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-border/40 rounded-full" />

          {/* Animated fill line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[3px] rounded-full bg-gradient-to-b from-accent via-primary to-accent/60 transition-none"
            style={{
              height: `${lineHeight}%`,
              transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 0 12px 2px oklch(0.72 0.24 270 / 0.35)",
            }}
          />

          {/* Dots layer */}
          {TIMELINE_ITEMS.map((item, index) => (
            <TimelineDot
              key={item.id}
              index={index}
              visible={sectionVisible}
              icon={TYPE_ICONS[item.type]}
            />
          ))}

          {/* Cards */}
          <div className="flex flex-col gap-0">
            {TIMELINE_ITEMS.map((item, index) => (
              <div
                key={item.id}
                style={{
                  marginBottom:
                    index < TIMELINE_ITEMS.length - 1 ? "2.5rem" : "0",
                }}
              >
                <TimelineCard
                  item={item}
                  index={index}
                  isLeft={index % 2 === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
