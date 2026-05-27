import type { Certificate } from "@/types";

export const certificates: Certificate[] = [
  // Academic
  {
    title: "Diploma in Computer Engineering — GPA 3.86 / 4.0",
    issuer: "Singapore Polytechnic",
    date: "2026-03",
    category: "academic",
    url: "/certs/ALL SEMESTER RESULTS_merged with advanced maths cert.pdf",
  },

  // AI & ML — Anthropic / Claude
  {
    title: "AI Fluency: Framework and Foundation",
    issuer: "Anthropic",
    date: "2025",
    category: "ai-ml",
    url: "/certs/certificate-AI Fluency Framework & Foundations.pdf",
  },
  {
    title: "Claude Code 101",
    issuer: "Anthropic",
    date: "2025",
    category: "ai-ml",
    url: "/certs/certificate-Claude Code 101.pdf",
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    date: "2025",
    category: "ai-ml",
    url: "/certs/certificate-Claude Code in Action.pdf",
  },

  // Cloud & Infrastructure
  {
    title: "AWS Academy Graduate — AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services (AWS)",
    date: "2025-02",
    category: "cloud",
  },
  { title: "Docker Fundamentals",     issuer: "Dell Technologies", date: "2025-02", category: "cloud" },
  { title: "Kubernetes Fundamentals", issuer: "Dell Technologies", date: "2025-02", category: "cloud" },

  // Creative
  { title: "Adobe Premiere Pro Class", issuer: "Skillshare", date: "2025", category: "creative" },

  // Personal Development
  { title: "Notion Masterclass", issuer: "Skillshare", date: "2023-09", category: "personal" },
];
