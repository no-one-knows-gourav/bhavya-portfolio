import { motion } from "motion/react";
import { useRef } from "react";

interface Project {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  techs: string[];
  outcome: string;
  color: string;
}

const PROJECTS: Project[] = [
  {
    id: "purpleai",
    title: "PurpleAI",
    tagline: "ML-powered conversational intelligence",
    icon: "🤖",
    techs: ["Python", "FastAPI", "TensorFlow", "React"],
    outcome:
      "Built an AI chatbot achieving 91% intent accuracy with real-time streaming responses and sub-200ms latency.",
    color: "from-violet-600/40 to-purple-800/60",
  },
  {
    id: "algovault",
    title: "AlgoVault",
    tagline: "Competitive programming progress tracker",
    icon: "⚡",
    techs: ["C++", "React", "Firebase", "Node.js"],
    outcome:
      "Helped 500+ competitive programmers visualize growth across 10 platforms with smart performance insights.",
    color: "from-indigo-600/40 to-purple-700/60",
  },
  {
    id: "datalens",
    title: "DataLens",
    tagline: "Interactive data visualization dashboard",
    icon: "📊",
    techs: ["Python", "Pandas", "Plotly", "Flask"],
    outcome:
      "Reduced analyst reporting time by 60% with a self-serve BI dashboard supporting 20+ chart types.",
    color: "from-purple-600/40 to-fuchsia-700/60",
  },
  {
    id: "leadher",
    title: "LeadHer",
    tagline: "Women-in-tech community platform",
    icon: "🌸",
    techs: ["React", "Node.js", "MongoDB", "AWS"],
    outcome:
      "Connected 2,000+ women in tech with mentorship matching, job boards, and community events.",
    color: "from-pink-600/30 to-purple-700/60",
  },
  {
    id: "researchbot",
    title: "ResearchBot",
    tagline: "Automated academic paper summarizer",
    icon: "🔬",
    techs: ["Python", "NLP", "Hugging Face", "LangChain"],
    outcome:
      "Summarizes 50-page research papers in under 10 seconds with 94% factual retention using RAG pipelines.",
    color: "from-violet-700/40 to-purple-900/60",
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
        className="relative w-full h-72 transition-all duration-700"
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
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.color} border border-primary/30 shadow-card-hover flex flex-col items-center justify-center gap-4 px-6 text-center overflow-hidden`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Ambient glow blob */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-8 w-28 h-28 rounded-full bg-primary/30 blur-3xl pointer-events-none" />

          <span className="text-5xl drop-shadow-lg animate-pulse-glow">
            {project.icon}
          </span>
          <h3 className="font-display font-bold text-2xl text-foreground tracking-tight">
            {project.title}
          </h3>
          <p className="font-body text-sm text-muted-foreground leading-snug">
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
          className="absolute inset-0 rounded-2xl bg-card border border-accent/30 shadow-card-hover flex flex-col justify-between px-6 py-7 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

          <div>
            <p className="font-display font-bold text-lg text-foreground mb-1">
              {project.title}
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
              {project.outcome}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.techs.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40 font-mono text-xs text-accent font-medium"
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
      className="py-28 bg-background relative overflow-hidden"
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
