# TableOS — Investment Committee Gate (Opportunity Replacement + Economics)

**Status:** BINDING GATE — Step 2 (User Stories) remains **BLOCKED**  
**Date:** 2026-07-22  
**Version:** 1.0.0-ic-gate  
**Verdict:** **PIVOT** (hospitality-SaaS framing fails; settlement-infrastructure thesis may proceed only under conditions)  
**Epistemic labels:** VF = Verified Fact · RA = Reasoned Assumption · SP = Speculation

**Related:** `docs/prd/TABLEOS_PRD.md` · `docs/strategy/METHODOLOGY_IC_GATE.md` · `docs/finance/UNIT_ECONOMICS.md`

---

## Executive decision (one screen)

| Question | Answer |
|---|---|
| Is hospitality-only TableOS the highest-value Arc company? | **No** |
| Should we implement the current PRD as written? | **No** |
| What wins the replacement test? | **Condition-Gated Commercial Settlement OS** (multi-party escrow + atomic split + deterministic USDC settle on Arc) |
| Role of premium dining? | **Beachhead wedge / demo vertical only** — not the company |
| Step 2 unlocked? | **No** — blocked until pivot PRD + distribution evidence + legal custody path |

**One-line verdict:** **PIVOT** — kill “restaurant financial SaaS”; rebuild TableOS as Arc-native **condition-gated settlement infrastructure**, with premium multi-party dining events as the first wedge only if distribution proofs clear within 90 days.

**Surviving one-sentence VP:**  
TableOS is the settlement layer for high-value commercial obligations that must be escrowed in USDC, released on a verified condition, and split atomically to multiple parties — starting with premium experiential events where attendance is the condition.

---

## A. Opportunity Replacement Test

### A1. Five highest-value Arc opportunities (+ incumbent TableOS hospitality)

Scoring 1–10 each: Market importance · Arc-native advantage · Unit economics · Distribution · Category creation · 10-year infrastructure importance. Max = 60.

| # | Opportunity | Mkt | Arc | UE | Dist | Cat | Infra | **Total** | Order-of-magnitude EV (Y10 ARR potential, RA) |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Condition-Gated Commercial Settlement OS** (horizontal escrow+split for marketplaces, trade, platforms) | 10 | 10 | 9 | 7 | 9 | 10 | **55** | **$0.8B–$5B+** |
| 2 | **Platform Payout Infrastructure** (Stripe Connect–class multi-party, Arc-native) | 9 | 10 | 9 | 6 | 9 | 10 | **53** | **$0.5B–$3B** |
| 3 | **Corporate Multi-Entity Treasury OS** (USDC + FX + CCTP ops) | 9 | 9 | 8 | 6 | 7 | 9 | **48** | **$0.3B–$2B** |
| 4 | **AI Agent Commerce Settlement Rail** | 7 | 10 | 5 | 4 | 10 | 9 | **45** | **$0.2B–$10B** (binary; SP) |
| 5 | **Cross-Border B2B Payables Network** | 9 | 8 | 7 | 5 | 6 | 8 | **43** | **$0.2B–$1.5B** |
| X | **TableOS hospitality-only** (current PRD) | 5 | 8 | 6 | 4 | 4 | 4 | **31** | **$30M–$150M** |

### A2. Why each alternative beats or loses to hospitality-only TableOS

| Candidate | Why strong | Why not choose as primary (or why replace TableOS) |
|---|---|---|
| **#1 Settlement OS** | Largest durable Arc-fit; Stripe cannot do true programmable condition+atomic split+dollar gas cleanly; network effects via settlement graph | **WINNER** — TableOS must become this, or die |
| #2 Platform Payouts | Same engine as #1 with GTM via platforms | Overlaps #1; fold into Settlement OS product line |
| #3 Treasury OS | CFO budget; Circle-adjacent | Competes with banks/Modern Treasury/Circle itself; weaker “condition” wedge for hackathon uniqueness |
| #4 Agent Rail | Category-defining if agents monetize | Who pays *today*? Revenue timing fails IC for near-term survival (SP demand) |
| #5 Cross-border payables | Huge TAM | Circle CPN / Wise / banks; differentiation thinner; distribution brutal |
| Hospitality-only | Clear demo; emotional narrative | Ceiling too low; distribution to restaurants historically brutal; becomes Tock-with-wallet |

