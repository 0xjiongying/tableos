# FlowArc — Product Requirements Document (Step 1)

**Status:** SUPERSEDED AS COMPANY THESIS by IC Gate (**PIVOT**) — see `docs/strategy/FLOWARC_IC_GATE.md`  
**PRD use:** Hospitality workflow remains a valid *beachhead skin* only after Settlement OS rewrite.  
**Step 2 (User Stories):** Still **BLOCKED**  
**Version:** 1.0.0-prd (hospitality framing) · Gate: 2026-07-22  
**Scope of this document:** Product Requirements only. No implementation.

**Epistemic labels:**  
- **VF** = Verified Fact (public/industry-known or given in brief)  
- **RA** = Reasoned Assumption (plausible, needs customer validation)  
- **SP** = Speculation (directional; do not build strategy solely on this)

---

## 0. Product Discovery (required before PRD)

### 0.1 Customer

**Primary ICP (buyer):** Owner-operated or chef-driven **premium dining** businesses running high-ticket, limited-capacity experiences:

- Chef’s-table / tasting-menu restaurants (cover price typically $150–$500+ per guest) **(RA)**
- Pop-up / collaboration dinners and destination dining events
- Private dining rooms inside luxury hotels
- Members-only dining clubs hosting ticketed seatings

**Primary end user (payer guest):** Affluent diners booking prepaid, scarce seats — locals and cross-border travelers who already prepay hotels, flights, and experiences. **(RA)**

**Not ICP for MVP:** Casual QSR, multi-unit chains needing POS replacement, coupon/loyalty NFT plays, generic restaurant websites.

### 0.2 Problem

Premium dining sells **scarce, high-value inventory** (a table at a specific time with a specific chef). Today that inventory is sold through:

1. Deposit / full prepay via card processors (Resy, Tock, SevenRooms, Stripe Checkout links)
2. Manual bank transfers / wires for private events
3. “Pay at restaurant” with high no-show risk

**Core failure modes:**

| Failure | Who loses | Why it persists |
|---|---|---|
| No-shows & late cancels | Restaurant (food cost, labor, opportunity) | Deposits are partial, chargebacks reverse “certainty,” ops hate fighting guests |
| Split economics are manual | Chef + host venue + sommelier / collab partner | Card rails settle to one merchant; splits happen offline days later |
| Cross-border guests | Guest FX friction; restaurant waiting on settlement | Cards + acquirers optimized for local retail, not prepaid experiential escrow |
| Working capital timing | Restaurant | Funds clear T+2/T+3; refunds and disputes claw back unpredictably |
| Trust in collab dinners | Guest & partners | No shared, programmable escrow; “who holds the money?” is a relationship problem |

**Economic impact (estimates — RA):**

- Premium no-show / late-cancel food+labor waste: often **8–20% of covers** on hot nights without hard prepay. **(RA)**
- Card + platform take: **2.5–6%+** combined (processor + booking platform) on prepaid experiences. **(RA / industry ranges)**
- Collaboration dinners: partner payouts delayed **3–14 days** with spreadsheet reconciliation. **(RA)**
- A 30-seat, $300 tasting night = **$9,000 GMV**; losing 4 no-shows ≈ **$1,200** revenue + prep waste. Escrowed full prepay + attendance release converts that into protected GMV. **(RA)**

### 0.3 Current workflow (as-is)

1. Restaurant publishes event on Instagram / Tock / Resy / email list  
2. Guest books; pays deposit or full amount via card  
3. Platform/processor holds or settles to restaurant merchant account  
4. Night of: host checks list; no-shows often keep partial deposits after messy policy fights  
5. If collab: restaurant pays partners via Venmo/Wise/ACH later  
6. Treasury = checking account + spreadsheet

### 0.4 Current software

- **Booking:** Tock, Resy, SevenRooms, OpenTable (premium tiers), custom Typeform+Stripe  
- **Payments:** Stripe, Adyen, Square; hotel PMS for hotel restaurants  
- **Ops:** spreadsheets, WhatsApp, Square/Toast POS for service night  
- **Treasury:** bank + accountant; no real-time split ledger

