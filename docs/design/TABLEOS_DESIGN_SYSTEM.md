# TableOS Design System — Luxury Japanese Hospitality

**Status:** Design direction v1.0 — authoritative for hospitality beachhead visual/UX  
**Date:** 2026-07-22  
**Company thesis:** Condition-Gated Settlement OS ([IC Gate](../strategy/TABLEOS_IC_GATE.md))  
**Role of this system:** Premium dining is the **beachhead skin**, not the company. Visual language serves Michelin / hotel / omakase calm today; tokens and density modes remain extensible to enterprise settlement later.  
**Canonical tokens:** [`tokens.css`](./tokens.css) · [`tokens.json`](./tokens.json)  
**Founder rationale:** [`FOUNDER_NOTES.md`](./FOUNDER_NOTES.md)  
**Interactive canvas:** open `tableos-design-system.canvas.tsx` beside chat  

**Not this deliverable:** User stories, app screens implementation, crypto dashboard chrome.

---

## 1. Design thesis

> **Quiet technology for the world’s finest tables** — every pixel serves trust, calm, and craftsmanship; settlement power stays invisible behind Omotenashi.

TableOS must feel at home in a three-star Kyoto dining room: understated, luminous, meticulously composed. Guests who have never heard of Arc must trust payment and escrow screens the way they trust a handwritten bill at Aman — clear, human, inevitable.

---

## 2. Product tension (IC Gate vs vision)

| Layer | Decision |
|---|---|
| **Company** | Condition-gated commercial settlement (escrow → condition → atomic split) |
| **Beachhead UX** | Luxury experiential dining events |
| **Design system scope** | **Full** hospitality OS visual language (vision) |
| **Implementation priority** | **MVP settlement-critical screens only** |

**Resolved conflict:** We specify kitchen, wine pairing, waitlist, etc. as Phase 2+ component language so the brand is coherent when vertical depth returns — without expanding MVP engineering scope back into restaurant CRUD.

IC Gate design note (“private-banking aesthetic; chain chrome hidden”) maps cleanly onto Japanese hospitality calm: bright matte surfaces, restrained gold hairlines, zero chain jargon in guest copy.

---

## 3. Emotional & brand qualities

| Feel | Express through |
|---|---|
| Calm confidence | Large margins, slow motion, few simultaneous actions |
| Exceptional craft | Precise 8px rhythm, ceramic borders, typographic restraint |
| Omotenashi | Anticipate needs; hide complexity; never surprise with tech |
| Timeless luxury | Natural neutrals; no seasonal UI fads; no neon |
| Quiet technology | Ledger power without “crypto UI”; USDC as “held funds,” not wallet theatre |

**References (qualities, not layouts):** Apple, MUJI, Aesop, Aman, Lexus, Kinto, Karimoku, Noma, tea houses, ryokan.

**Explicitly avoid:** Neon cyberpunk, purple fintech, glassmorphism overload, heavy shadows, cream+terracotta AI cliché, dark-mode-as-luxury default, consumer food-ordering patterns, generic shadcn-default chrome.

---

## 4. Color system

Bright interface. Soft daylight. Excellent readability. Accents sparingly.

### 4.1 Primitives

#### Primary — warm bright neutrals

| Token | Hex | OKLCH | Role |
|---|---|---|---|
| Warm Ivory | `#F7F3EB` | `oklch(0.961 0.012 95)` | Raised surfaces, subtle panels |
| Rice White | `#FAF8F4` | `oklch(0.978 0.008 95)` | Page background |
| Soft Pearl | `#F3EFE8` | `oklch(0.948 0.010 90)` | Muted background / zebra |
| Mist White | `#F9F7F4` | `oklch(0.975 0.006 90)` | Default surface |
| Natural Linen | `#EDE6DB` | `oklch(0.928 0.015 90)` | Sunken wells, input fills |

#### Secondary — stone & clay

| Token | Hex | OKLCH | Role |
|---|---|---|---|
| Light Sand | `#E8DFD0` | `oklch(0.908 0.020 85)` | Subtle borders |
| Warm Stone | `#D4CBC0` | `oklch(0.848 0.015 80)` | Default borders |
| Ash Gray | `#B8B0A6` | `oklch(0.748 0.012 80)` | Strong borders, disabled chrome |
| Pale Taupe | `#C9BDB0` | `oklch(0.798 0.020 70)` | Secondary fills |
| Soft Clay | `#C4A99A` | `oklch(0.758 0.030 55)` | Warm secondary accent / danger border kin |

#### Natural accents — botanical (sparingly)

