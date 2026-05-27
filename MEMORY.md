# MEMORY.md

> Running log of project state. Claude reads this at the start of every session.
> Update at the end of every working session. Keep it concise — link to docs/PRs for detail.

---

## Project Summary

- **Client:** Aung Lin Htet — personal portfolio
- **Domain:** TBD (deploying to Cloudflare Pages)
- **Repo:** TBD
- **Current phase:** Build

---

## Locked Decisions

- **Architecture:** Single-page scroll — no sub-routes. All sections live on `/`.
- **Nav:** Anchor links (#work, #journey, #skills, #contact) with IntersectionObserver scroll-spy.
- **Sub-pages removed:** /work, /lab, /studio, /about, /contact route files deleted.
- **Email:** aunglinhtet710@gmail.com
- **Fonts:** Instrument Serif (display/italic), Geist Sans (body), Geist Mono (labels/mono)
- **Primary CTA:** Email

---

## Where We Are Right Now

Last session (2026-05-25): Completed the one-page conversion overhaul.
- Deleted 5 sub-page routes (/work, /lab, /studio, /about, /contact)
- Nav converted to scroll-spy anchor links (Work, Journey, Skills, Contact)
- Hero copy updated: roles now "AI Enthusiast / Web Developer / Obsessed with Personal Development"; body copy reflects solopreneur goal; supporting line mentions SUTD Sep 2026
- Hero animations doubled (2×) in duration
- ExperienceTimeline rebuilt with alternating left/right zigzag layout on desktop, single-column on mobile
- experience.ts updated: added SUTD CSD entry (Sep 2026), fixed web dev start date (Apr 2026), added content creator entry (Apr 2025)
- certificates.ts filled with real data: 3 Anthropic/Claude certs, AWS Cloud Foundations, Docker Fundamentals, Kubernetes Fundamentals, Adobe Premiere Pro, Notion Masterclass
- Section IDs updated: FeaturedWork→#work, ExperienceTimeline→#journey, CertSkills→#skills, HomeContact→#contact

Next: Test the site end-to-end in browser; add client website URLs to clientWebsites.ts data when provided.

---

## Open Tasks

- [ ] Add real client website URLs/descriptions to `src/data/clientWebsites.ts`
  - https://commenhers.com/
  - https://ckgarage.sg/
  - https://cd2cf250.aung-htet-lwin-s-cv.pages.dev/
- [ ] Add cv.pdf to `public/` folder for the Download CV button
- [ ] Deploy to Cloudflare Pages

### CONTENT WRITING — needed for all sections
- [ ] **Hero** — refine body copy and supporting line in real voice (`Hero.tsx` copy)
- [ ] **FeaturedWork** — project titles, descriptions, tags (`src/data/projects.ts`)
- [ ] **AIProjects** — project data and descriptions
- [ ] **ClientWebsites** — client descriptions + real URLs (`src/data/clientWebsites.ts`)
- [ ] **CreativeWork** — video/content descriptions (`src/data/creativeWork.ts`)
- [ ] **AILab** — experiment titles and descriptions (`src/data/lab.ts`)
- [ ] **Journey** — refine role descriptions to sound more personal (`src/data/experience.ts`)
- [ ] **Skills** — verify skills list is accurate (`src/data/skills.ts`)
- [ ] **Roadmap** — fill in real goals and milestones (`src/data/roadmap.ts`)
- [ ] **Studio** — studio section copy (`Studio.tsx`)
- [ ] **Contact** — refine tagline/body copy (`HomeContact.tsx`)

---

## Open Issues / Blockers

- cv.pdf missing from public/ — Download CV button will 404 until added

---

## Decisions Log

| Date | Decision | Why |
|------|----------|-----|
| 2026-05-25 | One-page architecture, deleted sub-pages | User wants single scroll experience |
| 2026-05-25 | Nav scroll-spy with IntersectionObserver | Show active section as user scrolls |
| 2026-05-25 | Alternating timeline layout | More visual, not just left-aligned |
| 2026-05-25 | Hero animation 2× longer | User requested slower intro feel |

---

## Client Copy

### Hero
- Roles: AI Enthusiast / Web Developer / Obsessed with Personal Development
- Body: "Building web apps, AI tools, and automation systems — and posting the whole journey online. My goal is to become a solopreneur: someone who ships full products solo."
- Support: "Started web dev in 2026. Posting personal development content since 2025. Heading to SUTD for Computer Science & Design in Sep 2026."

### Contact
- Email: aunglinhtet710@gmail.com
