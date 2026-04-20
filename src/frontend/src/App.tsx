import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { Layout } from "@/components/Layout";
import { ProjectsSection } from "@/components/ProjectsSection";
import { TimelineSection } from "@/components/TimelineSection";

export default function App() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TimelineSection />
      <ExperienceSection />
      <ContactSection />
    </Layout>
  );
}
