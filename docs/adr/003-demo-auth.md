# ADR-003: Demo auth before Supabase

**Status:** Accepted  
**Date:** 2026-07-22

## Context

Supabase Auth needs project credentials. Local/hackathon path must work with Docker Postgres alone.

## Decision

Signed cookie demo auth when `DEMO_AUTH_ENABLED=true`. Supabase env vars reserved; login API returns 501 when demo auth is off until wired.

## Consequences

- Instant staff demo
- Must be disabled for real production
- RBAC roles already modeled on `StaffMember`
