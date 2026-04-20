import { Badge } from "@/components/ui/badge";
import { Code2, FlaskConical, Users } from "lucide-react";
import { useEffect, useRef } from "react";
import { Markdown } from "@/components/ui/Markdown";

// ── Types ──────────────────────────────────────────────────────────────────
interface ExperienceArea {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string; // tailwind utility base name for glow tint
}

// ── Data ───────────────────────────────────────────────────────────────────
const EXPERIENCES: ExperienceArea[] = [
  {
    icon: <Code2 size={28} />,
    title: "Coding",
    subtitle: "Competitive Programming & Open Source",
    description:
      "Solved 600+ problems across Codeforces, LeetCode, and CodeChef. Contributor to open-source ML toolkits. Passionate about algorithmic thinking and writing clean, scalable code.",
    tags: ["C++", "Python", "Algorithms", "Open Source", "CP"],
    color: "accent",
  },
  {
    icon: <FlaskConical size={28} />,
    title: "Research",
    subtitle: "ML / NLP & Data Science",
    description:
      "Conducted research in Natural Language Processing and applied machine learning at IIT Goa. Published work on sentiment analysis pipelines and low-resource language modelling.",
    tags: ["NLP", "PyTorch", "HuggingFace", "Data Science", "Research"],
    color: "primary",
  },
  {
    icon: <Users size={28} />,
    title: "Leadership",
    subtitle: "Mentoring & Team Strategy",
    description:
      "Led cross-functional teams of 15+ students as student body representative. Mentored junior coders in competitive programming. Defined strategy for multiple hackathon-winning projects.",
    tags: ["Mentoring", "Strategy", "Hackathons", "Team Lead", "IIT Goa"],
    color: "accent",
  },
];

// ── Particle canvas (constant ambient animation) ───────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    interface Particle {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      alpha: number;
      dAlpha: number;
    }

    const particles: Particle[] = [];
    const COUNT = 55;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function spawn(): Particle {
      if (!canvas)
        return { x: 0, y: 0, r: 2, vx: 0, vy: 0, alpha: 0.5, dAlpha: 0.005 };
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 1.5 + Math.random() * 3,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.5,
        alpha: 0.15 + Math.random() * 0.5,
        dAlpha: 0.002 + Math.random() * 0.004,
      };
    }

    resize();
    for (let i = 0; i < COUNT; i++) particles.push(spawn());

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.dAlpha;
        if (p.alpha > 0.7 || p.alpha < 0.05) p.dAlpha *= -1;

        // Wrap edges
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        const alphaStr = p.alpha.toString();
        grad.addColorStop(0, `oklch(0.72 0.24 270 / ${alphaStr})`);
        grad.addColorStop(1, "oklch(0.72 0.24 270 / 0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      tabIndex={-1}
      aria-hidden="true"
    />
  );
}

// ── Rotating gradient ring (large decorative element) ─────────────────────
function RotatingRing() {
  return (
    <div
      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[480px] h-[480px] pointer-events-none"
      aria-hidden="true"
      style={{ animation: "spin 18s linear infinite" }}
    >
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent/20" />
      {/* Mid ring — counter-spin */}
      <div
        className="absolute inset-8 rounded-full border border-primary/30"
        style={{ animation: "spin 12s linear infinite reverse" }}
      />
      {/* Inner glowing orb */}
      <div className="absolute inset-[30%] rounded-full bg-accent/10 blur-xl animate-pulse-glow" />
      {/* Orbital dot */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent shadow-glow"
        style={{
          transformOrigin: "50% 240px",
          animation: "spin 18s linear infinite",
        }}
        role="presentation"
      />
    </div>
  );
}

// ── Experience card ────────────────────────────────────────────────────────
interface CardProps {
  area: ExperienceArea;
  index: number;
}

function ExperienceCard({ area, index }: CardProps) {
  const delay = `${index * 0.15}s`;
  return (
    <div
      data-ocid={`experience.card.${index + 1}`}
      className="group relative rounded-2xl border border-border bg-card/70 backdrop-blur-sm p-8 flex flex-col gap-5 hover:border-accent/50 hover:shadow-glow transition-smooth animate-fade-in-up overflow-hidden"
      style={{ animationDelay: delay }}
    >
      {/* Background gradient sweep on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-smooth rounded-2xl" />

      {/* Icon circle */}
      <div className="relative z-10 w-14 h-14 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent/25 group-hover:scale-105 transition-bounce">
        {area.icon}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1">
        <h3 className="font-display font-bold text-2xl text-foreground mb-1">
          {area.title}
        </h3>
        <p className="font-body text-sm text-accent font-medium mb-3">
          {area.subtitle}
        </p>
        <Markdown 
          className="text-sm prose-p:leading-relaxed"
          content={area.description}
        />

      </div>

      {/* Tags */}
      <div className="relative z-10 flex flex-wrap gap-2">
        {area.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="text-xs font-body bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────
export function ExperienceSection() {
  return (
    <section
      id="experience"
      data-ocid="experience.section"
      className="relative py-28 overflow-hidden"
    >
      {/* Constant ambient particle field */}
      <ParticleCanvas />

      {/* Decorative rotating ring — always spinning */}
      <RotatingRing />

      {/* Floating orbs — always moving */}
      <div
        className="absolute left-0 top-1/4 w-56 h-56 rounded-full bg-primary/10 blur-3xl animate-float pointer-events-none"
        aria-hidden="true"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute left-1/4 bottom-10 w-36 h-36 rounded-full bg-accent/15 blur-2xl animate-float pointer-events-none"
        aria-hidden="true"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute left-2/3 top-10 w-24 h-24 rounded-full bg-primary/20 blur-xl animate-float pointer-events-none"
        aria-hidden="true"
        style={{ animationDelay: "0.8s" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="font-body text-accent text-sm font-semibold tracking-widest uppercase mb-3">
            What I Do
          </p>
          <h2
            className="font-display font-bold text-5xl md:text-6xl text-gradient-purple mb-5"
            data-ocid="experience.title"
          >
            Experience
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-border" />
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
            <span className="h-px w-16 bg-border" />
          </div>
        </div>

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          data-ocid="experience.list"
        >
          {EXPERIENCES.map((area, i) => (
            <ExperienceCard key={area.title} area={area} index={i} />
          ))}
        </div>
      </div>

      {/* Inline keyframes for spin (not in tailwind default) */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