### A3. Quantified value difference (explicit assumptions)

**Assumptions (RA):**
- Hospitality ICP: ~25k globally addressable premium prepaid venues in reachable markets by Y7; 8% penetration aggressive → ~2,000 paying orgs
- ARPC blended Y7: $6k/yr SaaS + take-rate ≈ $9k/yr total → **~$18M ARR** base; aggressive take-rate scale → **~$80–150M ARR** if GMV huge
- Settlement OS ICP: marketplaces/platforms + mid-market B2B; 500 platforms × $200k ACV by Y7 base → **~$100M ARR**; aggressive 2,000 × $400k + usage → **$0.8B–$2B ARR**

| Scenario | Hospitality-only Y7 ARR | Settlement OS Y7 ARR | Multiple |
|---|---|---|---|
| Conservative | $8M | $40M | **5×** |
| Base | $25M | $120M | **~5×** |
| Aggressive | $120M | $800M | **~7×** |

**Strategic value gap:** Infrastructure settlement compounds (liquidity, integrations, compliance attestations, partner graph). Hospitality SaaS does not. EV gap is **≥5× ARR** and **≥10× strategic option value** (RA).

### A4. Gate decision on opportunity

**Hospitality-only TableOS: FAIL replacement test.**  
**Chosen opportunity: #1 Condition-Gated Commercial Settlement OS**, branded TableOS (“the settlement table”), with **premium multi-party experiential events as Beachhead A** (not the company).

**GO / NO-GO / PIVOT:** **PIVOT**

---

## B. Category & Infrastructure Test

### Can this become one of the most important infrastructure companies in its market?

| Framing | Infrastructure potential | Verdict |
|---|---|---|
| Restaurant booking / F&B SaaS | Low — Toast/Tock/SevenRooms own category | **Fail — redesign** |
| Crypto payments for restaurants | Low — feature, not infra | **Fail** |
| **Condition-gated commercial settlement** | High — new layer between banks’ escrow and Stripe Connect | **Pass if executed** |

### New category (not competing inside an existing one)

**Category name (proposed):** **Condition-Gated Settlement (CGS)**  
**Definition:** Software + Arc settlement that holds USDC until an attested business condition (attendance, delivery, milestone, API SLA) and then atomically distributes to N parties with auditable finality.

**Not:** reservations software · not remittance · not “accept USDC” checkout · not NFT tickets.

**Category narrative:** Stripe moves cards. Banks hold escrow slowly. Marketplaces spreadsheet splits. **TableOS settles conditional obligations.**

---

## C. Enterprise Readiness Scorecard

Scored for **pivoted Settlement OS architecture intent** (not hospitality toy). Anything &lt;9 requires redesign → redesign applied.

| Dimension | Hospitality PRD as-is | After redesign (intent) | Redesign to reach ≥9 |
|---|---|---|---|
| Security | 5 | **9** | Formal threat model; OZ+audit before mainnet; no company hot-wallet custody; role separation; KMS; bug bounty; withdrawal policies |
| Scalability | 4 | **9** | Event-sourced ledger; queue-based settle; horizontal API; chain abstraction; capacity SoT design; multi-tenant isolation |
| Compliance | 3 | **9** | Legal entity strategy; minimize MSB surface; ToS/jurisdiction matrix; sanctions screening roadmap; audit exports; DPA |
| Reliability | 5 | **9** | Idempotent settlement; reconciler (chain SoT); pause; incident runbooks; multi-AZ; SLOs 99.9% API |
| Supportability | 4 | **9** | Admin tooling; impersonation audit; status page; tiered support; partner runbooks |
| Maintainability | 5 | **9** | Modular contracts (SRP); versioned APIs; feature flags; ADR culture |
| Observability | 4 | **9** | OTel+Sentry+metrics (TVL, settle latency, fail rate); paging; audit trails |
| Performance | 6 | **9** | Async settle UX; p95 API &lt;200ms read; guest pay path optimized; indexer lag SLO |

**Hospitality-as-company as-is: enterprise-unready.** Pivoted infra intent can hit ≥9 on architecture/process — **implementation still future work**.

---

## D. Feature Subtraction (~30%+ removed)

Starting from PRD MVP surface, subtract until essentials only. Test: does customer value for **settlement buyer** drop?

### Died (removed or deferred)

