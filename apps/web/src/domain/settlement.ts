/**
 * Domain: settlement math & reservation capacity.
 * Pure functions — unit-tested without DB.
 */

export type SplitRule = { label: string; bps: number; payeeRef: string };

export function assertSplitsValid(rules: SplitRule[]): { ok: true } | { ok: false; message: string } {
  if (rules.length === 0) return { ok: true };
  const sum = rules.reduce((a, r) => a + r.bps, 0);
  if (sum !== 10000) {
    return { ok: false, message: `Split bps must total 10000, got ${sum}` };
  }
  if (rules.some((r) => r.bps < 0)) {
    return { ok: false, message: "Split bps cannot be negative" };
  }
  return { ok: true };
}

/** Platform fee in cents from gross; feeBps e.g. 100 = 1%. */
export function platformFeeCents(grossCents: number, feeBps: number): number {
  if (grossCents < 0 || feeBps < 0) throw new Error("Invalid fee inputs");
  return Math.floor((grossCents * feeBps) / 10000);
}

export function allocateSplits(
  netCents: number,
  rules: SplitRule[],
): Array<{ label: string; payeeRef: string; amountCents: number }> {
  if (rules.length === 0) return [];
  const valid = assertSplitsValid(rules);
  if (!valid.ok) throw new Error(valid.message);

  const raw = rules.map((r) => ({
    label: r.label,
    payeeRef: r.payeeRef,
    amountCents: Math.floor((netCents * r.bps) / 10000),
  }));
  const allocated = raw.reduce((a, r) => a + r.amountCents, 0);
  const remainder = netCents - allocated;
  if (remainder !== 0 && raw[0]) {
    raw[0].amountCents += remainder;
  }
  return raw;
}

export function seatsAvailable(capacity: number, seatsHeld: number, seatsBooked: number): number {
  return Math.max(0, capacity - seatsHeld - seatsBooked);
}

export function canBookParty(args: {
  capacity: number;
  seatsHeld: number;
  seatsBooked: number;
  partySize: number;
}): { ok: true } | { ok: false; reason: string } {
  if (args.partySize < 1) return { ok: false, reason: "Party size must be at least 1" };
  const left = seatsAvailable(args.capacity, args.seatsHeld, args.seatsBooked);
  if (args.partySize > left) {
    return { ok: false, reason: `Only ${left} seat(s) remaining` };
  }
  return { ok: true };
}

export function guestPaymentCopy(status: string): string {
  switch (status) {
    case "ESCROWED":
      return "Your payment is held securely until attendance is confirmed.";
    case "RELEASED":
      return "Funds have been released to the house.";
    case "REFUNDED":
      return "Your payment has been refunded.";
    case "PENDING":
      return "Awaiting payment confirmation.";
    default:
      return "Payment status updated.";
  }
}