### 0.5 Pain points (ranked for MVP relevance)

1. **Certainty of funds for scarce inventory** (no-show + chargeback uncertainty)  
2. **Multi-party revenue split** for chef collabs / hotel + operator / promoter  
3. **Instant, auditable settlement** after verified attendance  
4. Cross-border guest payment without FX pain *(secondary for MVP; Arc-native USDC helps)*  
5. Membership / recurring *(Phase 2 — out of MVP)*

### 0.6 Decision makers & buying triggers

| Role | Concern | Trigger to buy FlowArc |
|---|---|---|
| Owner / Chef-owner | Margin, no-shows, brand control | Lost $5k+ night to no-shows; collab dinner payout fight |
| GM / Events lead | Ops simplicity, guest experience | Manual deposit chasing before a launch dinner |
| Hotel F&B director | Compliance, brand, audit trail | Private dining series with external chef needing clean splits |
| Guest | Trust, status, friction | Will follow restaurant’s preferred pay path if UX is premium |

**Willingness to pay (RA):** SaaS **$199–$799/mo** for independents + **0.5–1.5%** settlement fee *or* flat per-cover fee — if net of card/platform fees and no-show recovery is clearly positive. Enterprise hotel groups: annual contract.

### 0.7 Market

- Global eating-out / fine dining is large; FlowArc targets the **prepaid experiential / limited seating** wedge, not all restaurant GMV. **(RA)**  
- Experiential dining, destination restaurants, and chef residencies have grown with social discovery. **(RA)**  
- Stablecoin settlement rails (USDC) and Arc (Circle L1) create a new technical possibility for dollar-native escrow with predictable fees. **(VF: Arc positioning per Circle)**

### 0.8 Competition (summary)

| Competitor | Strength | Gap vs FlowArc MVP |
|---|---|---|
| Tock | Premium prepaid dining UX; inventory | Card rails; no programmable multi-party escrow on deterministic L1 |
| Resy / OpenTable | Demand / discovery | Deposit model; weak collab settlement |
| SevenRooms | CRM / hotel F&B | Payments not Arc-native programmable escrow |
| Stripe + custom | Flexible | DIY; no hospitality escrow+split product |
| Generic crypto checkout | Novelty | Feels crypto; no attendance-gated escrow workflow |

**Why switch:** Not “accept crypto.” Switch for **attendance-gated escrow + instant split + dollar-predictable settlement** that card platforms structurally cannot offer without becoming a money-holding platform with delayed partner payouts.

### 0.9 Feature challenge (founder filter applied)

| Candidate feature | Painful? | Arc advantage? | Pay for it? | Ship without? | Defensibility? | Decision |
|---|---|---|---|---|---|---|
| Event create + inventory | Yes | No alone | Yes | No | Low | **KEEP** (required workflow) |
| USDC pay → escrow | Yes | **Yes** | Yes | No | Medium | **KEEP** |
| Attendance verify → release | Yes | **Yes** (deterministic settle) | Yes | No | Medium | **KEEP** |
| Automatic revenue split | Yes | **Yes** | Yes | No | High | **KEEP** |
| Treasury balance view | Yes | Yes (on-chain truth) | Mild | Almost | Medium | **KEEP thin** |
| Guest reviews / social feed | Mild | No | No | Yes | No | **KILL** |
| Full POS / table management | Yes later | No | Yes later | Yes | Low | **OUT** |
| NFT tickets / loyalty NFTs | No | Fake Arc | No | Yes | No | **KILL** |
| Memberships | Yes Phase 2 | Yes later | Yes later | Yes | High later | **PHASE 2** |
| Supplier settlement | Yes Phase 2 | Yes | Yes later | Yes | High later | **PHASE 2** |
| Public restaurant marketing site | Mild | No | No | Yes | No | **KILL** |
| Multi-currency FX desk | Mild MVP | Arc FX later | Maybe | Yes | Medium | **OUT of MVP** |
| AI concierge | No | No | No | Yes | No | **KILL** |

---

## 1. Executive summary & one-sentence value prop

### One-sentence value proposition

