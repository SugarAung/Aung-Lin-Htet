export type LabStatus =
  | "exploring"
  | "building"
  | "shipped"
  | "improving"
  | "paused"
  | "ongoing";

export interface LabItem {
  id: string;
  title: string;
  status: LabStatus;
  statusLabel: string; // Display label — e.g. "Exploring", "Built"
  description: string;
  tags: string[];
  year: number;
  notes?: string;
  github?: string;
  demo?: string;
}

export interface LabLearningItem {
  id: string;
  topic: string;
  description: string;
}

export interface LabNextItem {
  id: string;
  title: string;
  description: string;
}

// ─── Lab experiments ─────────────────────────────────────────────────────────
// To add a new experiment: push a new object with a unique id, valid LabStatus,
// and all required fields. statusLabel is the display text for the badge.

export const labItems: LabItem[] = [
  {
    id: "lab-01",
    title: "Claude Code Workflows",
    status: "exploring",
    statusLabel: "Exploring",
    description:
      "Using Claude Code to plan, build, refactor, and ship full-stack applications with better structure.",
    tags: ["Claude API", "Workflows", "Full-Stack", "Automation"],
    year: 2024,
  },
  {
    id: "lab-02",
    title: "RAG Experiments",
    status: "building",
    statusLabel: "Building",
    description:
      "Testing retrieval pipelines, document understanding, and answer generation patterns.",
    tags: ["RAG", "Vector Search", "LangChain", "Document Understanding"],
    year: 2024,
  },
  {
    id: "lab-03",
    title: "AI Agents",
    status: "exploring",
    statusLabel: "Exploring",
    description:
      "Learning how agents can use tools, memory, planning, and structured workflows.",
    tags: ["LLM Agents", "Tool Use", "Memory", "Planning"],
    year: 2024,
  },
  {
    id: "lab-04",
    title: "Prompt Systems",
    status: "improving",
    statusLabel: "Improving",
    description:
      "Designing prompts, system instructions, and evaluation flows for better AI behavior.",
    tags: ["Prompt Engineering", "System Instructions", "Evaluation"],
    year: 2024,
  },
  {
    id: "lab-05",
    title: "Gemini API Experiments",
    status: "shipped",
    statusLabel: "Built",
    description: "Building AI app features using Google Gemini API.",
    tags: ["Google Gemini", "FastAPI", "React.js"],
    year: 2024,
  },
  {
    id: "lab-06",
    title: "Agentic Frameworks",
    status: "exploring",
    statusLabel: "Exploring",
    description:
      "Experimenting with frameworks and patterns for multi-step AI workflows.",
    tags: ["LangChain", "Multi-Agent", "Orchestration"],
    year: 2024,
  },
  {
    id: "lab-07",
    title: "AI-Assisted Coding",
    status: "ongoing",
    statusLabel: "Ongoing",
    description:
      "Using AI tools to speed up development while keeping architecture, testing, and quality in mind.",
    tags: ["Claude API", "TypeScript", "Development Workflow"],
    year: 2024,
  },
];

// ─── Currently learning ───────────────────────────────────────────────────────
// To add: push a new object with a unique id, topic, and description.

export const labLearning: LabLearningItem[] = [
  {
    id: "ll-01",
    topic: "LLM Agent Memory Patterns",
    description:
      "Persistent memory, episodic memory, and summarization strategies for long-running agents.",
  },
  {
    id: "ll-02",
    topic: "Structured Output",
    description:
      "JSON mode, tool use, and schema validation for reliable LLM output formatting.",
  },
  {
    id: "ll-03",
    topic: "Vector Similarity Search",
    description:
      "Embedding strategies, indexing approaches, and retrieval optimization for RAG systems.",
  },
];

// ─── Next experiments ─────────────────────────────────────────────────────────
// To add: push a new object with a unique id, title, and description.

export const labNextExperiments: LabNextItem[] = [
  {
    id: "ne-01",
    title: "Fine-tuning with domain data",
    description:
      "Exploring how to adapt a base model to specific domains using small datasets.",
  },
  {
    id: "ne-02",
    title: "Multimodal AI pipelines",
    description:
      "Combining vision and text models for document understanding and analysis.",
  },
  {
    id: "ne-03",
    title: "AI evaluation and scoring frameworks",
    description:
      "Building automated evals to test prompt quality and output consistency.",
  },
  {
    id: "ne-04",
    title: "Public AI micro-tool",
    description:
      "Shipping a small, focused AI tool publicly to learn about user feedback loops.",
  },
];