| Feature | Why removed | Value impact |
|---|---|---|
| Rich event marketing fields / photos gallery | Not settlement | None for buyer CFO/ops |
| Multiple cancel policy complexity (hackathon+) | Ops complexity | Defer; 2-policy max |
| Protocol treasury UI polish beyond balances | Nice-to-have | Thin balances enough |
| Email+calendar ICS (P1) | Keep as post-wedge | Slight guest UX loss OK early |
| Partner invite UX polish | Manual address config first | Acceptable for beachhead |
| Dispute flag UI (P1) | Manual pause+refund first | Rare path |
| Webhooks (P1) | Not needed for first 10 | Zero for beachhead |
| Staff role beyond single admin+door | Collapse roles early | Tiny ops cost |
| Org settings sprawl | Minimum viable org | None |
| Public multi-restaurant browsing | Marketplace trap | **Increases** focus |
| Guest profile / history | CRM creep | None for settlement |
| Analytics beyond GMV/show-rate | Defer | Low |

### Surviving essentials (post-subtraction)

1. Create obligation (event/order) with capacity/price  
2. Payer locks USDC in escrow  
3. Condition attestation (attendance)  
4. Atomic release + N-party split + fee  
5. Refund / cancel paths  
6. Pause + audit log  
7. Balances view  

**~40% of PRD MVP chrome removed.** Customer value for settlement **does not decrease**; booking-software envy decreases (good).

---

## E. Non-Blockchain Buyer Test

**Prompt:** Buyer never heard of Arc. Would they buy?

| Pitch | Buy? |
|---|---|
| “Accept crypto on Arc L1” | **No** |
| “Restaurant website with wallets” | **No** |
| “Prepaid seats with funds held until guests arrive, then automatic partner payouts the same night — fewer no-shows, no spreadsheet splits” | **Yes** (if UX hides chain) |

**Redesigned customer-dependent VP (no chain words):**  
“Hold customer prepay until the service happens, then pay every partner automatically — with a real-time money ledger.”

Arc is the **implementation advantage**, not the headline.

---

## F. Stripe Test (every remaining MVP feature)

| Feature | Could Stripe ship tomorrow? | Keep? |
|---|---|---|
| Create event / obligation record | Yes (Checkout + DB) | Keep as UX shell only |
| Card prepay hold | Yes (manual capture) | **Not our differentiator** |
| **USDC escrow with deterministic finality + dollar-stable fees** | No (not native; gas/volatility/chain trust) | **KEEP — Arc-critical** |
| **Attendance-conditioned release** | Partial (logic off-platform; merchant of record complexity) | **KEEP** — Arc makes it programmable + auditable |
| **Atomic multi-party split same settlement** | Partial (Stripe Connect transfers — delayed, bank rails, not atomic on-chain) | **KEEP** — meaningfully different for multi-party USDC |
| Balances ledger | Yes | Keep thin |
| Pause/refund | Yes | Keep |

**Removed/redesigned:** anything that is pure Stripe Checkout clone without condition+split. TableOS must not be “Stripe but USDC.”

---

## G. Distribution Credibility (**BLOCKING**)

### Honest assessment

Restaurant-owner SMB sales + consumer wallet UX is **not credible** as a primary path to venture-scale without massive burn (Toast-class). Distribution is the #1 kill risk.

### Redesigned beachhead (more credible)

**Buyer:** Hotel F&B / dining club / chef-residency **organizer** who already sells prepaid scarce seats and pays 2–4 parties.  
**Not:** random indie café.

| Stage | Profile | How we get them |
|---|---|---|
| **First customer** | 1 luxury hotel private-dining program OR 1 destination chef residency organizer (Dubai/Miami/Singapore/Lisbon/NYC) already running prepaid collabs | Founder-led; warm intro via Circle/Arc ecosystem, hospitality operators, or F&B consultants; paid pilot |
| **First 10** | 5 hotel private dining + 3 dining clubs + 2 multi-chef residency producers | Same; case study from #1; hospitality operator Slack/WhatsApp networks; Arc hackathon visibility |
| **First 100** | Regional clusters + 5–10 **platform** design partners (event platforms embedding TableOS settlement API) | Partnership GTM shift; not 100 SMB door-knocks |

### Strategies

