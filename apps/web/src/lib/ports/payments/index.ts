import { arcPaymentsAdapter } from "./arc-adapter";
import { mockPaymentsAdapter } from "./mock-adapter";
import type { PaymentsPort } from "./types";

export type { PaymentsPort } from "./types";
export * from "./types";

export function getPaymentsPort(): PaymentsPort {
  const adapter = (process.env.PAYMENTS_ADAPTER ?? "mock").toLowerCase();
  if (adapter === "arc") return arcPaymentsAdapter;
  return mockPaymentsAdapter;
}