| Token | Hex | Use |
|---|---|---|
| Sage `#8B9A7D` | Soft success border |
| Bamboo `#A8B89A` | Soft success / selected wash |
| Matcha `#6B7F5A` | Secondary accent |
| Moss `#5A6B4F` | Success text / hover |
| Deep Forest `#3D4A38` | **Primary actions** |

#### Premium accents — matte metal (never shiny)

| Token | Hex | Use |
|---|---|---|
| Champagne Gold `#C4B08A` | Hairlines, selected underlines, premium markers |
| Brushed Brass `#A8926C` | Premium labels, receipt seals |
| Warm Bronze `#8B7355` | Warnings (with label) |

#### Text

| Token | Hex | Use |
|---|---|---|
| Ink Black `#1A1917` | Strong headlines, legal |
| Charcoal `#2C2A26` | Body |
| Warm Gray `#6B6560` | Secondary / captions on bright bg |
| Muted Gray `#8A837C` | Placeholder / faint meta |

### 4.2 Semantic tokens

| Semantic | Maps to | Notes |
|---|---|---|
| `bg` | Rice White | Page |
| `bg-subtle` | Warm Ivory | Alternating bands |
| `surface` | Mist White | Cards as tonal planes (rarely bordered heavily) |
| `surface-sunken` | Natural Linen | Inputs, escrow amount wells |
| `border` | Warm Stone | Default |
| `border-focus` | Deep Forest | Keyboard focus |
| `text` / `text-strong` / `text-muted` | Charcoal / Ink / Warm Gray | |
| `accent` | Deep Forest | Primary CTA |
| `premium` | Brushed Brass | Receipt / “settled” seal — not CTA |
| `success` | Moss + Bamboo wash | + text label |
| `warn` | Warm Bronze + Champagne wash | + text label |
| `danger` | `#8F4E3C` + Soft Clay wash | Muted terracotta — **no neon red** |
| `info` | Charcoal + Soft Pearl | Neutral notices |

### 4.3 Accessibility (contrast)

- **Policy:** WCAG **AA** minimum for all text token pairings on intended backgrounds.
- Body: Charcoal/Ink on Rice/Ivory/Mist — AAA territory.
- Muted: Warm Gray on Rice family only (verify ≥4.5:1); never Champagne Gold as body text.
- Primary button: Rice White on Deep Forest.
- Status never by color alone — always label (+ optional icon).
- Focus: visible 2px Deep Forest ring with Rice White offset (`--tos-focus-ring`).

---

## 5. Materials → CSS

| Material | Evoke | CSS mapping |
|---|---|---|
| Washi | Soft fiber paper | Ultra-low opacity noise overlay (`--tos-texture-washi`); never loud grain |
| Oak / maple / walnut | Warm structure | Warm Stone / Natural Linen bands; wood **photograph** only in hero imagery, not fake wood CSS |
| Ceramic | Fine plate edge | 1px Warm Stone border; radius 2–4px (not pill) |
| Linen | Soft cloth | Soft Pearl fills; Light Sand hairlines |
| Silk | Quiet sheen | Avoid gloss; use Champagne Gold at ≤55% mix in hairlines only |
| Matte stone | Grounding | Ash Gray for disabled; tonal elevation only |
| Handmade craft | Imperfection as luxury | Asymmetric photography; avoid stock symmetry |

**Elevation rule:** Prefer background step (`elev-0 → elev-2`) over `box-shadow`. Drop shadows are forbidden in default product UI. Exception: ephemeral focus ring only.

---

## 6. Typography

**Primary:** **Geist** (sans) · **Geist Mono** (financial figures, escrow IDs, ledger).

**Why Geist over Inter:** Inter reads as default startup SaaS. Geist retains excellent UI metrics with slightly more editorial geometry — closer to refined product craft (Apple/Aesop adjacency) without resorting to display serifs that fight ops density. SF Pro is Apple-locked; IBM Plex is more “enterprise utility” than hospitality calm.

| Role | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|
| Display | 40px | 500 | 1.2 | -0.02em |
| Title | 28px | 500 | 1.25 | -0.015em |
| Heading | 20px | 500 | 1.35 | -0.01em |
| Body | 16px | 400 | 1.6 | 0 |
| Body sm | 14px | 400 | 1.55 | 0 |
| Caption | 12px | 500 | 1.45 | +0.02em |
| Mono / figures | 14px | 500 | 1.4 | +0.01em |

**Weights used:** 400 / 500 / 600 only. No ultra-bold hero shouting.

**Copy tone (guest):** “Your seat is held.” / “Funds released after attendance.” — never “Sign tx” / “Connect wallet” as primary CTA language (Stripe test).

---

## 7. Layout & spacing

