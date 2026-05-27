export interface Project {
  id: string;
  title: string;
  slug: string;
  category: "ai" | "web" | "automation" | "creative" | "client" | "ml";
  tags: string[];
  description: string;
  year: number;
  status: "live" | "wip" | "archived";
  statusLabel?: string;
  url?: string;
  github?: string;
  demo?: string;
  caseStudy?: string;
  aiConcept?: string;
  cover?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  category: "ai" | "fullstack" | "data" | "cloud" | "systems" | "creative" | "soft";
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string; // "YYYY-MM"
  url?: string;
  category: "ai-ml" | "cloud" | "software" | "creative" | "personal" | "academic";
}

export interface RoadmapItem {
  title: string;
  description: string;
  status: "done" | "active" | "next" | "future";
}

export interface Experience {
  role: string;
  org: string;
  period: string;
  description: string;
  type: "work" | "education" | "personal";
  upcoming?: boolean;
}