**FlowArc lets premium restaurants sell scarce dining events with USDC escrow on Arc, release funds only after attendance is verified, and split revenue to partners instantly — turning no-show risk and manual payouts into programmable settlement.**

### Executive summary

FlowArc is a **programmable financial operating system for the hospitality industry**, starting with premium restaurants, luxury hotels, and tourism businesses — and one killer beachhead workflow: **prepaid event reservation → Arc USDC escrow → attendance verification → automatic release & revenue split → treasury update**.

We are not building a restaurant website, NFT gallery, or crypto-themed booking toy. We are building the **settlement layer** for high-ticket dining inventory where money must be certain before service and divisible after service. Arc is required because the product needs **native USDC, predictable dollar-denominated fees, deterministic settlement, and programmable escrow/split** — properties that card processors and generic L2 gas markets do not cleanly provide for this workflow.

MVP proves the loop end-to-end for one restaurant and one event type. Platform expansion (memberships, suppliers, multi-location, embedded finance) is roadmap only.

---

## 2. Problem / ICP / buying triggers / ROI

### Problem (quantified framing)

Premium operators sell irreversible prep (protein, labor, opportunity cost of the seat). Card deposits are partial and reversible; partner splits are offline; settlement is slow. FlowArc replaces “hope + spreadsheet” with **escrowed full prepay and attendance-conditioned release**.

### ICP

- Independent fine dining / chef’s table / pop-up hosts  
- Hotel private dining teams running chef takeovers  
- Dining clubs selling ticketed seatings  

### Buying triggers

1. Painful no-show night or chargeback after a sold-out seating  
2. Collaboration dinner with 2–4 payees and messy reconciliation  
3. International guest base asking for prepaid certainty without wire friction  
4. Launch of a limited series (e.g., 8-night residency) needing clean money ops  

### ROI model (illustrative — RA)

For a restaurant running **8 premium events/month × 24 covers × $250** = **$48,000 GMV/mo**.

| Lever | Conservative effect | Monthly value |
|---|---|---|
| No-show loss reduction (4% → 1% of GMV) | 3% GMV recovered | ~$1,440 |
| Faster partner settlement (ops hours) | 4 hrs × $75 | ~$300 |
| Net fee differential vs card+platform | 0.5–1.0% if FlowArc fee lower than status quo | ~$240–$480 |
| **Illustrative total** | | **~$2,000+/mo** |

Payback on $399/mo SaaS is immediate if even one no-show cluster is prevented. **(RA — validate with design partners)**

---

## 3. Competitive landscape & why switch

See Discovery §0.8. Positioning:

> **Tock/Resy sell the seat. Stripe moves the card. FlowArc settles the obligation.**

Switch reason must be economic and operational, not ideological:

1. Full prepay held in **programmable escrow** (not merchant float ambiguity)  
2. **Attendance gate** before release (reduces dispute surface vs “charge anyway”)  
3. **Atomic multi-party split** (chef / venue / platform fee)  
4. **Instant treasury truth** in USDC with predictable network fees on Arc  

---

## 4. Why Arc is required

### Feature ↔ Arc primitive mapping (MVP only)

| MVP feature | Arc / Circle primitive | Measurable advantage | If no Arc advantage → |
|---|---|---|---|
| Guest pays USDC | Native USDC | Dollar unit of account; no volatile gas token for guests/ops budgeting | N/A — core |
| Escrow hold | Smart contracts + deterministic finality | Funds locked with sub-second finality certainty before service | Remove product |
| Attendance release | Programmable settlement | Conditional release without T+ bank delay | Would be Web2 escrow (MSB-heavy) — different company |
| Revenue split | Atomic contract split | Partners paid in same tx as release | Kill if only manual ACH |
| Fee predictability | USDC gas / stable fees | Restaurant can price covers without gas spike risk | Critical vs ETH L1 |
| Treasury update | On-chain balances + indexer | Real-time ledger, not batch processor reports | Thin UI only |
| Cross-border guest pay | USDC + future CCTP/CPN | Same dollar rail globally | Phase 1.5; not required to *start* local |

### Explicitly killed / deferred because Arc adds no MVP value

