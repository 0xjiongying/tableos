# TableOS Design — Founder Notes

**Date:** 2026-07-22  
**Audience:** Founders / IC / design partners  
**Companion:** [`TABLEOS_DESIGN_SYSTEM.md`](./TABLEOS_DESIGN_SYSTEM.md) · [`tokens.css`](./tokens.css)

---

## Decision

Adopt a **Luxury Japanese Hospitality** visual system for the experiential dining beachhead: bright matte neutrals, botanical accents used sparingly, matte brass hairlines, Geist typography, soft tonal elevation, quiet motion. Settlement power is fully present; **chain chrome is not**.

---

## Why these decisions

### 1. Japanese hospitality over “crypto luxury” or “SaaS dark”

Premium diners and hotel F&B buyers already live in Aesop / Aman / ryokan aesthetics. Dark neon crypto UI fails the **Stripe test** and the **non-blockchain buyer test** from the IC Gate. Bright, calm, daylight UI signals trust the way a well-set table does.

### 2. Beachhead skin ≠ company identity lock-in

IC Gate **PIVOT**: company = Condition-Gated Settlement OS; dining = wedge. The design system therefore:

- Speaks Michelin/Kyoto for guest and door staff surfaces.
- Keeps **semantic tokens + density modes** so a later enterprise settlement console can tighten spacing without inventing a second brand.

### 3. Geist over Inter / SF Pro / IBM Plex

| Option | Verdict |
|---|---|
| Inter | Rejected — default startup/SaaS signal; fights “crafted not templated.” |
| SF Pro | Excellent but Apple-platform locked for consistent cross-web licensing. |
| IBM Plex | Strong utility; slightly more “bank infra” than hospitality calm. |
| **Geist** | **Chosen** — refined geometric sans, excellent UI metrics, editorial enough for luxury, mono sibling for ledgers. |

### 4. Deep Forest CTA, not Champagne Gold buttons

Gold-as-button reads costume jewelry / fintech bling. Matte botanical Deep Forest reads nature, Kyoto gardens, ceramic glaze — premium without shine. Gold reserved for **receipt seals and hairlines**.

### 5. Full OS language, MVP implementation discipline

We specify kitchen, wine, waitlist, etc. so the brand doesn’t fracture later — but **engineering priority stays** IC surviving essentials: create → escrow → attendance → split → thin treasury. Design vision must not re-inflate hospitality CRUD into MVP scope.

---

## Alternatives rejected

| Alternative | Why rejected |
|---|---|
| Dark mode luxury default | Common “premium AI” trap; reduces guest trust on payment; fails bright readability goal |
| Purple / indigo fintech | Crypto/SaaS cliché; fails Stripe test |
| Cream + terracotta + serif “editorial AI” | Overused generative-design cluster; not Japanese hospitality |
| Consumer food-ordering patterns | Wrong category; TableOS is not delivery |
| Glassmorphism + heavy shadows | Visual noise; fights matte craft |
| Neon status colors | Breaks palette; a11y and brand |
| Private-banking navy-only | IC one-liner refined: banking *calm* yes; navy corporate no — botanical hospitality fits beachhead better while remaining extensible |

---

## Trade-offs accepted

1. **Less “wow” on first crypto-native glance** — intentional; wow belongs to the meal, not the UI.  
2. **Gold restraint** may feel understated to some luxury brands that expect metallic UI — we prefer ceramic/tea-house luxury.  
3. **Phase 2 specs without build** creates documentation overhead — cheaper than redesigning a fractured brand later.  
4. **Brand word “Table”** still implies dining while company is settlement infra — design won’t fix naming; category education must.

---

## Stripe test (design)

Guest path copy and layout must answer: *“Is my seat secured and is my money held until I arrive?”*  
If a screen requires understanding Arc, wallets, or explorers to feel safe — **redesign**.

---

## Accessibility commitment

WCAG AA on text tokens; focus rings; status not by color alone. Luxury is not an excuse for low contrast Warm Gray on Linen — pairings are constrained in tokens.

---

## What “done” means for this design phase

- [x] Thesis + palette + type + layout + motion documented  
- [x] MVP vs Phase 2 screen map explicit  
- [x] Implementable tokens (`tokens.css` / `tokens.json`)  
- [x] Interactive canvas for review  
- [ ] *Not done / out of scope:* User stories, React screens, marketing site build
