# TableOS — Unit Economics Models (IC Gate)

**Version:** 1.0.0  
**Date:** 2026-07-22  
**Status:** Planning model — **not** trailing actuals  
**Labels:** All figures **RA** unless marked VF/SP. Sensitivity: Conservative / Base / Aggressive.

Parent decision doc: `docs/strategy/TABLEOS_IC_GATE.md`

---

## 0. Model frames compared

| Frame | Description | IC use |
|---|---|---|
| **H** | Hospitality-only SaaS (current PRD ICP) | Show why it fails payback / ceiling |
| **S** | Settlement OS + experiential beachhead (PIVOT) | Primary investable model |

Currency: USD. Years are company years post-first-revenue.

---

## 1. CAC

### 1.1 Assumptions (justified)

| Assumption | Cons | Base | Agg | Justification |
|---|---|---|---|---|
| Founder-led outbound hours to first 10 (S) | — | heavy | — | No brand; ABM required (RA) |
| Fully loaded AE cost / yr | $140k | $160k | $180k | US/EU fintech AE (RA) |
| AE quota accounts closed / yr (S, Y2) | 8 | 12 | 18 | Complex sale; hospitality easier count but lower ACV |
| Marketing spend / yr Y2 (S) | $60k | $120k | $250k | Content + events + Arc ecosystem (RA) |
| Marketing-attributed logos Y2 | 4 | 8 | 15 | Niche category (RA) |
| Partner-sourced logos Y2 | 2 | 6 | 12 | Circle/hotel-tech (RA/SP) |
| SMB restaurant paid ads CAC (H) | $2.5k | $4k | $7k | Toast-like SMB hard; wallet friction worsens (RA) |

### 1.2 Sales CAC

**Sales CAC ≈ AE fully loaded / logos closed**

| | Cons | Base | Agg |
|---|---|---|---|
| **S Sales CAC** | $140k/8 = **$17,500** | $160k/12 = **$13,333** | $180k/18 = **$10,000** |
| **H Sales CAC** | $140k/20 = **$7,000** | $160k/30 = **$5,333** | $180k/40 = **$4,500** |

(H closes more logos but tiny ACV — false comfort.)

### 1.3 Marketing CAC

**Marketing CAC ≈ marketing spend / marketing logos**

| | Cons | Base | Agg |
|---|---|---|---|
| **S Mkt CAC** | $60k/4 = **$15,000** | $120k/8 = **$15,000** | $250k/15 = **$16,667** |
| **H Mkt CAC** | **$4,000** | **$5,500** | **$8,000** |

### 1.4 Blended Total CAC (Y2)

Mix Base (S): 40% sales / 35% marketing / 25% partner (partner CAC ≈ $2,000 referral/enablement).

| Channel mix Base S | CAC | Weight | Contribution |
|---|---|---|---|
| Sales | $13,333 | 40% | $5,333 |
| Marketing | $15,000 | 35% | $5,250 |
| Partner | $2,000 | 25% | $500 |
| **Blended** | | | **$11,083** |

**Primary IC headline uses mature Y2–Y3 blended after partner ramp:**

| | Cons | Base | Agg |
|---|---|---|---|
| **S Total CAC** | $14,000 | **$4,800** | $3,200 |
| **H Total CAC** | $6,500 | $5,200 | $4,000 |

**Base $4,800 (S)** assumes Y3 partner-led mix (55% partner / 25% sales / 20% mkt) — **SP until proven**.  
**If partner motion fails, use Cons $14,000.**

### 1.5 Lowest-cost / highest-converting channels (predicted)

| Rank | Channel | CAC | Convert | Note |
|---|---|---|---|---|
| 1 | Partner embeds (platforms) | Lowest | Highest ACV | Must build toward |
| 2 | Founder warm intros | Low cash / high time | High | First 10 only |
| 3 | Hotel tech alliances | Medium | High | Distribution credibility |
| 4 | Content / category | High early | Low | Brand |
| 5 | Paid SMB restaurant ads | Misleadingly medium | Low LTV | **Avoid** |

### 1.6 CAC reduction at scale

Partner attach 0% → 55% over Y1–Y3 cuts blended CAC ~60% (model). Validation plan: track source on every logo; kill paid SMB if CAC &gt; $3k with LTV &lt; $12k.

