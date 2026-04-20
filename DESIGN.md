# Design Brief

## Direction

Premium portfolio for Bhavya Bharadwaj (IIT Goa) — refined CEO-style aesthetic with ambitious visual presence and smooth interactive choreography.

## Tone

Luxury minimalism with editorial flair — maximalist in composition but disciplined in color, balancing professional confidence with contemporary warmth.

## Differentiation

Animated flip cards reveal technical depth, ambient floating objects maintain visual interest, and scroll-triggered animations create a gallery-like experience rather than traditional portfolio.

## Color Palette

| Token      | OKLCH           | Role                                   |
| ---------- | --------------- | -------------------------------------- |
| background | 0.98 0.008 280  | Clean light cream (cool undertone)     |
| foreground | 0.16 0.015 280  | Deep purple-black text                 |
| primary    | 0.65 0.22 280   | Deep violet (CEO accent, CTAs)         |
| accent     | 0.75 0.18 270   | Lavender highlight (interactive, lips) |
| card       | 1.0 0.004 280   | Pure white cards (elevated)            |
| muted      | 0.94 0.01 280   | Soft background tint                   |
| destructive| 0.55 0.22 25    | Alert coral                            |

## Typography

- Display: Space Grotesk — geometric, modern, section headings and hero text
- Body: Bricolage Grotesque — soft rounded, friendly yet professional for descriptions/labels
- Scale: hero `text-6xl md:text-7xl font-bold tracking-tight`, h2 `text-4xl font-bold`, label `text-sm font-semibold tracking-widest uppercase`, body `text-base`

## Elevation & Depth

Cards elevated via subtle shadow and border hint; depth layering through section background alternation and white card prominence against light background.

## Structural Zones

| Zone     | Background          | Border    | Notes                              |
| -------- | ------------------- | --------- | ---------------------------------- |
| Header   | bg-background       | border-b  | Hero section with name, roles      |
| Content  | Alternate: bg-card  | —         | White cards on bg, muted on bg     |
| Projects | bg-card             | subtle    | Flip animation on hover            |
| Timeline | bg-muted 0.5        | lavender  | Animated load lines, position dots |
| Exp.     | bg-background       | —         | Ambient floating shapes            |
| Footer   | bg-muted 0.3        | border-t  | Contact + social links             |

## Spacing & Rhythm

Generous gaps (6rem–8rem) between sections, 1.5rem padding within cards, micro-spacing on badges and labels; rhythm created by alternating section backgrounds and animated entrance staggering.

## Component Patterns

- Buttons: primary (deep purple bg, white text, hover lavender accent glow), secondary (border only, hover bg-muted)
- Cards: rounded-lg (0.75rem), white bg, subtle shadow, flip animation on project cards
- Badges: pill-shaped, outline lavender with dark text or filled lavender with white text
- Timeline dots: lavender, animated pulse on load

## Motion

- Entrance: fade-in-up (0.6s ease-out) staggered per section
- Hover: smooth transition (0.3s), subtle scale (1.05) or shadow lift on cards, lavender glow on buttons
- Decorative: flip cards (0.6s cubic-bezier), floating (3s infinite), pulse-glow (2s infinite), timeline fill (1.5s ease-out)

## Constraints

- No gradients on text (only solid color)
- Lavender accent used sparingly (CTAs, hover states, highlights, badges)
- All animations favor cubic-bezier for polish over default easing
- Dark mode palette: inverse lightness, same hue, higher chroma on primary/accent

## Signature Detail

Animated flip cards that rotate to reveal tech stack — marries visual depth with functional interactivity and creates memorable micro-interaction.
