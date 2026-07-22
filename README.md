# TableOS

**Programmable financial OS for the hospitality industry — built on Arc.**

TableOS is a programmable financial operating system for the hospitality industry, starting with premium restaurants, luxury hotels, and tourism businesses. Accept USDC payments, automate escrow, distribute revenue instantly, and manage treasury through programmable money. Every payment becomes an automated financial workflow — reservation → escrow → settlement → revenue share → treasury — not an isolated transaction.

**Core MVP:** premium dining event reservations · USDC payments on Arc · smart contract escrow · automatic revenue distribution · real-time treasury dashboard · AI-powered treasury assistant.

| Layer | Status |
|---|---|
| Guest book + payment confirmation | **Production-quality demo** (mock payments) |
| Staff events / reservations / door release | **Production-quality demo** |
| AI briefing + NL reservation search | **Real path** (OpenAI if keyed; heuristic fallback) |
| Design system (Japanese luxury) | **Wired** from `docs/design/tokens.css` |
| Prisma OS schema (menu, kitchen, loyalty stubs…) | **Schema ready**; UI deferred |
| Arc / USDC on-chain | **Scaffold only** — never fakes success |
| Supabase Auth | **Scaffold** — demo cookie auth is the local path |
| Storybook / full kitchen / loyalty | **Deferred** |

Scope decision: [`docs/strategy/SCOPE_RESOLUTION.md`](docs/strategy/SCOPE_RESOLUTION.md)

---

## Quick start

### Prerequisites

- Node 20+
- [pnpm](https://pnpm.io/) 10+
- Docker (Postgres)

### Run locally

```bash
# 1) Infra (Postgres on host port 5433 — avoids clashes with other local DBs)
docker compose up -d postgres

# 2) Env
cp .env.example apps/web/.env

# 3) Install
pnpm install

# 4) DB
pnpm db:push
pnpm db:seed

# 5) Dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

**Demo staff:** `host@kintsugi.tokyo` / `tableos-demo`  
**Guest book:** [/book/kintsugi](http://localhost:3000/book/kintsugi)

### Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Next.js dev (Turbopack) |
| `pnpm test` | Vitest domain tests |
| `pnpm test:e2e` | Playwright smoke |
| `pnpm lint` / `pnpm typecheck` | Quality gates |
| `pnpm db:seed` | Michelin-style Kintsugi demo data |

---

## Architecture (one screen)

```
apps/web (Next.js App Router)
  ├── features/     booking, events, door, reservations
  ├── domain/       pure settlement math (tested)
  ├── lib/ports/    PaymentsPort, AiPort
  ├── components/ui design-system primitives
  └── prisma/       OS schema + seed

contracts/          Foundry escrow scaffold (not wired)
```

Payments: `PAYMENTS_ADAPTER=mock|arc` via `getPaymentsPort()`.  
AI: `getAiPort()` → OpenAI or fallback.

See [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md).

---

## Hackathon

- Demo script: [`docs/hackathon/DEMO.md`](docs/hackathon/DEMO.md)
- Pitch outline: [`docs/hackathon/PITCH.md`](docs/hackathon/PITCH.md)

---

## Security

See [`SECURITY.md`](SECURITY.md). Demo auth is for local/hackathon only — do not deploy demo cookies to production without replacing auth.
