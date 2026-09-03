# MEMORY.md

> Running log of project state. Claude reads this at the start of every session.
> Update at the end of every working session. Keep it concise — link to docs/PRs for detail.

---

## Project Summary

- **Client:** Aung Lin Htet — personal portfolio / personal brand site
- **Domain:** aunglinhtet.com (Cloudflare Pages)
- **Repo:** github.com/SugarAung/Aung-Lin-Htet (branch: `master`, not `main`)
- **Current phase:** Build — mid-rebrand from CV-style portfolio to personal-brand narrative

---

## Locked Decisions

- **Architecture:** Single-page scroll — no sub-routes. All sections live on `/`.
- **Nav:** Anchor links (`#journey`, `#contact`) with IntersectionObserver scroll-spy. (`#skills` link removed 2026-09-03 with Skills & Certifications; `#work` link removed 2026-09-03 with AI Projects — see below. `#ailab` never had a nav link.)
- **Sub-pages removed:** /work, /lab, /studio, /about, /contact route files deleted — though unused component scaffolding for `about`/`contact` still exists under `src/components/sections/` (orphaned, not wired into any route). The `work/` scaffolding (`WorkHero.tsx`, `WorkContact.tsx`) also still exists but is unrelated to the deleted `FeaturedCaseStudies.tsx`/`WorkGrid.tsx` — see below.
- **Email:** aunglinhtet710@gmail.com
- **Fonts:** Instrument Serif (display/italic), Geist Sans (body), Geist Mono (labels/mono)
- **Primary CTA:** shifted from "hire me" (email) to "follow the journey" (social links) as of the 2026-09-03 rebrand — see below.
- **Tags:** `v1-cv-version` = commit `d45220c`, the last CV-style state before the rebrand.

---

## Where We Are Right Now

