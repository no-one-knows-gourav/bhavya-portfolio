import React from "react";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

function Header() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        scrolled
          ? "bg-card/90 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          type="button"
          onClick={() => scrollTo("#hero")}
          className="font-display font-bold text-xl text-primary tracking-tight hover:text-accent transition-colors duration-200"
          data-ocid="nav.brand_link"
        >
          Bhavya Bharadwaj
        </button>
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => scrollTo(link.href)}
              className="font-body text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
              data-ocid={`nav.${link.label.toLowerCase()}_link`}
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent rounded-full group-hover:w-full transition-all duration-300" />
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollTo("#contact")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium font-body hover:bg-primary/90 transition-bounce shadow-sm"
            data-ocid="nav.contact_button"
          >
            Say Hello ✨
          </button>
        </nav>
        {/* Mobile nav */}
        <div className="md:hidden flex items-center gap-2">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => scrollTo(link.href)}
              className="text-xs font-body text-muted-foreground hover:text-primary transition-colors"
              data-ocid={`nav.mobile.${link.label.toLowerCase()}_link`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-black/40 border-t border-white/10 backdrop-blur-md py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-0.5">
          <p className="font-display text-lg font-bold text-primary">
            Bhavya Bharadwaj
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Indian Institute of Technology, Goa
          </p>
        </div>
        <p className="font-body text-sm text-muted-foreground text-center">
          © {year}. Built with love using{" "}
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-primary transition-colors underline underline-offset-2"
          >
            caffeine.ai
          </a>
        </p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() =>
              document
                .querySelector("#hero")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-xs font-body text-muted-foreground hover:text-primary transition-colors"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* ── Fixed cityscape background ── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage: "url('/assets/images/cityscape.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px) brightness(0.65) saturate(0.8)",
          transform: "scale(1.04)", // prevents blur edge bleed
        }}
      />
      {/* Dark purple colour wash over the cityscape */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(135deg, oklch(0.14 0.04 280 / 0.60) 0%, oklch(0.10 0.06 270 / 0.68) 100%)",
        }}
      />

      {/* Page content — sits above the fixed backdrop */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
