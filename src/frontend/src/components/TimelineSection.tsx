import type { TimelineItem } from "@/types/portfolio";
import { useEffect, useRef, useState } from "react";

const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 1,
    date: "Mar 2025",
    title: "Publicity Head",
    organization: "IEEE Student Branch",
    description:
      "Leading publicity and outreach activities for IEEE events; increased visibility and student participation metrics across the institute.",
    type: "work",
  },
  {
    id: 2,
    date: "Sept 2024",
    title: "Core Member",
    organization: "Architechs (Web and App Development)",
    description:
      "Conducted technical workshops at managerial levels and engineered multiple institute-level software solutions.",
    type: "work",
  },
  {
    id: 3,
    date: "Aug 2024",
    title: "Core Member",
    organization: "GDSC, IIT Goa",
    description:
      "Driving technical culture through Google Developer Student Club initiatives and architecting high-impact institute projects.",
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
  sectionVisible,
}: {
  item: TimelineItem;
  index: number;
  isLeft: boolean;
  sectionVisible: boolean;
}) {
  const { ref, visible } = useIntersectionObserver(0.15);

  return (
    <div
      ref={ref}
      className={`relative flex items-center w-full mb-12 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Card Container */}
      <div
        className={`w-[calc(50%-2.5rem)] ${isLeft ? "pr-8 text-right" : "pl-8 text-left"}`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateX(0) translateY(0)"
            : `translateX(${isLeft ? "-40px" : "40px"}) translateY(20px)`,
          transition: `opacity 0.7s ease, transform 0.7s ease`,
        }}
      >
        <div
          className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-subtle hover:shadow-glow hover:border-accent/40 transition-smooth cursor-default"
          data-ocid={`timeline.item.${item.id}`}
        >
          {/* Connector arrow */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 ${
              isLeft
                ? "-right-3 border-l-card border-l-8 border-y-transparent border-y-[6px]"
                : "-left-3 border-r-card border-r-8 border-y-transparent border-y-[6px]"
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

          <span
            className={`inline-block text-[10px] font-display font-semibold tracking-widest uppercase mb-2 px-3 py-1 rounded-full border ${TYPE_ACCENT[item.type]}`}
          >
            {item.date}
          </span>

          <h3 className="font-display font-bold text-lg text-foreground leading-tight mb-0.5 group-hover:text-accent transition-colors duration-200">
            {item.title}
          </h3>

          <p className="font-body text-muted-foreground text-xs font-medium mb-2">
            {item.organization}
          </p>

          <p className="font-body text-sm text-foreground/80 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Center Dot */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 z-20">
        <div
          className="relative w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-glow transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.4)",
            transitionDelay: "0.1s",
          }}
        >
          <span className="text-accent-foreground font-display text-[10px] font-bold">
            {TYPE_ICONS[item.type]}
          </span>
          <span className="absolute inset-0 rounded-full animate-ping bg-accent/30" />
        </div>
      </div>

      {/* Spacer to maintain grid */}
      <div className="w-[calc(50%-2.5rem)]" />
    </div>
  );
}

export function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalH = section.offsetHeight;
      const scrolled = Math.max(0, windowH - rect.top);
      const fraction = Math.min(1, scrolled / (totalH + windowH * 0.2));
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
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
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
            Leading by example — from Google Developer Student Clubs to national IEEE representation.
          </p>

          <div className="mt-6 flex justify-center">
            <div
              className="h-1 rounded-full bg-gradient-to-r from-accent/60 via-primary to-accent/60 transition-all duration-1000"
              style={{ width: sectionVisible ? "120px" : "0px" }}
            />
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-border/20 rounded-full" />
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 top-4 w-[3.5px] rounded-full bg-gradient-to-b from-accent via-primary to-accent/60 transition-none z-10"
            style={{
              height: `${lineHeight}%`,
              transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 0 12px 2px oklch(0.72 0.24 270 / 0.35)",
            }}
          />

          <div className="flex flex-col gap-0">
            {TIMELINE_ITEMS.map((item, index) => (
              <TimelineCard
                key={item.id}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
                sectionVisible={sectionVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
