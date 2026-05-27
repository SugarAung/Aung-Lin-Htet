export interface ClientWebsite {
  id: string;
  name: string;
  clientType: string;
  role: string;
  handled: string[];
  tech: string[];
  status: string;
  year: number;
  cover?: string;
  url?: string;
}

export const clientWebsites: ClientWebsite[] = [
  {
    id: "cw-01",
    name: "Commenhers",
    clientType: "Social Enterprise",
    role: "Web Developer",
    handled: ["Full website build", "Responsive design", "Deployment", "Built with Claude Code"],
    tech: ["Next.js", "Tailwind CSS", "Claude Code"],
    status: "Live",
    year: 2026,
    cover: "/images/clients/commenhers.png",
    url: "https://commenhers.com/",
  },
  {
    id: "cw-02",
    name: "CK Garage",
    clientType: "Local Business",
    role: "Web Developer",
    handled: ["Full website build", "Responsive design", "Deployment", "Built with Claude Code"],
    tech: ["Web Development", "Claude Code"],
    status: "Live",
    year: 2026,
    cover: "/images/clients/ck-garage.png",
    url: "https://ckgarage.sg/",
  },
  {
    id: "cw-03",
    name: "Aung Htet Lwin — Portfolio",
    clientType: "Personal Portfolio",
    role: "Web Developer",
    handled: ["Full portfolio build", "Responsive design", "Deployment", "Built with Claude Code"],
    tech: ["Web Development", "Claude Code"],
    status: "Live",
    year: 2026,
    cover: "/images/clients/aung-htet-lwin.png",
    url: "https://aung-htet-lwin-s-cv.pages.dev/",
  },
  {
    id: "cw-04",
    name: "L&L Service",
    clientType: "Service Business",
    role: "Web Developer / Co-founder",
    handled: ["Full website build", "Responsive design", "Built with Claude Code"],
    tech: ["Web Development", "Claude Code"],
    status: "In Development",
    year: 2026,
  },
];
