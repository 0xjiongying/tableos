# ADR-002: Next.js monolith for v1

**Status:** Accepted  
**Date:** 2026-07-22

## Context

Prompt allows tRPC or Route Handlers; NestJS was not present in repo (docs-only start).

## Decision

Ship a single `apps/web` Next.js App Router app with Route Handlers + Prisma. Extract packages later if a second client (mobile, partner API) appears.

## Consequences

- Faster coherence for hackathon
- Clear path to split `packages/domain` later
- Avoid dual Nest/Next conflict