- Marketing website builder  
- NFT ticket collectibles  
- Social feed / reviews  
- Full POS  
- AI recommendations  
- Points/loyalty NFTs  

---

## 5. Personas & roles / permissions (MVP)

| Persona | Auth | Permissions |
|---|---|---|
| **Restaurant Admin** | Email + passkey; wallet linked for treasury | Create org, events, set split rules, verify attendance, pause event sales, view treasury, configure payout addresses |
| **Door / Host Staff** | Email + passkey (no treasury wallet required) | View guest list, mark attended / no-show, cannot change splits or withdraw |
| **Diner (Guest)** | Wallet (RainbowKit) + optional email receipt | Browse public event page, reserve, pay USDC, view reservation status, request cancel per policy |
| **Platform Operator (FlowArc)** | Internal RBAC | Emergency pause, support read tools, fee config — not day-to-day restaurant ops |

**MVP RBAC rules:** least privilege; staff cannot withdraw; admin withdrawals only from TreasuryVault per policy; all privileged actions audited.

---

## 6. MVP scope — IN vs OUT

### IN (P0 — must ship)

1. Restaurant onboarding (org + wallet + payout addresses + split config)  
2. Create premium dining event (capacity, price USDC, schedule, cancel policy)  
3. Public event page + reserve flow  
4. Guest USDC payment into **EscrowVault** on Arc  
5. Reservation state machine (held → attended → released / no-show / refunded per policy)  
6. Staff attendance verification  
7. Automatic **RevenueSplitter** on release (restaurant, partners, protocol fee)  
8. **TreasuryVault** balance + simple ledger view  
9. Basic email/wallet notifications for payment + release  
10. Emergency pause + admin support paths  

### Explicit OUT (MVP)

- Memberships, subscriptions, NFT tickets  
- Supplier settlement, working capital / advances  
- Multi-location enterprise permissions matrix  
- POS / kitchen display / table map  
- Accounting exports (QuickBooks) — post-MVP  
- Mobile native apps (responsive web only)  
- Fiat on-ramp UX inside product (document external on-ramp; do not build exchange)  
- Discovery marketplace of all restaurants (single-tenant event links first)  
- FX conversion UI  
- Tip routing beyond configured splitters  

---

## 7. Core workflow / user journeys

### 7.1 Happy path (system narrative)

```
Restaurant creates event
  → Guest reserves + pays USDC
  → Funds lock in EscrowVault (reservation = Held)
  → Guest arrives; staff marks Attended
  → Escrow releases to RevenueSplitter
  → Splitter pays restaurant + partners + protocol fee
  → TreasuryVault / balances update
  → Reservation = Settled
```

### 7.2 Restaurant journey

1. Sign up → create Organization  
2. Connect payout wallet(s); define default split (e.g., 90% restaurant, 7% collab chef, 3% protocol — configurable)  
3. Create Event: title, datetime, venue, capacity, price, cancellation window  
4. Publish share link  
5. Monitor reservations (count, escrow TVL for event)  
6. Night-of: check in guests (Attended)  
7. Trigger release (per-guest or batch)  
8. See treasury + partner paid confirmation  

### 7.3 Diner journey

1. Open event link  
2. Select party size (MVP: enforce remaining capacity)  
3. Connect wallet; review price + policy  
4. Pay USDC; see confirmation + reservation ID  
5. Receive receipt (email if provided)  
6. Arrive; host checks them in  
7. (Optional) view status: Held → Settled  

### 7.4 Alternate paths (MVP must handle)

| Path | Behavior |
|---|---|
| Cancel inside policy window | Refund from escrow to guest; seat frees |
| Cancel outside window | Forfeit rules per event config (partial/full) — keep simple: full forfeit or full refund only in hackathon; production: configurable % |
| No-show after event start+grace | Release to restaurant per policy (default: release to restaurant) |
| Event cancelled by restaurant | Full refund all Held reservations |
| Payment fails / insufficient USDC | No reservation created |
| Double-spend seat race | Capacity enforced on-chain or via atomic backend+chain pattern (see open questions) |

---

