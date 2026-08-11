# FlowArc Escrow contracts (Arc / USDC)

**Status:** Scaffold only — **not** connected to the Next.js app.  
The live demo uses `PaymentsPort` → `mock` adapter.

## Intent

`TableOSEscrow.sol` sketches condition-gated USDC escrow + bps split + platform fee.

## TODO before any testnet claim

1. Install [Foundry](https://book.getfoundry.sh/)
2. `forge install OpenZeppelin/openzeppelin-contracts`
3. Replace bare `IERC20` with OZ; add Pausable, ReentrancyGuard, Ownable2Step
4. Add EIP-712 attendance attestation
5. Deploy to Arc testnet; set `ARC_*` env vars
6. Implement `arcPaymentsAdapter` with viem + confirmed receipts
7. Persist `BlockchainEvent` rows from an indexer

## App wiring

```
PAYMENTS_ADAPTER=arc
ARC_RPC_URL=
ARC_USDC_ADDRESS=
ARC_ESCROW_ADDRESS=
ARC_CHAIN_ID=
```

Until those are set and methods implemented, the Arc adapter returns `not_configured` / `adapter_error` — it never fakes success.