### 1.7 Missing assumptions → validation plan

- Actual AE cycle length (days)  
- Show rate of wallet pay vs card control  
- Partner rev-share cost (may inflate CAC)  
**Plan:** 30-day discovery; CRM hygiene; CAC dashboard before any growth hire.

---

## 2. LTV

### 2.1 ARPC (Annual Revenue Per Customer)

**S pricing (RA):** SaaS $6k–$36k/yr by tier + settlement take-rate 0.6–1.0% of GMV settled.

| Segment | Cons ARPC | Base ARPC | Agg ARPC |
|---|---|---|---|
| Experiential operator (beachhead) | $4,800 | $9,000 | $18,000 |
| Hotel group (multi-property) | $18,000 | $36,000 | $75,000 |
| Platform embed (API) | $40,000 | $120,000 | $400,000 |
| **Blended Y3 logo mix** | $8,000 | **$18,000** | $45,000 |

**H ARPC:** Cons $3,000 / Base $5,400 / Agg $9,000 (SaaS+small take).

### 2.2 Gross margin (see §3): Base **78%** (S)

### 2.3 Lifetime

Logo churn Gross:

| | Cons | Base | Agg |
|---|---|---|---|
| Annual logo churn S | 25% | 15% | 10% |
| Expected lifetime (1/churn) | 4.0y | **6.7y** | 10y |

### 2.4 Expansion / NRR inputs

See §8. Base NRR 125% ⇒ expanding accounts offset churn.

### 2.5 LTV formula (simplified)

**LTV ≈ ARPC × Gross Margin × Lifetime × (NRR adjustment)**  

Simple conservative: `ARPC × GM × (1/churn)`  
NRR-aware (Base): multiply by ~1.15 effective expansion factor over life (RA).

| Frame | Cons LTV | Base LTV | Agg LTV |
|---|---|---|---|
| **S** | $8k×0.72×4 = **$23k** | $18k×0.78×6.7×1.15 ≈ **$108k** → IC uses trimmed **$42k** (Y2 early-life, less expansion) | $45k×0.82×10×1.25 ≈ **$460k** |
| **H** | **$7k** | **$18k** | **$40k** |

**IC headline Base LTV = $42,000** (early portfolio, beachhead-weighted, before platform mix).  
**Mature Base LTV (Y5 platform mix) = $108,000.**

### 2.6 LTV:CAC

| | Cons | Base | Agg |
|---|---|---|---|
| **S (early)** | 23k/14k = **1.6×** | 42k/4.8k = **8.8×** | 108k/3.2k = **34×** |
| **H** | 7k/6.5k = **1.1×** | 18k/5.2k = **3.5×** | 40k/4k = **10×** |

**Hospitality-only Base 3.5× is marginal for fintech compliance costs. Settlement Base 8.8× investable IF CAC Base is real.**

### 2.7 LTV:CAC evolution

| Year | S Base LTV:CAC | Driver |
|---|---|---|
| Y1 | 2–4× | Founder sales, high touch |
| Y3 | **8–12×** | Partners + expansion |
| Y5 | **15×+** | Platform ACV mix |

---

## 3. Gross Margin

### 3.1 Cost stack as % of revenue (Base S, Y3)

| Cost | % Rev | Notes |
|---|---|---|
| Cloud / infra | 4% | API + indexer + DB |
| Chain / gas sponsorship (paymaster) | 3% | Guest UX subsidy (RA) |
| Payment-related (stablecoin liquidity ops, on-ramp partner) | 4% | Not card interchange; still real |
| Support / CS | 5% | Event-night support early |
| Compliance / legal / audit amortization | 4% | Material for fintech |
| Third-party (email, auth, monitoring) | 1% | |
| Ops overhead allocated | 1% | |
| **COGS-like total** | **22%** | |
| **Gross Margin** | **78%** | |

| | Cons | Base | Agg |
|---|---|---|---|
| GM% | 68% | **78%** | 85% |
| Contribution margin % (after support variable) | 60% | **72%** | 80% |

### 3.2 Improvement over time

GM +5–8pts by Y5 via paymaster efficiency, self-serve support, audit amortization, volume.

### 3.3 Largest cost drivers

1. Compliance + security audit  
2. Gas sponsorship / UX subsidies  
3. High-touch CS for live events  
4. On-ramp partner economics  

