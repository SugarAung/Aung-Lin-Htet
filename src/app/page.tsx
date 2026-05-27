import Hero from "@/components/sections/home/Hero";
import IdentityScroll from "@/components/sections/home/IdentityScroll";
import ExperienceTimeline from "@/components/sections/home/ExperienceTimeline";
import CertSkills from "@/components/sections/home/CertSkills";
import AIProjects from "@/components/sections/home/AIProjects";
import ClientWebsites from "@/components/sections/home/ClientWebsites";
import AILab from "@/components/sections/home/AILab";
import Roadmap from "@/components/sections/home/Roadmap";
import Studio from "@/components/sections/home/Studio";
import HomeContact from "@/components/sections/home/HomeContact";

export default function Home() {
  return (
    <main>
      <Hero />
      <IdentityScroll />
      <ExperienceTimeline />
      <CertSkills />
      <AIProjects />
      <ClientWebsites />
      <AILab />
      <Roadmap />
      <Studio />
      <HomeContact />
    </main>
  );
}