## 8. Functional requirements (prioritized)

### P0 — Hackathon / production MVP

| ID | Requirement |
|---|---|
| FR-01 | Admin can create/edit/publish/unpublish Event with capacity & USDC price |
| FR-02 | Guest can reserve if capacity remains and pay exact USDC amount into escrow |
| FR-03 | System records Reservation linked to tx hash, guest address, event, amount |
| FR-04 | Staff can mark reservation Attended or NoShow |
| FR-05 | Attended triggers escrow release through splitter to configured recipients |
| FR-06 | Protocol fee skimmed atomically on release |
| FR-07 | Admin can refund Held reservation per cancel policy |
| FR-08 | Admin can cancel event → refund all Held |
| FR-09 | Treasury view shows USDC balances and recent settlement events |
| FR-10 | Pause switch stops new reservations and optionally releases |
| FR-11 | Auth: admin/staff email+passkey; guest wallet |
| FR-12 | Audit log for attendance, refunds, releases |

### P1 — Production hardening (30–90d)

| ID | Requirement |
|---|---|
| FR-20 | Batch check-in + batch settle |
| FR-21 | Partner invite + payout address attestation |
| FR-22 | Guest email + calendar ICS |
| FR-23 | Dispute flag (hold release for manual review) |
| FR-24 | Webhook to restaurant systems |
| FR-25 | Basic analytics: show rate, GMV, escrow TVL |

### P2 — Post-90d / Phase 2 prep

| ID | Requirement |
|---|---|
| FR-30 | MembershipManager hooks (not built) |
| FR-31 | Multi-event series templates |
| FR-32 | Role: Accountant read-only |
| FR-33 | Fiat on-ramp partner deep link |

---

## 9. Non-functional requirements

### Security

- Smart contracts: OZ patterns, checks-effects-interactions, reentrancy guards, pause, least privilege roles  
- No private keys in frontend beyond user wallet; server uses KMS/HSM for any operator keys **(RA ops design)**  
- RBAC on all admin APIs; signed attendance actions attributable to staff user  
- Rate limit reserve/pay endpoints; idempotency keys on payment intent  

### Scalability

- MVP target: **≤50 restaurants, ≤500 events/mo, ≤20k reservations/mo** **(RA)**  
- Chain: one escrow interaction per reservation pay + per settle (acceptable at MVP volume)  

### Reliability

- Exactly-once settlement intent via idempotent job + tx tracking (BullMQ)  
- Indexer reconciliation job: chain is source of truth for funds  
- RPO/RTO targets for API: best-effort MVP; production 99.9% API **(RA)**  

### Accessibility & UX quality

- WCAG 2.1 AA for guest pay + staff check-in flows  
- Keyboard check-in; large tap targets for door staff  
- Premium visual language: quiet, typographic, banking-grade — **not** crypto neon  

### Performance

- Guest event page LCP &lt; 2.5s on broadband **(RA target)**  
- Check-in action &lt; 300ms to optimistic UI; chain settle async with status  

### Compliance

- FlowArc is **software + smart contracts**; legal classification (MSB, money transmission) is **open question** — design to minimize custody of user funds by company (guest → contract; company does not hold USDC on behalf of restaurants in MVP hot wallets). **(SP / legal required)**  
- Geofencing / ToS: launch jurisdictions TBD  
- Sanctions screening of wallets — Phase 1.5 recommendation **(RA)**  

### Observability

- Sentry (FE/BE), OpenTelemetry traces, structured JSON logs  
- Metrics: payment_success_rate, settle_latency, escrow_tvl, show_rate  

---

## 10. Data entities (high-level)

Detailed schema = Step 5. MVP entities:

- **Organization** — restaurant/club; settings; protocol fee override  
- **User** — identity; roles (Admin, Staff)  
- **WalletLink** — address ↔ user/org  
- **Event** — inventory, pricing, policy, status  
- **SplitRule** — recipients + bps; immutable snapshot per Event at publish  
- **Reservation** — guest, event, amount, state, tx refs  
- **Settlement** — release tx, amounts per recipient  
- **LedgerEntry** — off-chain projection of on-chain movements  
- **AuditEvent** — who did what  
- **PauseState** — protocol / org / event  

