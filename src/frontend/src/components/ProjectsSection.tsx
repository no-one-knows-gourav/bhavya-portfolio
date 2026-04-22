import { motion } from "motion/react";
import { useRef } from "react";
import { Markdown } from "@/components/ui/Markdown";
import { Map, TrendingUp, Bot, Plane, ShoppingCart, Network } from "lucide-react";

interface Project {
  id: string;
  title: string;
  tagline: string;
  techs: string[];
  outcome: string;
  icon: React.ReactNode;
}

const PROJECTS: Project[] = [
  {
    id: "ecomiles",
    title: "EcoMiles",
    tagline: "Pollution-aware navigation system",
    techs: ["FastAPI", "Angular", "Google Cloud", "RESTful APIs"],
    outcome:
      "Built a full-stack navigation app for least-pollution routes; secured top 20 out of 450+ teams in Clear Skies Challenge 2025.",
    icon: <Map className="w-8 h-8" />,
  },
  {
    id: "investment-system",
    title: "AI Investment Decision System",
    tagline: "Real-time market ingestion & LLM analysis",
    techs: ["Python", "FastAPI", "LLMs", "Streaming"],
    outcome:
      "Engineered real-time stock data ingestion, reducing alert latency by 17%. Built LLM-based prediction microservices (Inter-IIT 14.0).",
    icon: <TrendingUp className="w-8 h-8" />,
  },
  {
    id: "farmers-bot",
    title: "Farmers Bot",
    tagline: "Multilingual voice-activated agricultural assistant",
    techs: ["Google TTS/STT", "FastAPI", "Mobile"],
    outcome:
      "Developed a multilingual app for voice queries; achieved 92% user satisfaction validated by door-to-door feedback (GDSC IIT Goa).",
    icon: <Bot className="w-8 h-8" />,
  },
  {
    id: "airwise",
    title: "AirWise",
    tagline: "Full-stack flight booking with dynamic pricing",
    techs: ["Angular", "Node.js", "Express", "MongoDB"],
    outcome:
      "Built booking platform with dynamic surge pricing, wallet payments, and PNR generation; deployed live on Vercel.",
    icon: <Plane className="w-8 h-8" />,
  },
  {
    id: "swiftcart",
    title: "SwiftCart",
    tagline: "Architected e-commerce ecosystem",
    techs: ["Angular", "Express.js", "MongoDB", "Stripe"],
    outcome:
      "Architected full-stack e-commerce app with global search and Stripe gateway integration (Architechs IIT Goa).",
    icon: <ShoppingCart className="w-8 h-8" />,
  },
  {
    id: "netscope",
    title: "NetScope",
    tagline: "Real-time network topology & activity detection",
    techs: ["Python", "Scapy", "Networks"],
    outcome:
      "Architected a monitoring system displaying topology despite AP isolation; compatible with all broadband, IPv4, and IPv6.",
    icon: <Network className="w-8 h-8" />,
  },
];

function FlipCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.12 }}
      className="group"
      style={{ perspective: "1000px" }}
      data-ocid={`projects.card.${index + 1}`}
    >
      <div
        ref={cardRef}
        className="relative w-full h-64 transition-all duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateY(0deg)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform =
            "rotateY(180deg)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "rotateY(0deg)";
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-card-hover flex flex-col items-center justify-center gap-4 px-6 text-center overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Ambient glow blob */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-8 w-28 h-28 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          {/* Dynamic project icon */}
          <div className="relative w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-2">
            <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-xl animate-pulse-glow" />
            <div className="relative text-accent">
              {project.icon}
            </div>
          </div>

          <h3 className="font-display font-bold text-2xl text-foreground tracking-tight">
            {project.title}
          </h3>
          <p className="font-body text-sm text-muted-foreground leading-snug px-4">
            {project.tagline}
          </p>

          <div className="absolute bottom-4 right-4 opacity-40 group-hover:opacity-60 transition-opacity">
            <span className="font-mono text-xs text-accent">
              hover to flip →
            </span>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-card-hover flex flex-col justify-between px-5 py-6 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

          <div className="flex-1">
            <p className="font-display font-bold text-base text-foreground mb-1 leading-tight">
              {project.title}
            </p>
            <Markdown 
              className="text-sm prose-p:leading-relaxed"
              content={project.outcome}
            />

          </div>

          <div className="flex flex-wrap gap-2">
            {project.techs.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 font-mono text-[10px] text-accent font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="py-28 relative overflow-hidden"
    >
      {/* Background decorative orbs */}
      <div className="absolute top-10 left-1/3 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-56 h-56 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-accent tracking-widest uppercase text-sm font-semibold mb-3">
            What I've Built
          </p>
          <h2 className="font-display font-bold text-5xl md:text-6xl text-foreground mb-4">
            Projects
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Hover each card to reveal the technology stack and outcomes behind
            every build.
          </p>

          {/* Decorative underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-5 h-0.5 w-24 rounded-full bg-gradient-to-r from-primary to-accent origin-center"
          />
        </motion.div>

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
          data-ocid="projects.list"
        >
          {PROJECTS.map((project, i) => (
            <FlipCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
