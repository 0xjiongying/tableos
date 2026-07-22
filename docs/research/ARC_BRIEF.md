# Arc — Verified Brief for TableOS

**Status:** Internal reference for marketing + engineering copy  
**Date:** 2026-07-22  
**Source policy:** Prefer official Arc / Circle materials. Do not invent beyond verified facts below.

---

## What Arc is

[Arc](https://www.arc.network/) (`arc.network`) is **Circle’s stablecoin-native, EVM-compatible L1** — positioned as an **“Economic OS for the internet.”**

Purpose-built for real-world finance:

- Stablecoins (especially **USDC**)
- Tokenized assets
- Payments
- Lending
- FX
- Capital markets
- Agentic / AI economy

**Backing:** Circle (USDC issuer). Design partners referenced in the ecosystem include **Goldman Sachs, Visa, Mastercard** (also BlackRock, AWS in ecosystem materials).

---

## Network status (honest)

| Stage | Fact |
|---|---|
| Public testnet | Launched **Oct 28, 2025** |
| Mainnet | Targeted **2026** (beta soon) |
| Token | **No mainnet token live**; token under exploration |

**TableOS rule:** Never imply TableOS depends on an Arc token. Never fake on-chain success. Label **demo / mock adapter** vs **Arc testnet** clearly.

---

## Differentiator primitives

1. **Stablecoin-native gas** — USDC as primary gas → predictable, fiat-denominated costs  
2. **Sub-second deterministic finality** — ~**780ms** via **Malachite BFT** — no re-org risk for settlement-grade flows  
3. **Opt-in configurable privacy** — for compliance-oriented workloads  

### Problem vs other L1/L2 (and traditional rails)

| Gap | Why it hurts settlement products |
|---|---|
| Volatile gas | Ops cannot price high-ticket holds in stable fiat terms |
| Probabilistic finality / re-orgs | Escrow → attendance → split needs finality, not “probably settled” |
| Weak privacy / compliance tooling | Enterprises need opt-in privacy with audit posture |
| Fiat / stablecoin friction | USDC should be native, not bolted on |

**vs Stripe / card rails:** Cards authorize and batch-settle. They do not natively **escrow-on-condition**, **release on attendance**, and **atomically split** multi-party revenue into treasury in one programmable workflow.

---

## Stack (builders)

- EVM-compatible execution (**Reth**-based)
- **Malachite** consensus (BFT)
- **CCTP / Gateway** for multichain USDC movement
- **App Kit** for USDC application flows

### Testnet endpoints

| Item | Value |
|---|---|
| RPC | `https://rpc.testnet.arc.network` |
| Chain ID | `5042002` |
| Explorer | [https://testnet.arcscan.app](https://testnet.arcscan.app) |

---

## Official links

| Resource | URL |
|---|---|
| Site | https://www.arc.network/ |
| Docs | https://docs.arc.network/ |
| Blog | https://www.arc.network/blog |
| Node GitHub | https://github.com/circlefin/arc-node |
| Ecosystem | https://www.arc.network/ecosystem |
| Community (Arc House) | https://community.arc.network/ |

---

## TableOS positioning (do not dilute)

TableOS uses Arc for **programmable USDC settlement / escrow / split** under hospitality UX.

- Live product demo may use a **mock payments adapter** until Arc RPC + contracts are wired.
- Arc adapter remains scaffolded with honest `not_configured` / TODO paths.
- Marketing cites Arc primitives above; product never claims mainnet settlement until wired and verified.

---

## Target audience (Arc)

Fintech builders, enterprises / banks / payment companies, and AI / agent developers — aligned with TableOS’s institutional settlement narrative (not consumer crypto speculation).
