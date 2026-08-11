# Methodology — IC Gate Before PRD Execution

**Version:** 1.0.0  
**Date:** 2026-07-22  
**Applies to:** FlowArc and future Arc products in this repo

## Problem with PRD-first

Shipping a polished PRD for a wedge that fails opportunity replacement, distribution credibility, and unit economics wastes the company’s only scarce resource: founder focus. Elegant software for the wrong company is still failure.

## Mandatory order (improved process)

1. **Opportunity replacement** — score ≥5 Arc-native opportunities; quantify EV gap  
2. **Category / infrastructure test** — must be able to become critical infra if it wins  
3. **Distribution credibility** — first 1 / 10 / 100 named; blocking  
4. **Founder economics** — CAC, LTV, GM, burn, runway, payback, NRR, Magic Number, sensitivity, IC review  
5. **Stripe test + non-blockchain buyer test + feature subtraction**  
6. **Premortem + multi-candidate comparison**  
7. **Only then** rewrite PRD  
8. **Only then** User Stories → architecture → build  

## Gate outcomes

| Outcome | Meaning |
|---|---|
| GO | Pass all; Step 2 unlocked under written conditions |
| CONDITIONAL GO | Pass with explicit evidence milestones |
| PIVOT | Thesis changes; PRD rewrite required; Step 2 blocked |
| NO-GO | Kill; do not build |

## FlowArc application (2026-07-22)

Result: **PIVOT**. See `docs/strategy/FLOWARC_IC_GATE.md`.

Step 2 User Stories remains **BLOCKED** until conditional criteria in the IC gate doc are met.