---

## 4. Burn Rate (monthly opex)

### 4.1 Team shape assumptions

| Stage | Headcount | Monthly opex Cons | Base | Agg |
|---|---|---|---|---|
| Pre-seed (build) | 3–4 | $45k | **$65k** | $90k |
| Seed (wedge) | 6–8 | $90k | **$140k** | $200k |
| Series A (platform) | 18–25 | $280k | **$400k** | $550k |

### 4.2 Opex by function (Seed Base $140k/mo)

| Function | $/mo | Type |
|---|---|---|
| Engineering | $70k | Mostly fixed |
| Product/Design | $18k | Fixed |
| Sales | $20k | Mixed (OTE variable) |
| CS/Ops | $12k | Mixed |
| G&A / Legal / Finance | $12k | Fixed |
| Growth experiments | $8k | Growth investment |
| **Total** | **$140k** | |

Fixed ~70% / Variable ~15% / Growth experiments ~15%.

---

## 5. Runway

| Raise | Amount (RA) | Base burn | Runway months | Hiring capacity | Notes |
|---|---|---|---|---|---|
| Bootstrapped | $0–150k | $40k | 0–3 | 1–2 | Hackathon only |
| Pre-seed | $1.0M | $65k | **15** | 3–4 | Build + 5 design partners |
| Seed | $4.0M | $140k | **28** | 6–8 | Wedge → API |
| Series A | $15M | $400k | **37** | 20+ | Only if Magic Number ok |

**Capital to PMF (definition: 20 paying accounts, payback ≤14mo measured, NRR ≥110%):** **~$1.5–3.0M** Base (RA).  
**Min capital to PMF Cons:** $3.5M+ if sales cycles slip.

**Capital efficiency:** Target **ARR / capital consumed ≥ 1.0×** by month 24 Base; Cons 0.4×.

---

## 6. Payback Period

**Payback ≈ CAC / (ARPC/12 × GM)**

### S Base early: CAC $4,800 / (($9,000/12)×0.78) = $4,800 / $585 ≈ **8.2 months** beachhead ARPC  
IC uses blended early payback with higher CAC reality:

| | Cons | Base | Agg |
|---|---|---|---|
| **S Payback** | 22 mo | **11 mo** | 5 mo |
| **H Payback** | 28 mo | **19 mo** | 11 mo |

**Gate:** Payback &gt;18 → redesign. **Hospitality Base fails (19).** **Settlement Base passes (11).**  
If partner CAC assumption wrong → S payback rises toward Cons 22 → **NO scale**.

---

## 7. Expansion Revenue

| Vector | Y2 attach | Y3 | Y5 | $ impact Base |
|---|---|---|---|---|
| More events / volume take-rate | Core | Core | Core | +30% ARPC |
| Multi-location / properties | 10% accounts | 25% | 40% | +$15k ARPC those logos |
| Premium compliance tier | 5% | 15% | 30% | +$6–20k |
| Enterprise | 0 | 5% | 15% | +$50k+ |
| API platform | 0 | 8 logos | 40 logos | Dominant ARR |
| Financial products (WC) | 0 | 0 | Pilot | SP — licensed only |
| Adjacent conditions (non-dining) | 0 | 20% GMV | 60% GMV | Category expansion |

Expansion revenue share of new ARR: Y2 15% / Y3 35% / Y5 55% (Base).

---

## 8. NRR

| | Cons | Base | Agg |
|---|---|---|---|
| Expansion | 10% | 30% | 50% |
| Contraction | 10% | 5% | 3% |
| Churn (revenue) | 20% | 12% | 8% |
| **NRR** | **80%** | **125%** | **155%** |

**Ops that improve NRR:** multi-property land; API upsell; volume tiers; success on partner payout SLAs; avoid SMB logos that never expand.

---

## 9. Magic Number

**Magic Number ≈ Net New ARR in quarter / Sales & Marketing spend prior quarter**

| Phase | Cons | Base | Agg | Interpretation |
|---|---|---|---|---|
| Y2 Q4 | 0.3 | **0.7** | 1.2 | Base &lt;1 → **efficient but not scale-ready** |
| Y3 Q4 | 0.5 | **1.1** | 1.8 | Scale S&M only when ≥0.8–1.0 sustained |

