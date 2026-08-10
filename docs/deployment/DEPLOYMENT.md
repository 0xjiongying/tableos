# Deployment

## Target topology

| Component | Recommendation |
|---|---|
| Web | Render (`tableos-web.onrender.com`) via `render.yaml`; Vercel optional |
| DB | Render Postgres (Blueprint) or Supabase / Neon |
| Auth | Replace demo cookies with Supabase Auth before public prod |
| Payments | `mock` for staging demos; `arc` only after contracts + legal path |
| Objects | Cloudflare R2 / S3 (not wired in v1) |
| Observability | Sentry DSN + OTLP env stubs |

## Environment

Copy `.env.example` → host secrets. Required for demo:

- `DATABASE_URL`
- `DEMO_AUTH_ENABLED=true` (hackathon) or Supabase keys
- `PAYMENTS_ADAPTER=mock`
- `NEXT_PUBLIC_APP_URL`

Optional: `OPENAI_API_KEY`, `SESSION_SECRET` (set a strong secret in prod).

## Release checklist

1. `pnpm lint && pnpm typecheck && pnpm test`
2. Apply migrations / `db push` on staging
3. Seed only on demo environments
4. Confirm Arc adapter is **not** selected unless fully wired
5. Disable demo auth for any internet-facing production

## Docker

`docker compose up -d postgres` for local. App runs on host Node for fast iteration. Full containerization of the Next app is optional later.