States for Reservation: `PendingPayment` → `Held` → `Attended` | `NoShow` | `Refunded` | `Settled` | `Disputed`

---

## 11. Smart contract responsibilities (high-level)

Detailed design = Step 6. Intent:

| Contract | SRP | Notes |
|---|---|---|
| **ReservationManager** | Create/cancel reservation records; capacity; links payment | May be thin if reservation is off-chain with on-chain escrow ids — decide in Step 6 |
| **EscrowVault** | Custody USDC per reservation/event; release/refund | Core fund safety |
| **RevenueSplitter** | Pull released amount; pay bps to recipients + fee | Stateless preferred |
| **TreasuryVault** | Optional org pot for accumulated restaurant share / withdrawals | Keep simple; may be recipient addresses directly in MVP |
| **AccessControl** | Roles: ADMIN, STAFF, PAUSER, DEFAULT_ADMIN | OZ AccessControl |
| **EmergencyPause** | Global pause | Pausable pattern |
| **MembershipManager** | Phase 2 only | Do not implement in MVP |

**Upgrade strategy (direction):** UUPS or transparent proxy for vault/manager; splitter can be replaceable by address governance; immutable split snapshots per event. Timelock for production. Hackathon may deploy non-upgradeable for simplicity if clearly labeled. **(RA)**

**Failure modes to design for:** partial fill attacks, reentrancy on USDC, wrong payout address, capacity desync, double release, paused mid-flight.

---

## 12. API surface sketch

Detailed OpenAPI = Step 7.

```
Auth:     POST /auth/magic | passkey | session
Orgs:     POST /orgs  GET /orgs/:id  PATCH /orgs/:id
Events:   POST /orgs/:id/events  GET /events/:id  POST /events/:id/publish
Reserve:  POST /events/:id/reservations  GET /reservations/:id
Pay:      POST /reservations/:id/payment-intent  (returns call data / escrow instructions)
Staff:    POST /reservations/:id/attend  POST /reservations/:id/no-show
Settle:   POST /reservations/:id/settle  POST /events/:id/settle-batch
Refund:   POST /reservations/:id/refund
Treasury: GET /orgs/:id/treasury  GET /orgs/:id/ledger
Admin:    POST /pause  POST /orgs/:id/pause
WS:       /ws/events/:id (reservation updates)
```

---

## 13. UX principles & IA sketch

Detailed flows = Step 4.

### Principles

1. **Private-banking calm** — typography, whitespace, restrained motion (Framer)  
2. **One primary action per screen**  
3. **Money states always visible** — Held / Released / Refunded with timestamps  
4. **Door-staff speed** — check-in in two taps  
5. **Hide chain chrome** — show “Paid · Secured” not gas widgets; tx links secondary  
6. **Never look like a crypto dashboard**

### IA (MVP)

- **Guest:** Event → Reserve → Pay → Confirmation  
- **Admin:** Home ( tonight’s events) → Event detail → Reservations → Treasury → Settings (splits, team)  
- **Staff:** Tonight → Guest list → Check-in  

---

## 14. Success metrics / North Star

**North Star:** **Gross Merchandise Value successfully settled through attendance-gated escrow (USDC Settled GMV / week)**

Supporting:

| Funnel | Metric |
|---|---|
| Activation | Time-to-first-Held-reservation &lt; 1 day after onboarding |
| Quality | Show rate ≥ 95% on prepaid escrow events **(RA target)** |
| Reliability | Settlement success ≥ 99% of Attended marks |
| Revenue | Take rate realized; SaaS MRR |
| Expansion | Events/org/month; partners paid via splitter |
| Hackathon demo | End-to-end settle in &lt; 3 minutes live |

---

