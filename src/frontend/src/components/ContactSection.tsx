import type { SocialLink } from "@/types/portfolio";
import { ArrowUpRight, Linkedin, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
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

export function ContactSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="contact"
      className="relative py-28 overflow-hidden"
      data-ocid="contact.section"
    >
      {/* Ambient background blobs */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/20 blur-[80px] animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-72 h-72 rounded-full bg-accent/10 blur-[60px] animate-float"
        aria-hidden="true"
        style={{ animationDelay: "1.2s" }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-0 w-48 h-48 rounded-full bg-primary/15 blur-[50px] animate-float"
        aria-hidden="true"
        style={{ animationDelay: "0.4s" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center text-center animate-fade-in-up">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/20 border border-accent/30 text-accent font-body text-xs font-semibold tracking-widest uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Available for Opportunities
        </span>

        {/* Section title */}
        <h2 className="font-display font-bold text-5xl md:text-6xl text-gradient-purple mb-4 leading-tight">
          Let's Talk
        </h2>

        {/* Tagline */}
        <p className="font-body text-muted-foreground text-lg md:text-xl mb-14 max-w-lg">
          Let's build something{" "}
          <span className="text-accent font-semibold">remarkable</span>{" "}
          together. I'm always open to interesting conversations and
          collaborations.
        </p>

        {/* Email card */}
        <a
          href={`mailto:${EMAIL}`}
          data-ocid="contact.email_button"
          className="group relative flex items-center gap-4 w-full max-w-md px-7 py-5 rounded-2xl
            bg-card border border-border/60
            hover:border-accent/50
            shadow-card-hover hover:shadow-glow
            transition-smooth cursor-pointer mb-14
            overflow-hidden"
          aria-label={`Send email to ${EMAIL}`}
        >
          {/* Hover shimmer */}
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth
              bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10"
            aria-hidden="true"
          />
          <span className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-smooth flex-shrink-0">
            <Mail className="w-5 h-5 text-accent" />
          </span>
          <span className="relative flex flex-col items-start min-w-0">
            <span className="font-body text-xs text-muted-foreground tracking-widest uppercase mb-0.5">
              Reach me at
            </span>
            <span className="font-display font-semibold text-foreground text-base truncate">
              {EMAIL}
            </span>
          </span>
          <ArrowUpRight className="relative ml-auto w-5 h-5 text-accent opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-smooth flex-shrink-0" />
        </a>

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
                    boxShadow: `0 0 20px 4px ${social.color}44`,
                  }}
                  aria-hidden="true"
                />
              )}
              <SocialIcon icon={social.icon} />
            </a>
          ))}
        </div>

        {/* Subtle divider */}
        <div className="mt-16 w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </section>
  );
}