- **Base unit:** 8px (`--tos-space-*`).
- **Guest density:** page pad 64, gutters 48, row gap 24 — content breathes.
- **Ops density:** page pad 32, gutters 24, row gap 16 — still premium, never dense CRM grids.
- **Max widths:** content 1152 · readable 640 · narrow (pay/confirm) 448.
- **Grid:** 12-col desktop; collapse to single column on mobile; large outer margins always.
- **Radius:** 2 / 4 / 8 — ceramic, not app-pill.

---

## 8. Motion

| Token | Value | Use |
|---|---|---|
| Instant | 100ms | Toggle feedback |
| Fast | 180ms | Hover / focus |
| Normal | 280ms | Panels, soft fade |
| Slow | 420ms | Course / state reveals |
| Page | 520ms | Route transitions |
| Breath | 8s | Living ambience / waiting |
| Edge | 6.5s | Thin champagne edge sweep |
| Write | 900ms | Progressive text reveal |

**Easing:** soft decelerate `cubic-bezier(0.22, 1, 0.36, 1)` for entrances; gentle in-out for shared layout.

**Hospitality primitives:** arrival · acknowledgment · handoff · completion · waiting — see `tokens.css` / `tokens.json`.

**Time-of-day:** `html[data-tod="morning|afternoon|evening|night"]` shifts wash/warmth via CSS variables (local clock or demo control).

**Allowed:** opacity fades, 1–2% scale, subtle y-translate (4–8px), page crossfade, CSS breath/edge (paused under reduced motion).  
**Forbidden:** bounce, springy overshoot, confetti, neon glow pulses, parallax noise.

**`prefers-reduced-motion`:** durations → 0; instant state change; retain non-animated focus/status clarity.

**Experience audit:** [`EXPERIENCE_AUDIT.md`](./EXPERIENCE_AUDIT.md)

---

## 9. Imagery

**Subjects:** Michelin plating, minimal table settings, fine ceramics, natural daylight, wood grain, seasonal ingredients, empty quiet rooms before service.

**Guidelines:**
- Real daylight; soft side light; low saturation.
- Prefer empty or single-guest table over crowded dining rooms.
- No stock “happy couple toasting with phones.”
- No crypto icons, QR-as-hero, chain logos on guest surfaces.

**Placeholders:** Warm Ivory field + caption “Seasonal photography” + optional washi noise — never gray checkerboards or Lorem image blocks.

---

## 10. Screen map — MVP vs Phase 2+

### 10.1 MVP beachhead (implement first)

Aligned to IC Gate surviving essentials:

| Surface | Purpose | Density |
|---|---|---|
| **Event create** | Obligation: capacity, price, split parties, condition = attendance | Ops |
| **Reserve** | Guest claims scarce seat; clear terms; calm scarcity | Guest |
| **USDC pay / escrow confirm** | Lock funds; Stripe-test plain language; receipt of *hold* | Guest narrow |
| **Attendance verify** | Door/staff attest condition; speed + certainty | Ops |
| **Settlement / split receipt** | Atomic release visualization; partner lines; fee | Guest + Ops |
| **Treasury glance** | Thin balances; not polished treasury OS | Ops |

### 10.2 Phase 2+ (design language only now)

Elegant menu browsing · reservation management (beyond wedge) · waitlist · kitchen workflow · course progression · wine pairing · guest preferences / CRM · allergens extended · analytics suite · rich staff dashboard.

These share the same tokens, type, motion, and component anatomy — deferred in engineering.

---

## 11. Component specifications

Specs are design contracts — not React implementations. Avoid generic shadcn-default look: ceramic radius, tonal elevation, Deep Forest CTA, Champagne hairlines for premium moments only.

### 11.1 MVP components

#### Event create (ops)

- **Purpose:** Define obligation + capacity + price + N-party split.
- **Anatomy:** Page title → event identity block → capacity/price row → split table → condition statement (“Release on attendance”) → primary “Create event”.
- **States:** Empty draft · validation error (inline, Warm Bronze) · saving · created (Moss label).
- **Spacing:** Ops density; split table row height ≥48px.
- **Do:** One primary action. Show split % totaling 100%.  
- **Don’t:** Marketing photo galleries (IC subtracted). Don’t expose chain addresses as primary fields — advanced disclosure only.

#### Reserve (guest)

- **Purpose:** Claim a scarce seat with emotional calm.
- **Anatomy:** Event name (title) → date/time → price mono → capacity remaining caption → terms → “Reserve seat”.
- **States:** Available · few left · sold out · reserved pending pay.
- **Do:** Scarcity as quiet caption, not countdown urgency UI.  
- **Don’t:** Coupon codes, social proof walls, neon “BOOK NOW”.

