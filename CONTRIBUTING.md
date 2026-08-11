# Contributing

## Principles

1. Prefer vertical slices over hollow surfaces  
2. Never fake chain / AI success  
3. Design tokens from `docs/design` — no neon crypto UI  
4. Domain logic in `domain/` with Vitest coverage  
5. Ports for outbound dependencies  

## Workflow

1. Branch from `main`  
2. `npm install && docker compose up -d postgres && npm run db:push && npm run db:seed`  
3. Implement + tests  
4. `npm run lint && npm run typecheck && npm run test`  
5. PR with clear production-vs-scaffold notes  

## Code layout

Feature-first under `apps/web/src/features/*`. Shared UI in `components/ui`.

## Commits

Conventional, present-tense summaries focused on **why**.
