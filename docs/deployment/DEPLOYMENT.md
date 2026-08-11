# Deployment

## Target topology

| Component | Recommendation |
|---|---|
| Web | Render (`tableos-web.onrender.com`) via `render.yaml` |
| DB | Render Postgres Blueprint (`tableos-demo-db`) |
| Auth | Demo cookie auth for hackathon; replace with Supabase Auth before public prod |
| Payments | `mock` for staging demos; `arc` only after contracts + legal path |
| Objects | Cloudflare R2 / S3 (not wired in v1) |
| Observability | Sentry DSN + OTLP env stubs |

## Render (primary)

Blueprint: [`render.yaml`](../../render.yaml) at repo root.

| Piece | Value |
|---|---|
| Service | `tableos-web` → https://tableos-web.onrender.com |
| Database | `tableos-demo-db` (Postgres 16, free) |
| Branch | `master` (auto-deploy on commit) |
| Build | `npm install && npm run build` |
| Pre-deploy | `npm run db:push -w @flowarc/web && npm run db:seed -w @flowarc/web` |
| Start | `npm run start -w @flowarc/web` (binds `0.0.0.0`, uses `PORT`) |
| Health | `/api/health` (no DB) |

### First-time / repair checklist

1. Merge deploy-ready commits to `master`.
2. Open [Render Dashboard](https://dashboard.render.com) → account that owns `tableos-web`.
3. If the service is **Suspended** → **Resume service**.
4. If using a Blueprint: open the Blueprint → **Manual Sync** (applies `render.yaml`).
5. Otherwise on `tableos-web` → **Manual Deploy** → deploy latest `master`.
6. Confirm env vars:
   - `DATABASE_URL` (from `tableos-demo-db`)
   - `NEXT_PUBLIC_APP_URL=https://tableos-web.onrender.com`
   - `DEMO_AUTH_ENABLED=true`
   - `DEMO_STAFF_PASSWORD=tableos-demo`
   - `PAYMENTS_ADAPTER=mock`
   - `SESSION_SECRET` (generated)
   - `AI_ENABLED=false` (unless you set `OPENAI_API_KEY`)
7. Watch **Logs** until health check on `/api/health` passes, then confirm `/` returns HTML.
8. Smoke test:
   - https://tableos-web.onrender.com/
   - Staff: `host@kintsugi.tokyo` / `tableos-demo`
   - Guest book: `/book/kintsugi`

### Free-plan notes

- Free web services spin down after ~15 minutes idle (cold start can take ~1 minute).
- Free Postgres expires after 30 days on free plan — recreate or upgrade before expiry.
- Pre-deploy **re-seeds** demo data on every deploy (intentional for the hackathon demo).

## Environment (local)

Copy `.env.example` → `apps/web/.env`. Required for demo:

- `DATABASE_URL`
- `DEMO_AUTH_ENABLED=true`
- `PAYMENTS_ADAPTER=mock`
- `NEXT_PUBLIC_APP_URL`

Optional: `OPENAI_API_KEY`, `SESSION_SECRET` (set a strong secret in prod).

## Release checklist

1. `npm run lint && npm run typecheck && npm run test && npm run build`
2. Merge to `master` (triggers Render auto-deploy)
3. Confirm Arc adapter is **not** selected unless fully wired
4. Disable demo auth for any internet-facing production beyond the hackathon demo

## Docker (local only)

`docker compose up -d postgres` for local. App runs on host Node for fast iteration.