| Motion | Plan | Credibility |
|---|---|---|
| Acquisition | Founder-led outbound to 50 named accounts; content on collab-dinner settlement failures | Medium if named list exists |
| Sales | Pilot: 90-day, success = show-rate + partner payout time; land $1–2k/mo + 0.8% | Medium |
| Partnerships | Circle/Arc ecosystem; hotel tech (SevenRooms adjacency — integrate don’t replace); event platforms | **Required** for 100 |
| Expansion | Multi-property hotels; then API for platforms | High if product is infra |
| Community | Chef/operator circles; not crypto Twitter as primary | Medium |

**Greenlight implementation?** **Not yet.** Distribution is **conditionally credible** only with: (a) named 50-account list, (b) 3 discovery calls/LOIs in 30 days, (c) one paid pilot in 90 days. Else full pivot to marketplace-platform GTM (sell to platforms only; hospitality demo remains hackathon theater).

---

## H. Compounding / Network Effects

Hospitality-only: weak (each restaurant silo).

**Required compounding loop (pivoted):**

```
More merchants/platforms settle on TableOS
  → more partners receive USDC payouts (wallets already warm)
  → more counterparties prefer TableOS obligations
  → denser split graphs + reusable payout identities
  → better risk/show-rate data models
  → lower dispute rates → higher take-rate willingness
  → more platforms embed API
  → liquidity/attention compounds
```

If we cannot get **partner payout network + platform embeds**, redesign business model toward pure horizontal API sold only to platforms (two-sided from day one).

---

## I. Multiple Candidate Company Designs

| ID | Design | Y5 ARR base (RA) | Dist | Arc must? | Decision |
|---|---|---|---|---|---|
| C1 | Hospitality SaaS (current PRD) | $15–40M | Weak | Partial | **Reject** |
| C2 | USDC checkout for restaurants | $5–20M | Weak | Weak | **Reject** |
| C3 | Agent commerce rail first | $0–200M | Very weak now | Yes | **Reject near-term** |
| C4 | Corporate treasury OS | $40–150M | Hard enterprise | Yes | **Reject as primary** (keep as Phase 3 module) |
| C5 | **Condition-Gated Settlement OS + experiential beachhead** | $60–200M | Medium if platform shift | **Yes** | **SELECT** |
| C6 | Horizontal marketplace escrow API only (no hospitality UI) | $80–250M | Better ACV | Yes | **Runner-up** — activate if beachhead LOIs fail |

**Selection:** **C5**, with kill-switch to **C6** at day 90 if hospitality beachhead lacks LOIs.

---

## J. Premortem — 10 failure reasons (redesign now)

| # | Failure mode | Redesign today |
|---|---|---|
| 1 | Wallet friction kills guest conversion | Paymaster + on-ramp partners; hide chain; measure conversion before scale |
| 2 | MSB enforcement shuts custody model | Non-custodial contract architecture; counsel before public launch |
| 3 | Becomes Tock clone; loses focus | Explicit anti-roadmap; settlement-only OKRs |
| 4 | Restaurant SMB CAC blows up | Sell hotels/platforms; not spray SMB |
| 5 | Smart contract exploit | Audit, caps, pause, phased TVL limits |
| 6 | Arc timeline slips | Chain abstraction; don’t bet company solely on mainnet date |
| 7 | Stripe Connect “good enough” | Only sell where condition+multi-party+cross-border USDC matters |
| 8 | No compounding; silo merchants | Force partner graph + API embeds in roadmap |
| 9 | Team builds POS/CRM | Hiring scorecards reject feature tourists |
| 10 | Take-rate race to zero | Productize compliance+audit+reliability; enterprise contracts |

---

## K. Founder Notes (decision record)

**Why this decision?** Hospitality-only fails EV, category, and distribution tests. Settlement OS passes Arc-native and infrastructure tests. Keeping TableOS name + dining wedge preserves hackathon narrative without lying about the company.

**Alternatives considered:** Pure agent rail; treasury OS; hospitality SaaS; USDC checkout; horizontal API-only.

**Trade-offs:** Narrower near-term storytelling (“restaurants”) vs larger true market; accept harder enterprise sales; accept legal complexity.

**Risks accepted:** Arc maturity timing; early wallet UX; regulatory gray zones with mitigations.

**Risks rejected:** Building marketplace discovery; NFT growth hacks; competing as booking software; scaling SMB paid acquisition pre-PMF.

**Future implications:** PRD must be rewritten for Settlement OS; dining is vertical pack #1.

