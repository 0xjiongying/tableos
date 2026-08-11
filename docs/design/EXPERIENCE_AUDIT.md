# FlowArc Experience Audit

**Date:** 2026-07-22  
**Scope:** Marketing (`/`, `/product`, `/technology`, `/security`, `/about`, `/contact`) + product demo (`/book/*`, `/staff/*`)  
**Authority:** Experience Masterplan (this engagement) · [`FLOWARC_DESIGN_SYSTEM.md`](./FLOWARC_DESIGN_SYSTEM.md) · [`FOUNDER_NOTES.md`](./FOUNDER_NOTES.md) · tokens

---

## Verdict

Tokens and surfaces already encode Luxury Japanese Hospitality (Geist, Deep Forest, ceramic radii, tonal elevation). The **experience layer** is incomplete: motion is generic fade/slide, storytelling is feature-dump / crypto-settlement brochure, demos read as ledger steps not service choreography, and time-of-day / hospitality primitives are absent.

---

## Findings

| ID | Area | Finding | Severity |
|---|---|---|---|
| E1 | Positioning | Tagline/hero lead as “Financial OS” only — underplays hospitality OS; risks Stripe-test failure for non-crypto buyers | **High** |
| E2 | Hero | Brand is eyebrow, not hero signal; first viewport packs settlement metrics + step list (noise vs hero budget) | **High** |
| E3 | Motion | Durations exist; no hospitality primitives (arrival / acknowledgment / handoff / completion / waiting) wired into UI | **High** |
| E4 | Demo | Workflow demo + hero visual are step grids + money state — not continuous service choreography | **High** |
| E5 | Narrative | Features = MVP card dump; not editorial “day in service” chapters | **High** |
| E6 | Time-of-day | No ambience / lighting shift; staff greeting hardcodes “Good evening” | **Medium** |
| E7 | Signature motion | No living gradient breath, edge-light sweep, or progressive “writes itself” reveals (perf-safe) | **Medium** |
| E8 | Elevation | Hero panel uses gold outline / card chrome; design system prefers tonal planes over bordered card clusters | **Medium** |
| E9 | Staff AI | Briefing page announces AI/provider chrome; masterplan: suggestions feel already present | **Medium** |
| E10 | Navigation | Marketing/staff feel like page switches; no shared room-transition / ambience continuity | **Medium** |
| E11 | A11y | Focus rings present; FAQ `+` rotation OK; architecture SVG keyboard OK; reduce-motion partially honored in Reveal/demo — incomplete for new ambience | **Medium** |
| E12 | Perf | Interval-driven step demos OK; continuous ambience must be CSS-only / paused under `prefers-reduced-motion` | **Low** |
| E13 | Media | No hero film / digital twin — correctly absent; do not ship fake stock video | **Deferred** |
| E14 | Product pages | `/product` reuses feature list without chapter structure; guest book is calm but static | **Medium** |
| E15 | Consistency | Dual token copies (`docs/design/tokens.css` + `apps/web/src/styles/tokens.css`) can drift | **Low** |

---

## What already aligns

- Palette, Geist, ceramic radius 2/4/8, Deep Forest CTAs, Champagne hairlines
- Washi texture, bright matte default, quiet dark override (not neon)
- `prefers-reduced-motion` zeroes duration tokens
- Guest book / confirm copy leans hospitality (“Payment held until attendance”)
- Honest Arc / mock-adapter language (keep)

---

## Remediation plan (this pass)

1. Extend tokens: hospitality motion primitives + time-of-day semantic overlays + signature CSS (breath, edge sweep)
2. Shared ambience + time-of-day wiring on marketing shell + staff/guest shells
3. Hero → brand-first service + Value Streams visual (money under hospitality)
4. Demo → continuous choreography / lifecycle; ledger as secondary quiet state
5. Features + lifecycle chapters → editorial day-in-service / payment journey
6. Soften AI briefing chrome; dynamic staff greeting
7. Sync docs + app tokens; document deferred media
8. **Synthesis:** keep Value Streams (programmable money) *under* hospitality OS brand — see [`EXPERIENCE_SYSTEM.md`](./EXPERIENCE_SYSTEM.md)

---

## Explicitly deferred

| Item | Why |
|---|---|
| Hero film / micro-videos / sound | No production-quality assets; stock would break craft bar |
| Full living digital twin | Requires venue-specific 3D/media pipeline |
| Kitchen / wine / waitlist Phase 2 screens | Outside MVP engineering; language only where editorial |
| Route-level View Transitions API | Progressive enhancement; not blocking cohesion this pass |
