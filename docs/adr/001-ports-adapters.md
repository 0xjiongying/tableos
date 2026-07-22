# ADR-001: Ports & adapters for payments and AI

**Status:** Accepted  
**Date:** 2026-07-22

## Context

Arc/USDC settlement is central to the investor narrative, but live chain integration is not reliably available in-session. OpenAI may be absent in local/CI environments.

## Decision

Introduce `PaymentsPort` and `AiPort` with:

- **mock / fallback** adapters that are honest and demoable
- **arc / openai** adapters that never claim success when unconfigured

## Consequences

- Hackathon demos work offline
- Arc work can proceed without rewriting product flows
- README must label adapters clearly
