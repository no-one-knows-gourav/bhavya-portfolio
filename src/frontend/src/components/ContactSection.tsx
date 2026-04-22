import type { SocialLink } from "@/types/portfolio";
import { ArrowUpRight, Linkedin, Mail, Sparkles, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { SiGithub } from "react-icons/si";

const socials: SocialLink[] = [
  {
    id: 1,
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/bhavya-bharadwaj-95949532b/",
    icon: "linkedin",
    color: "oklch(0.72 0.16 230)",
  },
  {
    id: 2,
    label: "GitHub",
    url: "https://github.com/BinaryBlitz08",
    icon: "github",
    color: "oklch(0.82 0.02 280)",
  },
];

const EMAIL = "bhavya.bharadwaj.24031@iitgoa.ac.in";

function SocialIcon({ icon }: { icon: string }) {
  if (icon === "linkedin") return <Linkedin className="w-5 h-5" />;
  if (icon === "github") return <SiGithub className="w-5 h-5" />;
  return null;
}

// ── Particle canvas for contact section background ───────────────────────────
function ContactParticleCanvas() {
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
    const COUNT = 40;

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
        r: 1 + Math.random() * 2,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.1 - Math.random() * 0.3,
        alpha: 0.1 + Math.random() * 0.4,
        dAlpha: 0.001 + Math.random() * 0.003,
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
        if (p.alpha > 0.6 || p.alpha < 0.05) p.dAlpha *= -1;

        // Wrap edges
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2);
        const alphaStr = p.alpha.toString();
        // Uses a pinkish/accent color for particles here
        grad.addColorStop(0, `oklch(0.78 0.2 280 / ${alphaStr})`);
        grad.addColorStop(1, "oklch(0.78 0.2 280 / 0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
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
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      tabIndex={-1}
      aria-hidden="true"
    />
  );
}

export function ContactSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    const encodedMessage = encodeURIComponent(message);
    window.location.href = `mailto:${EMAIL}?subject=Hello Bhavya!&body=${encodedMessage}`;
  };

  return (
    <section
      id="contact"
      className="relative py-28 overflow-hidden"
      data-ocid="contact.section"
    >
      <ContactParticleCanvas />

      {/* Ambient background blobs */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/20 blur-[80px] animate-pulse-glow z-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-72 h-72 rounded-full bg-accent/10 blur-[60px] animate-float z-0"
        aria-hidden="true"
        style={{ animationDelay: "1.2s" }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-0 w-48 h-48 rounded-full bg-primary/15 blur-[50px] animate-float z-0"
        aria-hidden="true"
        style={{ animationDelay: "0.4s" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center text-center animate-fade-in-up">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/20 border border-accent/30 text-accent font-body text-xs font-semibold tracking-widest uppercase mb-6 shadow-glow">
          <Sparkles className="w-3.5 h-3.5" />
          Available for Opportunities
        </span>

        {/* Section title */}
        <h2 className="font-display font-bold text-5xl md:text-6xl text-gradient-purple mb-4 leading-tight">
          Let's Talk
        </h2>

        {/* Tagline */}
        <p className="font-body text-muted-foreground text-lg md:text-xl mb-12 max-w-lg">
          Let's build something{" "}
          <span className="text-accent font-semibold">remarkable</span>{" "}
          together. I'm always open to interesting conversations and
          collaborations.
        </p>

        {/* Message Input Area */}
        <div className="w-full max-w-md flex flex-col gap-4 mb-14 relative group">
          <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl group-hover:bg-primary/10 transition-smooth pointer-events-none" />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="relative w-full h-32 px-5 py-4 bg-black border border-border/80 rounded-2xl font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-smooth resize-none shadow-subtle backdrop-blur-sm"
          />
          <button
            onClick={handleSendMessage}
            className="relative flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-primary text-primary-foreground font-display font-bold hover:bg-primary/90 transition-bounce shadow-card-hover overflow-hidden group/btn"
          >
            <span className="absolute inset-0 bg-accent/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 flex items-center gap-2">
              <Send className="w-4 h-4" />
              Open in Mail
            </span>
          </button>
        </div>

        {/* Social links */}
        <div
          className="flex items-center gap-5"
          data-ocid="contact.social_list"
        >
          {socials.map((social, idx) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`contact.social.${idx + 1}`}
              aria-label={social.label}
              onMouseEnter={() => setHovered(social.id)}
              onMouseLeave={() => setHovered(null)}
              className="relative flex items-center justify-center w-14 h-14 rounded-2xl
                bg-card border border-border/60
                text-muted-foreground
                hover:border-accent/50 hover:text-accent
                hover:shadow-glow hover:scale-110
                transition-bounce cursor-pointer"
            >
              {/* Glow ring on hover */}
              {hovered === social.id && (
                <span
                  className="absolute inset-0 rounded-2xl animate-pulse-glow"
                  style={{
                    boxShadow: `0 0 20px 4px ${social.color}66`,
                  }}
                  aria-hidden="true"
                />
              )}
              <SocialIcon icon={social.icon} />
            </a>
          ))}
        </div>

        {/* Subtle divider */}
        <div className="mt-16 w-32 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>
    </section>
  );
}