**Latest session (2026-09-03): Removed AI Projects and AI Lab sections entirely.** Journey/`experience.ts` untouched, as required.
- Deleted `AILab.tsx`, `data/lab.ts`, `AIProjects.tsx`, `data/projects.ts`; removed their imports/usages from `page.tsx`; removed the `#work` nav link + scroll-spy entry from `Nav.tsx` (no `#ailab` link existed to remove).
- **`projects.ts` orphaned-dependency check (done empirically, not just reasoned):** `tsconfig.json` includes all `**/*.tsx` with no excludes, so Next's typecheck covers unrouted files too. Deleting `projects.ts` alone broke the build via 3 dead consumers — `FeaturedCaseStudies.tsx`, `WorkGrid.tsx` (both `sections/work/`), `FeaturedWork.tsx` (`sections/home/`), none wired into any route. Deleted all 3, per the pre-agreed fallback, then build passed.
- **Found mid-task, not in the original ask:** `LabCard.tsx` (primitive) imported types from `data/lab.ts` and had zero other consumers once `AILab.tsx` was gone — broke the build the same way. Deleted it too, same reasoning as the `projects.ts` fallback.
- **Left alone (harmless, don't break the build):** `AICard.tsx` and `ProjectCard.tsx` are now fully orphaned (no consumers) but only import the `Project` *type* from `@/types`, not from the deleted data file, so they don't error. Same treatment as the pre-existing dead `sections/Skills.tsx` stub — noted, not deleted.
- **Flagged, not fixed (Hero explicitly out of scope this round):** Hero's "View My Work" CTA (`Hero.tsx:110`) still points to `href="#work"`, which no longer exists on the page now that `AIProjects.tsx` (the only `id="work"` section) is gone. Dead link — needs a decision (repoint it, or drop the button) next time Hero is in scope.
- `npm run build` ✅ clean. `npm run lint` — same 2 pre-existing errors as last session (`ThemeToggle.tsx`, `CoderScene.tsx`), nothing new.
- Nothing committed — still sitting in the working tree alongside the rebrand changes below.

**Previous session (2026-09-03): Rebrand from CV/job-seeking portfolio → personal-brand narrative ("SUTD Trailblazer Scholar, Content Creator, Multi-hyphenate builder").**

Tagged `v1-cv-version` on `d45220c` and pushed to `origin/master` before starting, so the old CV-style version is always recoverable.

Changes made (uncommitted — awaiting explicit commit instruction):
- **Hero** (`Hero.tsx`): Roles line ("AI Developer / Web Developer / Solopreneur") replaced with a single headline ("SUTD Trailblazer Scholar. Content Creator. Multi-hyphenate builder.") at a new `text-lg md:text-xl` weight so it reads as a headline rather than a tiny label. Body paragraph replaced with the new subline ("I do a lot at once..."). Greeting, name, and proof line (SP grad/GPA/Tiny Equation/SUTD CSD) left untouched.
- **About** (`About.tsx`, new file): brand-new section, placed right after Hero, before the pillars. "Why I'm doing this" — 4 paragraphs on the consistency-over-talent narrative. Built from `Container`/`SectionWrapper`/`Reveal` primitives, matching sibling section conventions. Not adapted from the orphaned `sections/about/*` scaffolding (different copy/context).
- **Pillars** (`IdentityScroll.tsx`): "Three ways I build." → "Three things, right now." Items changed from AI Builder / Software Developer / Content Creator to **Student / Builder / Discipline**. Only the `STEPS` data array and heading strings changed — GSAP/ScrollTrigger pinned-scroll logic untouched.
- **Journey timeline** (`experience.ts`): descriptions rewritten for all 5 entries (SP, Content Creator, Gold Lite, Tiny Equation, SUTD CSD) in first-person consistency-narrative voice. Role/org/period/type/upcoming fields unchanged.
- **Skills & Certifications section removed entirely**: deleted `CertSkills.tsx`, `data/certificates.ts`, `data/skills.ts` (confirmed unused elsewhere first). Removed from `page.tsx`. Also removed the now-dead `#skills` nav link and scroll-spy entry from `Nav.tsx` (necessary follow-on, not explicitly requested but required to avoid a dead nav link).
- **Contact** (`HomeContact.tsx`): heading → "Let's connect", label → "Connect", body rewritten to a "drop a follow" framing, CTA buttons swapped from Email×2 + Instagram to **YouTube → Instagram → TikTok → LinkedIn** (`https://www.linkedin.com/in/aung-lin-htet/`, new).
- Also folded in this session: pre-existing uncommitted edits from a prior session that removed the freelance/"L&L Service" framing (`ClientWebsites.tsx` + `data/clientWebsites.ts` deleted, `experience.ts`'s "Web Developer / Co-founder" entry removed, `roadmap.ts` copy tweak) — these already matched the rebrand's target state so were left in place rather than isolated out.

Verified: `npm run build` passes clean (TS + static generation). `npm run lint` shows 2 pre-existing errors in `ThemeToggle.tsx` and `CoderScene.tsx` (`react-hooks/set-state-in-effect`) — unrelated to this session's changes, not touched (out of scope; `CoderScene` is explicitly protected animation logic). Note: `npm run typecheck` referenced in `CLAUDE.md` does not exist as a package.json script — `next build`'s TS pass is the de facto typecheck.

**Not done / still open from the brief:** nothing — all 6 items (Hero, About, Pillars, Journey, Skills removal, Contact) completed and built successfully.

Next: user to review the diff and decide when/how to commit (nothing was committed automatically this session — CLAUDE.md says don't push to main/master directly without being asked).

---

## Open Tasks

- [ ] Decide on commit message(s) and commit all the accumulated changes (rebrand + AI Projects/Lab removal, still uncommitted)
- [ ] **Hero's "View My Work" CTA is a dead link** (`href="#work"`, section no longer exists) — decide what it should point to or whether to remove the button
- [ ] Add cv.pdf to `public/` folder for the Download CV button (still referenced by the orphaned `about/AboutCTA.tsx`, not currently live)
- [ ] `src/components/sections/Skills.tsx` — orphaned dead stub with a duplicate `id="skills"`, never wired into any route. Harmless but worth deleting in a cleanup pass.
- [ ] `src/types.ts` — `Skill`/`Certificate` interfaces unused since last session; `Project` interface now only referenced by the orphaned `AICard.tsx`/`ProjectCard.tsx` (no longer any live consumer). All harmless to leave, candidates for a types cleanup pass.
- [ ] `AICard.tsx`, `ProjectCard.tsx` (primitives), `WorkHero.tsx`, `WorkContact.tsx` (`sections/work/`) — now/still orphaned, unwired into any route. Harmless, not blocking builds.

### CONTENT WRITING — still needed for sections not touched this session
- [ ] **Roadmap** — verify `roadmap.ts` still reads correctly post-rebrand (only had one line tweaked in the pre-existing uncommitted edits)
- [ ] **Studio** — studio section copy (`Studio.tsx`)

---

## Open Issues / Blockers

- cv.pdf missing from public/ — any Download CV link will 404 until added (not currently linked from the live page)

---

## Decisions Log

| Date | Decision | Why |
|------|----------|-----|
| 2026-05-25 | One-page architecture, deleted sub-pages | User wants single scroll experience |
| 2026-05-25 | Nav scroll-spy with IntersectionObserver | Show active section as user scrolls |
| 2026-05-25 | Alternating timeline layout | More visual, not just left-aligned |
| 2026-05-25 | Hero animation 2× longer | User requested slower intro feel |
| 2026-09-03 | Full rebrand: CV/job-seeking → personal-brand narrative | Reposition from "hire me" portfolio to a publicly-documented SUTD/builder journey; Skills & Certifications wall felt too CV-flavored for the new framing |
| 2026-09-03 | Tagged `v1-cv-version` on d45220c before rebrand | Preserve a recoverable snapshot of the pre-rebrand CV-style site |
| 2026-09-03 | Contact CTA shifted from email to social follow links | New Contact framing is "follow the journey," not "hire me" |
| 2026-09-03 | Removed AI Projects + AI Lab sections and their data files entirely | User request; also deleted 3 dead `projects.ts` consumers and `LabCard.tsx` since they broke the build once orphaned |

---

## Client Copy

### Hero (current, as of 2026-09-03 rebrand)
- Headline: "SUTD Trailblazer Scholar. Content Creator. Multi-hyphenate builder."
- Subline: "I do a lot at once, and somehow still show up every day. That's kind of the whole story."
- Proof line (unchanged since 2026-05-25): "SP Computer Engineering graduate · GPA 3.86 · AI intern at Tiny Equation · SUTD CSD Sep 2026"

### About (new, 2026-09-03)
Heading "Why I'm doing this" — 4-paragraph consistency-over-talent narrative. Full text in `About.tsx`.

### Contact (current, as of 2026-09-03 rebrand)
- Heading: "Let's connect"
- Links: YouTube (youtube.com/@ALH_Studio), Instagram (instagram.com/thealhstudio), TikTok (tiktok.com/@thealhstudio), LinkedIn (linkedin.com/in/aung-lin-htet)
- Email: aunglinhtet710@gmail.com (no longer a Contact-section CTA, but still the site's underlying contact address)
