# TableOS — Scope Resolution (A / B / C)

**Status:** BINDING for this codebase  
**Date:** 2026-07-22  
**Owner:** Lead Founding Engineer (session build)

---

## Conflicting briefs

| Brief | Claim |
|---|---|
| **A — IC Gate PIVOT** | Hospitality-only SaaS fails economics. Company = **Condition-Gated Settlement OS**. Dining = beachhead only. Step 2 blocked until pivot PRD + LOIs. |
| **B — Execution prompt** | Full **AI-native restaurant OS** (menu, reservations, tables, staff, kitchen, loyalty, payments, analytics, AI) on Next.js/Supabase; blockchain future-ready; hackathon + investor ready. |
| **C — Design system** | Luxury Japanese hospitality (Geist, washi/ivory/oak, quiet luxury). Settlement chrome hidden. |

---

## Resolution (what we build)

### 1. Long-term architecture = Brief B shell

Extensible Prisma schema, feature modules, and feature flags for a full restaurant OS: Restaurant → Branch → Staff/RBAC → Tables → Reservations → Guests → Menu → Orders → Kitchen tickets → Payments → Loyalty stubs → AI conversations → Audit/Activity → blockchain/agent event stubs.

**Why:** Investor and enterprise demos need a coherent product surface; settlement alone is not demoable as a “restaurant product” without ops context. Schema extensibility is cheap; hollow UI is expensive.

### 2. Production / hackathon v1 = Brief A wedge + Brief C skin

**Shipped vertical slice (production-quality):**

1. Staff creates/manages a **premium dining event / reservation inventory**
2. Guest **books** a seat
3. **Payment confirmation** via `PaymentsPort` (mock adapter live; Arc/USDC adapter scaffolded with honest TODOs)
4. Staff **attendance / release** path (condition attestation → settlement status)
5. Dashboard: reservations + revenue glance + activity
6. One real **AI** path (`AiPort`): NL reservation search **or** executive summary from demo data — env-gated OpenAI with graceful fallback

**Visual language:** Brief C exclusively. No crypto neon. USDC/escrow copy uses guest-safe language (“held funds,” “released after attendance”).

### 3. What we explicitly do NOT ship in v1

| Deferred | Reason |
|---|---|
| Full POS / table map editing | Low Arc leverage; schema ready |
| Kitchen display board (stretch) | Ops depth without settlement proof |
| Loyalty / memberships | Phase 2 per IC subtraction |
| NFT tickets | Killed by PRD/IC |
| Multi-restaurant marketplace browse | Marketplace trap |
| Live Arc mainnet / real chain calls without wiring | Never fake chain success |
| Nested cancel-policy matrix | 2 policies max |
| Storybook full library | Minimal/setup only if time |
| OpenTelemetry/Sentry beyond stubs | Stretch |

### 4. IC Gate vs execution — honest stance

- **IC economics are not re-litigated** here; settlement architecture stays investor-intact via `PaymentsPort` + escrow/split domain model.
- **Step 2 (full user-story catalog) remains strategically gated** for company fundraising process; this repo ships an **engineering beachhead** so hackathon + LOI conversations have working software.
- Company thesis remains: **condition-gated settlement**; dining OS is the **beachhead skin and distribution wedge**, not the 10-year ceiling.

### 5. Ports & adapters (non-negotiable honesty)

| Port | Live adapter | Scaffold |
|---|---|---|
| `PaymentsPort` | `mock` (local demo, deterministic IDs) | `arc` — types, config, TODO methods; throws/returns `not_configured` until RPC+contracts wired |
| `AiPort` | OpenAI when `OPENAI_API_KEY` set | `fallback` heuristic summaries / keyword search |
| `AuthPort` | Demo cookie session when `DEMO_AUTH_ENABLED=true` | Supabase Auth when configured |

### 6. Success criteria for this session

Fewer features, each production-quality for what is claimed. README must label **production vs scaffold** truthfully.

---

## Related docs

- `docs/prd/TABLEOS_PRD_V2.md` — reconciled product
- `docs/strategy/TABLEOS_IC_GATE.md` — binding IC verdict
- `docs/design/TABLEOS_DESIGN_SYSTEM.md` — visual authority