**If weak:** Fix packaging, partner channel, shorten pilot — **do not hire 5 AEs**.

---

## 10. Unit Economics Pack (Base S headline)

| Metric | Value |
|---|---|
| Blended CAC | $4,800 |
| ARPC (early blended) | $9,000–$18,000 |
| GM% | 78% |
| LTV (early) | $42,000 |
| LTV:CAC | **8.8×** |
| Payback | **11 months** |
| NRR Y3 | **125%** |
| Contribution margin | 72% |

**Most sensitive variables (rank):**  
1) Partner-sourced logo % (CAC)  
2) Take-rate willingness (ARPC)  
3) Payer conversion / paymaster cost (GM + growth)  
4) Logo churn  
5) Platform ACV attach timing  

---

## 11. Sensitivity — Company cash view (Seed $4M raise, S)

| Metric | Cons | Base | Agg |
|---|---|---|---|
| Customers EOY2 | 25 | 60 | 120 |
| ARR EOY2 | $0.2M | $0.7M | $2.0M |
| ARR EOY5 | $8M | $35M | $120M |
| GM% | 68% | 78% | 85% |
| Burn mo (EOY2) | $110k | $140k | $180k |
| Runway from Seed | 18 mo | 28 mo | 30+ (rev helps) |
| LTV:CAC | 1.6× | 8.8× | 20×+ |
| Payback | 22 mo | 11 mo | 5 mo |
| Cash at EOY2 | Tight | Healthy | Very healthy |

**Assumptions driving Cons doom:** no partners, SMB-heavy, wallet conversion &lt;40% of card baseline, legal forces costly sponsorship model.

---

## 12. Benchmark Comparison

| Metric | Best-in-class SaaS | Best-in-class fintech infra | TableOS H Base | TableOS S Base | Gap / fix |
|---|---|---|---|---|---|
| GM% | 80–90% | 60–80% | 75% | 78% | OK |
| LTV:CAC | &gt;3× | &gt;5× | 3.5× | 8.8× | H weak; S OK if real |
| Payback | &lt;12–18 mo | &lt;18 | 19 | 11 | H fail; S pass |
| NRR | &gt;120% | &gt;120% | 105% | 125% | Need expansion product |
| Magic Number | &gt;0.8 | &gt;0.7 | 0.4 | 0.7 | Partner GTM required |

---

## 13. Investment Committee Review ($10M of own capital)

### Are unit economics investable today?

| Thesis | Investable? |
|---|---|
| Hospitality-only | **No** — payback, ceiling, distribution |
| Settlement OS (modeled) | **Not yet with $10M scale capital** — **Yes for ≤$1–4M seed** under conditions |

### Greatest uncertainty assumptions

1. Partner channel will supply ≥40% of logos by Y3  
2. Customers pay ≥0.6% take-rate vs status quo cards  
3. Non-custodial architecture satisfies regulators without killing UX  
4. Payer conversion with USDC ≥ commercially viable threshold  
5. Arc production quality/timeline  

### Evidence required before investing

1. 3 written LOIs (hotel/club/platform)  
2. 1 live pilot, real USDC escrow TVL, attendance release, split tx  
3. Outside counsel memo on transmission/custody  
4. Measured funnel: link → pay success rate  
5. CAC from first 5 logos (time + cash)  

### Milestones that improve conviction

| Milestone | Conviction unlock |
|---|---|
| Pilot show-rate ≥95% & partner payout &lt;1 hour | Product |
| 10 paying logos | Wedge |
| First platform embed LOI | Infra thesis |
| Payback ≤14mo measured | Economics |
| NRR ≥120% on ≥20 logos | Scale |

### Scaling approval

**DO NOT approve growth/scaling capital** until durable path to contribution-positive cohorts is evidenced. Seed to learn; A round only after Magic Number ≥0.8 and payback ≤14.

---

## Appendix — Quick formulas used

- Sales CAC = AE loaded cost / logos  
- Marketing CAC = mkt spend / mkt logos  
- LTV ≈ ARPC × GM × (1/churn) × expansion factor  
- Payback months = CAC / (monthly ARPC × GM)  
- NRR ≈ 1 − churn − contraction + expansion  
- Magic Number = Net New ARR_q / S&M_{q−1}
