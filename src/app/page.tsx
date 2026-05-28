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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aung Lin Htet",
  url: "https://aunglintet.com",
  jobTitle: "AI Developer",
  description:
    "AI Developer and Web Builder based in Singapore. I build AI tools, web apps, and automation systems — and ship them solo.",
  sameAs: [
    "https://github.com/SugarAung",
    "https://www.tiktok.com/@thealhstudio",
    "https://www.youtube.com/@ALH_Studio",
  ],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
