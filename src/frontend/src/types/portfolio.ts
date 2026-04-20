export interface ProjectCard {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  category: string;
  color: string;
  icon: string;
  link?: string;
}

export interface TimelineItem {
  id: number;
  date: string;
  title: string;
  organization: string;
  description: string;
  type: "education" | "work" | "achievement";
}

export interface SocialLink {
  id: number;
  label: string;
  url: string;
  icon: string;
  color: string;
}

export interface ExperienceOrb {
  id: number;
  size: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}
