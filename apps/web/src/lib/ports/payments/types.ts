/**
 * PaymentsPort — condition-gated settlement abstraction.
 *
 * Live: mock adapter for demos.
 * Scaffold: arc adapter — does NOT claim on-chain success until RPC + contracts are wired.
 */

export type Money = {
  amountCents: number;
  currency: string;
};

export type EscrowCreateInput = {
  paymentId: string;
  reservationId: string;
  payerRef: string;
  amount: Money;
  /** Split rules in basis points; must sum to 10000 after platform fee deduction externally */
  splits: Array<{ label: string; bps: number; payeeRef: string }>;
  metadata?: Record<string, string>;
};

export type EscrowCreateResult =
  | {
      ok: true;
      adapter: "mock" | "arc";
      escrowRef: string;
      externalId: string;
      status: "ESCROWED";
    }
  | {
      ok: false;
      adapter: "mock" | "arc";
      code: "not_configured" | "invalid_input" | "adapter_error";
      message: string;
    };

export type ReleaseInput = {
  escrowRef: string;
  paymentId: string;
  condition: "attendance_verified";
  attestedBy: string;
};

export type ReleaseResult =
  | {
      ok: true;
      adapter: "mock" | "arc";
      releaseTxRef: string;
      status: "RELEASED";
    }
  | {
      ok: false;
      adapter: "mock" | "arc";
      code: "not_configured" | "not_found" | "adapter_error";
      message: string;
    };

export type RefundInput = {
  escrowRef: string;
  paymentId: string;
  reason: string;
};

export type RefundResult =
  | {
      ok: true;
      adapter: "mock" | "arc";
      refundTxRef: string;
      status: "REFUNDED";
    }
  | {
      ok: false;
      adapter: "mock" | "arc";
      code: "not_configured" | "not_found" | "adapter_error";
      message: string;
    };

export interface PaymentsPort {
  readonly name: "mock" | "arc";
  createEscrow(input: EscrowCreateInput): Promise<EscrowCreateResult>;
  releaseOnCondition(input: ReleaseInput): Promise<ReleaseResult>;
  refund(input: RefundInput): Promise<RefundResult>;
}
