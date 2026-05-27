# Aung Lin Htet — Portfolio

Personal portfolio website for **Aung Lin Htet**, a frontend developer based in Myanmar.
Built to showcase projects, skills, and creative work to recruiters, hiring managers, and
potential collaborators.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Animation | Motion (Framer Motion), GSAP 3, Lenis (smooth scroll) |
| Icons | Lucide React |
| Hosting | Cloudflare Pages |
| Source | GitHub |

All pages are statically exported — no server-side rendering, no database.

---

## Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
# Type-check
npm run typecheck   # (if defined) or: npx tsc --noEmit

# Lint
npm run lint

# Production build (generates /out directory)
npm run build
```

---

## Routes

| Route | Page |
|---|---|
| `/` | Home — hero, featured work, AI projects, timeline |
| `/work` | Selected Work — full project grid |
| `/lab` | AI Lab — experiments with status filters |
| `/studio` | ALH Studio — creative / video work |
| `/about` | About — story, skills, certifications |
| `/contact` | Contact — email and links |

---

## Deployment — Cloudflare Pages

This project uses `output: "export"` in `next.config.ts`. The build produces a static
`out/` directory that Cloudflare Pages serves directly.

### Option A — Push only the `code/` folder as your repo root (recommended)

```bash
# Run these commands from inside the code/ folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

**Cloudflare Pages settings:**

| Setting | Value |
|---|---|
| Framework preset | None (set manually) |
| Root directory | *(leave blank)* |
| Build command | `npm run build` |
| Output directory | `out` |
| Node.js version | 20.x |

### Option B — Push the parent folder (portfolio root) as your repo

If your repo root is the folder containing `code/`, set:

| Setting | Value |
|---|---|
| Root directory | `code` |
| Build command | `npm run build` |
| Output directory | `out` |

### Environment variables

None required. This is a fully static site with no secrets.

---

## Content Update Guide

All content lives in `src/data/`. Edit these files to update what appears on the site.

### Projects — `/work` page and home featured grid

**File:** `src/data/projects.ts`

Each entry in the `projects` array accepts:

```ts
{
  id: "unique-id",
  title: "Project Name",
  slug: "project-slug",
  category: "ai" | "web" | "automation" | "creative" | "client" | "ml",
  tags: ["Next.js", "TypeScript"],
  description: "One-sentence description.",
  year: "2024",
  status: "live" | "wip" | "concept",
  url: "https://...",         // optional
  github: "https://...",      // optional
  featured: true,             // shows in home featured grid
}
```

### Skills — `/about` page

**File:** `src/data/skills.ts`

Array of `{ name: string, category: string }`. Add or remove entries freely.

### Certifications — `/about` page

**File:** `src/data/certificates.ts`

```ts
{
  title: "Certificate Name",
  issuer: "Issuing Organization",
  date: "2024-03",           // YYYY-MM format
  url: "https://...",        // optional verify link
  category: "ai" | "web" | "cloud" | "other",
}
```

### Lab Experiments — `/lab` page

**File:** `src/data/lab.ts`

Status values: `exploring | building | shipped | improving | ongoing | paused`

### Work History & Education — `/about` timeline

**File:** `src/data/experience.ts`

### Client Websites — home page

**File:** `src/data/clientWebsites.ts`

### Creative / Video Work — `/studio` page

**File:** `src/data/creativeWork.ts`

Update thumbnail paths here once real media is added to `public/`.

### Social Links & Contact

Search for your links across components in `src/components/sections/` and
`src/components/layout/Nav.tsx`. Common locations:

- Email: `sections/contact/ContactCards.tsx`
- GitHub / LinkedIn / Twitter: `layout/Nav.tsx` and `sections/home/HomeContact.tsx`
- Instagram (Studio page): `src/app/studio/page.tsx` — replace `"YOURUSERNAME"` with your
  Instagram handle

### Roadmap items — home page bottom section

**File:** `src/data/roadmap.ts`

---

## Adding Your CV

Drop a file named `cv.pdf` into the `public/` folder:

```
public/
  cv.pdf     ← place it here
```

The "Download CV" button in the hero already points to `/cv.pdf`. No code change needed.

---

## Adding Real Images & Videos

1. Place optimized images in `public/` (e.g., `public/projects/my-project.jpg`)
2. Update the `cover` field in `src/data/projects.ts` or the relevant data file
3. For creative work thumbnails, update `src/data/creativeWork.ts`
4. Recommended formats: `.webp` for images, `.mp4` for videos
5. Keep individual files under 1 MB where possible

Note: `images: { unoptimized: true }` is set in `next.config.ts` for static export
compatibility. Manually optimize images before adding them (use Squoosh, Sharp CLI, etc.).

---

## Known Placeholders

| Location | Placeholder |
|---|---|
| `public/` | Only default SVGs — no real project screenshots yet |
| `src/data/creativeWork.ts` | Gradient placeholders instead of real thumbnails |
| `src/app/studio/page.tsx` | Instagram URL has `"YOURUSERNAME"` — replace before launch |
| `src/components/sections/contact/ContactForm.tsx` | Form UI only — no email backend wired |

---

## Contact Form Note

The contact form renders a full UI but currently has no submission backend. To make it
functional after deployment, integrate one of:

- [Resend](https://resend.com) — email API (free tier available)
- [Formspree](https://formspree.io) — form-to-email service (free tier available)
- Cloudflare Pages Functions — serverless handler

---

## License

Personal portfolio — source shared for reference. Not licensed for reuse.