## 15. Risks & mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| Guests lack USDC / wallet friction | High | Concierge onboarding; clear on-ramp links; start with crypto-native affluent diners; consider paymaster later |
| Money transmission / licensing | High | Minimize custody; legal review before public launch; ToS; possibly partner with licensed sponsor |
| Chargeback-like social disputes | Medium | Clear policy UX; attendance proof; photo check-in optional later |
| Smart contract bug | Critical | Audits before mainnet; pause; caps per event; bug bounty |
| Arc testnet/mainnet maturity | High | Abstract chain config; monitor Circle timelines **(VF: mainnet beta targeted 2026 per public Circle materials)** |
| Tock feature parity distraction | High | **Refuse** to build discovery/CRM; stay on settlement wedge |
| Staff marks wrong guest | Medium | Undo window; dispute state; audit log |
| Capacity race | Medium | On-chain capacity or strict SERIALIZABLE + revert pattern |

---

## 16. Roadmap

### Hackathon MVP (now)

Single restaurant demo: create event → pay USDC → escrow → attend → split → treasury. Scripted wallets. Kill everything else.

### 30 days

Design partners (3); production security basics; batch settle; email receipts; on-ramp documentation; monitoring.

### 90 days

10–25 restaurants; partner payouts UX; dispute hold; analytics; legal opinion; waitlist growth.

### 365 days

Phase 2: memberships, supplier settlement, subscriptions, treasury automation, richer analytics.  
Phase 3 start: multi-location, enterprise perms, accounting/POS integrations, public API, embedded finance experiments, working capital (only with licensed partners).

---

## 17. Open questions / assumptions

| Item | Label | Notes |
|---|---|---|
| Arc public testnet / mainnet availability for demo | VF/RA | Confirm current Circle Arc network status before hackathon build |
| USDC contract address on Arc | VF | Must verify from Circle docs |
| Whether FlowArc is an MSB in launch jurisdictions | SP | Requires counsel |
| Optimal take rate vs SaaS mix | RA | Test with design partners |
| On-chain vs off-chain capacity source of truth | RA | Step 6 decision |
| Default no-show policy socially acceptable for Michelin-tier | RA | Customer interviews |
| Guest wallet UX acceptable for ICP diners | RA | Biggest product risk |
| Protocol fee bps | RA | Start 50–100 bps? validate |
| Need for paymaster / gas sponsorship | RA | Likely yes for guest UX |

---

## 18. Founder audit ($10M IC)

### Verdict

**Proceed with narrowed MVP.** The wedge (attendance-gated escrow + split for premium events) is coherent, Arc-justified, and demoable. It is **not** yet a category-defining company until memberships + supplier treasury + multi-venue network effects land — but those must not infect MVP.

### Attacks & responses

| Attack | Finding | Fix applied in this PRD |
|---|---|---|
| Wrong market | “Restaurants” too broad → becomes POS | ICP locked to **premium prepaid experiences** |
| Weak differentiation | Booking clone | Explicitly **not** competing on discovery; settlement OS only |
| Feature bloat | CRM, NFT, marketing site | **Killed** in §0.9 / §6 |
| Distribution risk | Who brings guests? | Use restaurant’s existing audience; share links; no marketplace MVP |
| Wallet friction | Guests bounce | Call out as #1 risk; on-ramp links; consider paymaster; design-partner selection bias toward wallet-capable guests first |
| Regulatory | Custody | Architecture: funds in EscrowVault, not company hot wallet |
| Premature Phase 2 | Memberships in MVP | Deferred |
| Demo-driven fake Arc | NFT tickets | Killed |
| Unit economics | Who pays? | Restaurant SaaS + take rate on settle; guest does not pay software fee |

### Top 3 cuts made

1. **NFT / loyalty / marketing site / social** — no Arc-necessary value  
2. **Fiat-on-ramp product & FX desk** — out of MVP; externalize  
3. **Marketplace discovery & POS** — gravity well that destroys focus  

### Smallest valuable surface area (confirmed)

> **One event type, one escrow, one attendance action, one atomic split, one treasury view.**

Anything beyond that is a different step.

---

## Document control

- **Canvas companion:** interactive PRD for founder review (see canvases/)  
- **Next step after approval:** Step 2 — User Stories  
- **Owner:** Technical co-founder / product  
- **Non-goals this turn:** code, schema DDL, full contract specs, OpenAPI, visual UI implementation
