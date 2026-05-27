export type CreativeType =
  | "video-editing"
  | "social-media"
  | "personal-dev"
  | "experiments"
  | "website-visuals"
  | "studio";

export interface CreativeItem {
  id: string;
  title: string;
  type: CreativeType;
  typeLabel: string;
  description: string;
  thumbnail?: string; // TODO: add real thumbnail path later — set this field and use next/image in CreativeWork.tsx
  accentColor: string; // Tailwind gradient suffix classes, e.g. "from-zinc-800 to-zinc-900"
  year: number;
}

export const creativeWork: CreativeItem[] = [
  {
    id: "cr-01",
    title: "Short-form video editing for social platforms",
    type: "video-editing",
    typeLabel: "Video Editing",
    description: "Editing reels, cuts, and short-form content for social media.",
    accentColor: "from-zinc-800 to-zinc-900",
    year: 2024,
  },
  {
    id: "cr-02",
    title: "Designed and produced content for multiple channels",
    type: "social-media",
    typeLabel: "Social Media",
    description: "Visual content strategy and production across platforms.",
    accentColor: "from-stone-800 to-stone-900",
    year: 2024,
  },
  {
    id: "cr-03",
    title: "Educational content on tech and creative workflows",
    type: "personal-dev",
    typeLabel: "Personal Dev",
    description: "Teaching content covering development and creative tooling.",
    accentColor: "from-neutral-800 to-neutral-900",
    year: 2024,
  },
  {
    id: "cr-04",
    title: "AI-assisted creative workflow experiments",
    type: "experiments",
    typeLabel: "Experiments",
    description: "Exploratory work at the intersection of AI and creative production.",
    accentColor: "from-slate-800 to-slate-900",
    year: 2024,
  },
  {
    id: "cr-05",
    title: "Motion graphics and visual design for web",
    type: "website-visuals",
    typeLabel: "Website Visuals",
    description: "Visual assets and motion graphics built for web contexts.",
    accentColor: "from-zinc-900 to-neutral-800",
    year: 2024,
  },
  {
    id: "cr-06",
    title: "Behind-the-scenes studio content and brand building",
    type: "studio",
    typeLabel: "Studio",
    description: "Brand building and studio content for The ALH Studio.",
    accentColor: "from-stone-900 to-zinc-800",
    year: 2024,
  },
];