**Technical debt created (if we proceed wrong):** Hospitality-specific schema coupling — avoid by modeling generic `Obligation` / `Condition` / `Split`.

**Business debt created:** Brand confusion (“Table” = dining). Mitigate with category education; accept or rename later (ClearTable / SettleTable).

---

## L. Company Operating System (planning outlines)

### Product
- Roadmap policy: settlement primitives first; vertical UX as skins  
- Discovery: 10 calls/month mandatory until PMF  
- Kill list reviewed monthly  

### Engineering
- Stack per PRD; monorepo; contract-first for escrow  
- Definition of done includes reconciling chain ↔ DB  

### Security
- Threat model before mainnet; audit budget line item; pause drills  

### Design
- Private-banking aesthetic; chain chrome hidden; door-staff speed  

### Sales
- Named-account ABM; pilot playbook; no self-serve SMB until conversion proven  

### Marketing
- Category design (CGS); case studies on payout time + show-rate; not crypto memes  

### Customer Success
- Pilot success metrics; weekly settle health; war room for first events  

### Finance
- Unit economics dashboard (see finance doc); take-rate + SaaS dual revenue  

### Legal
- Counsel on MSB; ToS; sanctioned jurisdictions; data processing  

### Operations
- Event-night support rota for first 20 live events  

### Hiring
- First 8: Founding eng (fullstack+solidity), product, founding AE, ops/CS hybrid, designer fractional  
- Avoid hiring growth marketers pre-PMF  

### Documentation
- Obligation state machine; runbooks; ADR  

### Roadmap (company)
- 0–90: wedge validation  
- 90–365: platform API  
- Y2: adjacent conditions (delivery/milestone)  
- Y3: treasury + working capital with licensed partners  

### Investor materials outline
- Problem: conditional multi-party money is broken  
- Why now: Arc USDC L1 + prepaid experiential + platform economy  
- Product: CGS  
- Wedge → platform  
- Unit economics  
- Team  
- Ask / use of funds  

### Developer ecosystem
- Public settlement API; webhooks; sandbox on Arc testnet; example apps (dining skin, marketplace skin)

---

## M. Founder Economics

**See full models:** `docs/finance/UNIT_ECONOMICS.md`

### Headlines (Base case, pivoted Settlement OS with experiential beachhead)

| Metric | Base |
|---|---|
| Blended CAC (Y2) | **$4,800** |
| LTV | **$42,000** |
| **LTV:CAC** | **8.8×** |
| Payback | **11 months** |
| NRR (Y3) | **125%** |
| Gross margin | **78%** |

Hospitality-only base LTV:CAC ~3–4× with payback often &gt;18 months under realistic SMB CAC — **fails payback gate** → another reason to PIVOT.

### IC $10M review

**Investable today as hospitality SaaS?** **No.**  
**Investable as Settlement OS seed thesis?** **Conditionally** — after distribution evidence + legal path + Arc technical validation.

**Greatest uncertainties:** guest/payer conversion without wallet pain; regulatory classification; Arc production readiness; willingness to pay take-rate vs Stripe Connect.

**Evidence before investing:** 3 LOIs, 1 live pilot with real USDC TVL, counsel memo, conversion funnel metrics, Arc testnet production rehearsal.

**Do not approve scaling capital** until payback ≤14 months demonstrated on ≥20 accounts and NRR ≥110%.

---

## Methodology improvement

Prior process: PRD-first → risk of building the wrong company elegantly.  
**New mandatory order:** Opportunity replacement → Category/infra test → Distribution credibility → Unit economics IC → Feature subtraction → PRD rewrite → User stories.

Documented in `docs/strategy/METHODOLOGY_IC_GATE.md`.

---

## Conditional GO criteria (only after pivot)

1. Rewrite PRD to Settlement OS + Obligation model (dining as skin)  
2. Named beachhead list (50) + 3 LOIs in 30 days  
3. Outside counsel custody/MSB memo  
4. Wallet conversion prototype test (n≥20 target guests) ≥X% (set target in rewrite)  
5. Unit economics base payback ≤14 months in model with measured CAC inputs  

Until then: **Step 2 User Stories = BLOCKED.**

---

## Document control

- Canvas: `tableos-ic-gate.canvas.tsx`  
- Finance detail: `docs/finance/UNIT_ECONOMICS.md`  
- Owner: Founder IC session 2026-07-22