#### USDC pay / escrow confirm (guest)

- **Purpose:** Lock prepay; communicate *hold until attendance*.
- **Anatomy:** Amount well (sunken linen) → plain-language hold explanation → method → confirm → success “Funds held for your seat”.
- **States:** Idle · processing (soft fade, no spinner chaos) · held · failed (danger muted + retry).
- **Do:** Pass Stripe test — guest never needs Arc vocabulary.  
- **Don’t:** Wallet chrome as hero; gas/fee technical dumps; purple crypto gradients.

#### Attendance verify (ops)

- **Purpose:** Attest condition quickly at the door.
- **Anatomy:** Guest name · party size · status pill · large “Confirm attendance” · undo within short window.
- **States:** Expected · arrived · no-show · already settled.
- **Do:** Large tap targets; keyboard operable; status text + color.  
- **Don’t:** Kitchen tickets, course timers (Phase 2).

#### Settlement / split receipt

- **Purpose:** Show release + atomic split as a beautiful financial object.
- **Anatomy:** Seal (Brushed Brass hairline) → total → party lines (name, %, amount mono) → protocol fee → timestamp · reference id mono.
- **States:** Pending release · settled · paused · refunded.
- **Do:** Feel like a ceramic check presentation.  
- **Don’t:** Explorer links as primary; confetti on settle.

#### Treasury glance (ops)

- **Purpose:** Thin balances view (IC: polish deferred).
- **Anatomy:** Available · in escrow · recent settlements list (3–5 rows).
- **Do:** Enough for pilot night confidence.  
- **Don’t:** Full CFO treasury OS charts (Phase 3 company roadmap).

### 11.2 Shared primitives (all phases)

| Component | Notes |
|---|---|
| **Button** | Primary Deep Forest; secondary Warm Stone border; ghost text-only. Height 40 guest / 36 ops. Radius 4. |
| **Input** | Linen sunken fill; Warm Stone border; focus Deep Forest ring. |
| **Status pill** | Soft wash + label; never color-only. |
| **Amount** | Geist Mono; tabular nums; currency prefix muted. |
| **Empty state** | One sentence + optional washi field — no illustration clutter. |
| **Focus** | Always visible for keyboard; skip-to-content on guest flows. |

### 11.3 Phase 2+ component sketches

| Component | Purpose | Do / Don’t (summary) |
|---|---|---|
| **Menu browsing** | Course list as quiet editorial | Do: seasonal grouping. Don’t: delivery-app cards. |
| **Waitlist** | Scarce overflow | Do: calm position. Don’t: gamified queues. |
| **Kitchen workflow** | Ticket rail | Do: ops density still matte. Don’t: red alert spam. |
| **Course progression** | Guest/staff course state | Do: slow fades between courses. Don’t: progress rainbows. |
| **Split bill (guest UX)** | Beyond atomic settlement viz | Do: same receipt language. Don’t: Venmo-social UI. |
| **Wine pairing** | Pairing notes | Do: typographic, sparse. Don’t: score badges everywhere. |
| **Allergens** | Safety-critical | Do: high contrast + text. Don’t: icon-only warnings. |
| **Guest preferences** | CRM lite | Do: private, minimal. Don’t: engagement metrics. |
| **Analytics** | GMV / show-rate first | Do: few charts. Don’t: SaaS metric walls. |
| **Staff dashboard** | Night overview | Do: attendance + settle health. Don’t: clone Toast. |

---

## 12. Enterprise readiness (design)

| Requirement | Approach |
|---|---|
| Contrast | AA on all text tokens; document pairings |
| Keyboard | Focus ring token; logical tab order on MVP flows |
| Status | Label + color (+ icon when helpful) |
| i18n-ready type | Geist metrics; avoid text-in-images |
| Extensibility | Semantic tokens → later “settlement console” skin can tighten density without new palette |
| Audit / trust | Receipt and pause states are first-class, calm, printable |

---

## 13. Implementation guidance (when coding begins)

1. Import `tokens.css` (or generate from `tokens.json`) before component work.  
2. Build MVP surfaces only; reuse primitives.  
3. Hide chain: copy review gate on every guest string.  
4. No new colors outside the primitive set without design revision.  
5. Prefer tonal elevation; ban default shadow utilities.

---

## 14. Document control

| Version | Date | Notes |
|---|---|---|
| 1.0.0 | 2026-07-22 | Initial luxury Japanese hospitality direction; aligned to IC Gate beachhead |

**Supersedes:** Informal “private banking” one-liner in IC Gate §L Design — refined here as Japanese hospitality beachhead with settlement-extensible tokens.
