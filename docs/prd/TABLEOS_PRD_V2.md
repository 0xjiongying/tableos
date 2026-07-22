# TableOS PRD v2 — Reconciled Product

**Status:** Engineering + hackathon authority (complements IC Gate)  
**Date:** 2026-07-22  
**Supersedes for implementation:** Hospitality-only framing of `TABLEOS_PRD.md`  
**Does not overturn:** IC Gate company thesis (Condition-Gated Settlement OS)

---

## One-sentence value (beachhead)

**TableOS lets premium restaurants sell scarce evenings with funds held until attendance, then released and split — wrapped in a calm restaurant OS guests and staff already understand.**

## Company one-sentence (IC)

**TableOS is the settlement layer for high-value obligations escrowed in USDC, released on a verified condition, and split atomically — starting with premium experiential events.**

---

## Product shape

```
┌─────────────────────────────────────────────┐
│  Restaurant OS shell (extensible modules)   │
│  reservations · events · staff · (future    │
│  menu/kitchen/loyalty/analytics)            │
├─────────────────────────────────────────────┤
│  Settlement core (v1 vertical slice)        │
│  book → PaymentsPort escrow → door attest   │
│  → release/split → activity ledger          │
├─────────────────────────────────────────────┤
│  Design: Luxury Japanese hospitality        │
└─────────────────────────────────────────────┘
```

## v1 must-haves (shipped intent)

1. Staff event create/manage  
2. Guest book flow  
3. Payment hold confirmation (adapter)  
4. Door check-in → release  
5. Dashboard glance + activity  
6. One AI path with fallback  
7. Seeded Michelin-style demo  

## Explicit non-goals (v1)

Full POS, loyalty, NFT tickets, live Arc without wiring, multi-restaurant marketplace, hollow kitchen UI.

## Success metrics (demo)

- Guest completes book→confirm in &lt; 2 minutes  
- Staff releases held funds in one door action  
- Observer understands value without hearing “blockchain”

## Related

- `docs/strategy/SCOPE_RESOLUTION.md`  
- `docs/strategy/TABLEOS_IC_GATE.md`  
- `docs/design/TABLEOS_DESIGN_SYSTEM.md`
