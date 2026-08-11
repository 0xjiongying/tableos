# FlowArc Experience System

**Status:** Authoritative for marketing + product experience (v2.1 — Value Streams)  
**Supersedes:** Restaurant-OS / hospitality-choreography-first experience narratives  
**Pairs with:** [`FLOWARC_DESIGN_SYSTEM.md`](./FLOWARC_DESIGN_SYSTEM.md) · `apps/web/src/styles/tokens.css` · `apps/web/src/components/experience/`

---

## Vision

FlowArc is **not** a POS, reservation tool, or payment gateway.

It is a **programmable financial operating system for the hospitality industry**, starting with premium restaurants, luxury hotels, and tourism businesses.

Every payment becomes an intelligent financial workflow. The interface makes **programmable money** tangible, trustworthy, and effortless.

**Hospitality is the setting. Programmable money is the protagonist.**

---

## Experience philosophy

1. **Money is Alive** — money moves, flows, splits, settles, escrows, accumulates. Animation equals movement of value.
2. **Finance Becomes Visual** — living systems, not spreadsheets or accounting tables.
3. **Automation Without Complexity** — calm, transparent, predictable; always show what happened / why / what’s next.
4. **Trust Through Transparency** — escrow, settlement, distribution, and treasury are observable; nothing hidden.

---

## Signature metaphor: Value Streams

Every payment is a **continuous stream**. Streams merge, split, lock, release, accumulate, and rebalance.

Money behaves like a physical medium: liquid, flowing, connecting, pooling — expressed as:

- Architectural lines  
- Flowing paths  
- Layered topology  
- Premium editorial layouts  
- Financial diagrams  
- Liquid geometry  
- Structured grids  

### Explicitly forbidden aesthetics

- Glowing blockchain particles  
- Hexagons / floating coins  
- Crypto neon gradients  
- Glowing chains  
- Digital particle spam  
- Robot / chatbot-first AI chrome  
- Restaurant POS chrome as the hero metaphor  

---

## Emotional / financial journey

```
Reservation → Commitment → Escrow → Confirmation → Dining
  → Settlement → Revenue Distribution → Treasury Update → Business Insights
```

**Confidence** = value continuously progressing through clear financial states.

### Website scroll chapters

| # | Chapter | Financial beat |
|---|---|---|
| 1 | Why programmable money | Isolated payments vs automated financial workflows |
| 2 | How value moves | Authorization → escrow → settlement → distribution → treasury → insight |
| 3 | Core MVP | Six settlement-critical capabilities only |
| 4 | Value Streams | Interactive payment-lifecycle demo |
| 5 | Built on Arc | Stablecoin-native rails; verified facts |
| 6 | Trust & scale | Enterprise calm → global premium hospitality infra |

---

## Motion language by financial state

| State | Motion character | Implementation cue |
|---|---|---|
| **Authorization** | Firm commit — stream arrives and locks intent | Path draws to a stop; opacity settles to 1 |
| **Escrow** | Contained hold — liquid geometry pauses in a vessel | Dash/fill holds; waiting pulse on containment — **not a spinner** |
| **Confirmation** | Condition met — quiet acknowledgment | Soft state advance; text announces why |
| **Settlement** | Release — locked stream opens and flows forward | Path unlocks; stroke accelerates downstream |
| **Distribution** | Split — one stream becomes multiple parallel paths | Fork topology; staggered path reveals (house / chef / venue / organizer) |
| **Treasury** | Accumulation — streams pool into a calm basin | Paths converge; fill rises progressively |
| **Forecast** | Quiet projection — thin forward line, never chat-first | Soft extension beyond treasury; low contrast |

UI chrome may use arrive / press / lift primitives. **Value Streams own the money narrative.**

---

## Seven motion layers (subordinate to Value Streams)

1. **Environmental** — TOD wash, grain, sparse dust, pointer light (never crypto glow)  
2. **Spatial** — camera-like section depth on marketing scroll  
3. **Interface** — button compress→release; plane lift; cascade lists  
4. **Operational** — state-driven financial machine (text + motion; never motion-only status)  
5. **Data** — progress rails; continuous path flow (Value Streams)  
6. **Cinematic** — hero parallax + Value Stream SVG loops  
7. **Emotional** — calm, precise, continuous, predictable  

---

## Experience tokens

Wired in `apps/web/src/styles/tokens.css` (synced to `docs/design/tokens.css`):

| Domain | Examples |
|---|---|
| Motion | `--tos-duration-*`, `--tos-ease-*`, `--tos-stagger-step` |
| Depth | `--tos-depth-*`, `--tos-parallax-*`, `--tos-z-*` |
| Lighting | `--tos-light-ambient`, `--tos-light-pointer`, `--tos-light-bloom`, TOD washes |
| Materials | `--tos-mat-paper`, `--tos-mat-glass`, `--tos-mat-ceramic` |
| Shadow | `--tos-shadow-ambient`, `--tos-shadow-lift`, `--tos-shadow-press` |
| Atmosphere | `--tos-grain-opacity`, `--tos-dust-opacity`, `--tos-dof-blur` |

`prefers-reduced-motion: reduce` zeroes durations, parallax, dust drift, and stream animations. Financial status remains readable without motion (`aria-live` + labels).

---

## Component map

| Path | Role |
|---|---|
| `components/experience/value-streams.tsx` | Signature SVG Value Stream cinematic |
| `components/experience/motion.ts` | Financial state + UI motion presets |
| `components/experience/ambience.tsx` | Living atmosphere (subordinate) |
| `components/experience/spatial.tsx` | Camera-like section depth |
| `features/marketing/components/workflow-demo.tsx` | Interactive payment-lifecycle demo |
| `features/marketing/components/hero.tsx` | Brand + Value Stream protagonist visual |
| `features/marketing/content.ts` | Positioning, ICP, MVP six, Arc facts |

---

## Performance & accessibility

- CSS/SVG first; pointer light uses throttled rAF; pause under reduced motion  
- No perpetual JS particle systems  
- WCAG AA contrast; keyboard focus rings; `aria-live` for financial state  
- Never convey financial status by motion alone  

---

## Explicitly deferred

| Item | Why |
|---|---|
| Hero film / stock video with music | Quality bar; fake promo breaks trust |
| Crypto particle / chain aesthetics | Contradicts Value Streams |
| Audio confirmations | Skip unless trivial and off-by-default |
| Full 3D digital twin | Out of MVP craft scope |
| Chat-first AI UI | Treasury intelligence = summaries / prioritization only |

---

## Changelog

| Version | Date | Notes |
|---|---|---|
| 2.1.0 | 2026-07-22 | Re-centered: programmable money as sole protagonist; supersede dual hospitality-OS narrative |
| 2.0.0 | 2026-07-22 | Value Streams introduced |
| 1.0.0 | 2026-07-22 | Initial hospitality choreography experience pass (superseded) |
