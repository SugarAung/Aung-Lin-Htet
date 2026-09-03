import Hero from "@/components/sections/home/Hero";
import About from "@/components/sections/home/About";
import IdentityScroll from "@/components/sections/home/IdentityScroll";
import ExperienceTimeline from "@/components/sections/home/ExperienceTimeline";
import Roadmap from "@/components/sections/home/Roadmap";
import Studio from "@/components/sections/home/Studio";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aung Lin Htet",
  url: "https://aunglinhtet.com",
  jobTitle: "Student & Content Creator",
  description:
    "SUTD scholarship student documenting the journey of building toward owning a business by graduation. Consistency over talent, shown in public.",
  sameAs: [
    "https://github.com/SugarAung",
    "https://www.tiktok.com/@thealhstudio",
    "https://www.youtube.com/@ALH_Studio",
    "https://www.linkedin.com/in/aung-lin-htet/",
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
      <About />
      <IdentityScroll />
      <ExperienceTimeline />
      <Roadmap />
      <Studio />
    </main>
  );
}
