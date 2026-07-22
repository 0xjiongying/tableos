# Contributing

## Principles

1. Prefer vertical slices over hollow surfaces  
2. Never fake chain / AI success  
3. Design tokens from `docs/design` — no neon crypto UI  
4. Domain logic in `domain/` with Vitest coverage  
5. Ports for outbound dependencies  

## Workflow

1. Branch from `main`  
2. `pnpm install && docker compose up -d postgres && pnpm db:push && pnpm db:seed`  
3. Implement + tests  
4. `pnpm lint && pnpm typecheck && pnpm test`  
5. PR with clear production-vs-scaffold notes  

## Code layout

Feature-first under `apps/web/src/features/*`. Shared UI in `components/ui`.

## Commits

Conventional, present-tense summaries focused on **why**.
