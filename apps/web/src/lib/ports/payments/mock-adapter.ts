import type {
  EscrowCreateInput,
  EscrowCreateResult,
  PaymentsPort,
  RefundInput,
  RefundResult,
  ReleaseInput,
  ReleaseResult,
} from "./types";

const store = new Map<
  string,
  { paymentId: string; status: "ESCROWED" | "RELEASED" | "REFUNDED" }
>();

function id(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/** Deterministic local escrow for demos — no chain calls. */
export const mockPaymentsAdapter: PaymentsPort = {
  name: "mock",

  async createEscrow(input: EscrowCreateInput): Promise<EscrowCreateResult> {
    if (input.amount.amountCents <= 0) {
      return {
        ok: false,
        adapter: "mock",
        code: "invalid_input",
        message: "Amount must be positive.",
      };
    }
    const splitSum = input.splits.reduce((a, s) => a + s.bps, 0);
    if (input.splits.length > 0 && splitSum !== 10000) {
      return {
        ok: false,
        adapter: "mock",
        code: "invalid_input",
        message: `Split basis points must sum to 10000 (got ${splitSum}).`,
      };
    }
    const escrowRef = id("escrow");
    const externalId = id("pay");
    store.set(escrowRef, { paymentId: input.paymentId, status: "ESCROWED" });
    return {
      ok: true,
      adapter: "mock",
      escrowRef,
      externalId,
      status: "ESCROWED",
    };
  },

  async releaseOnCondition(input: ReleaseInput): Promise<ReleaseResult> {
    const row = store.get(input.escrowRef);
    if (!row || row.paymentId !== input.paymentId) {
      return {
        ok: false,
        adapter: "mock",
        code: "not_found",
        message: "Escrow not found.",
      };
    }
    if (input.condition !== "attendance_verified") {
      return {
        ok: false,
        adapter: "mock",
        code: "adapter_error",
        message: "Unsupported condition.",
      };
    }
    row.status = "RELEASED";
    return {
      ok: true,
      adapter: "mock",
      releaseTxRef: id("release"),
      status: "RELEASED",
    };
  },

  async refund(input: RefundInput): Promise<RefundResult> {
    const row = store.get(input.escrowRef);
    if (!row || row.paymentId !== input.paymentId) {
      return {
        ok: false,
        adapter: "mock",
        code: "not_found",
        message: "Escrow not found.",
      };
    }
    row.status = "REFUNDED";
    return {
      ok: true,
      adapter: "mock",
      refundTxRef: id("refund"),
      status: "REFUNDED",
    };
  },
};
