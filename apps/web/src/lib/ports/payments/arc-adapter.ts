import type {
  EscrowCreateInput,
  EscrowCreateResult,
  PaymentsPort,
  RefundInput,
  RefundResult,
  ReleaseInput,
  ReleaseResult,
} from "./types";

function configured(): boolean {
  return Boolean(
    process.env.ARC_RPC_URL &&
      process.env.ARC_USDC_ADDRESS &&
      process.env.ARC_ESCROW_ADDRESS &&
      process.env.ARC_CHAIN_ID,
  );
}

/**
 * Arc / USDC escrow adapter scaffold.
 *
 * TODO(arc):
 * 1. Wire Foundry contracts under /contracts (Escrow + Split)
 * 2. Use viem/ethers against ARC_RPC_URL
 * 3. Approve USDC → escrow; emit BlockchainEvent rows from indexer
 * 4. Never mark RELEASED without confirmed tx receipt
 *
 * Until configured, all methods return not_configured — do not fake success.
 */
export const arcPaymentsAdapter: PaymentsPort = {
  name: "arc",

  async createEscrow(input: EscrowCreateInput): Promise<EscrowCreateResult> {
    void input;
    if (!configured()) {
      return {
        ok: false,
        adapter: "arc",
        code: "not_configured",
        message:
          "Arc adapter not configured. Set ARC_RPC_URL, ARC_USDC_ADDRESS, ARC_ESCROW_ADDRESS, ARC_CHAIN_ID. Use PAYMENTS_ADAPTER=mock for demos.",
      };
    }
    // TODO(arc): submit createEscrow transaction
    return {
      ok: false,
      adapter: "arc",
      code: "adapter_error",
      message: "Arc createEscrow not implemented — contracts scaffold only.",
    };
  },

  async releaseOnCondition(input: ReleaseInput): Promise<ReleaseResult> {
    void input;
    if (!configured()) {
      return {
        ok: false,
        adapter: "arc",
        code: "not_configured",
        message: "Arc adapter not configured.",
      };
    }
    return {
      ok: false,
      adapter: "arc",
      code: "adapter_error",
      message: "Arc releaseOnCondition not implemented — contracts scaffold only.",
    };
  },

  async refund(input: RefundInput): Promise<RefundResult> {
    void input;
    if (!configured()) {
      return {
        ok: false,
        adapter: "arc",
        code: "not_configured",
        message: "Arc adapter not configured.",
      };
    }
    return {
      ok: false,
      adapter: "arc",
      code: "adapter_error",
      message: "Arc refund not implemented — contracts scaffold only.",
    };
  },
};
