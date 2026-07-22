import { describe, expect, it } from "vitest";
import {
  allocateSplits,
  assertSplitsValid,
  canBookParty,
  guestPaymentCopy,
  platformFeeCents,
  seatsAvailable,
} from "./settlement";

describe("assertSplitsValid", () => {
  it("accepts empty rules", () => {
    expect(assertSplitsValid([])).toEqual({ ok: true });
  });
  it("requires 10000 bps", () => {
    expect(assertSplitsValid([{ label: "a", bps: 5000, payeeRef: "x" }]).ok).toBe(false);
  });
  it("accepts full split", () => {
    expect(
      assertSplitsValid([
        { label: "house", bps: 7000, payeeRef: "h" },
        { label: "chef", bps: 3000, payeeRef: "c" },
      ]),
    ).toEqual({ ok: true });
  });
});

describe("platformFeeCents", () => {
  it("computes 1%", () => {
    expect(platformFeeCents(100_00, 100)).toBe(100);
  });
});

describe("allocateSplits", () => {
  it("assigns remainder to first payee", () => {
    const out = allocateSplits(100, [
      { label: "a", bps: 3333, payeeRef: "a" },
      { label: "b", bps: 3333, payeeRef: "b" },
      { label: "c", bps: 3334, payeeRef: "c" },
    ]);
    expect(out.reduce((s, x) => s + x.amountCents, 0)).toBe(100);
  });
});

describe("capacity", () => {
  it("tracks remaining seats", () => {
    expect(seatsAvailable(12, 2, 4)).toBe(6);
    expect(canBookParty({ capacity: 12, seatsHeld: 2, seatsBooked: 4, partySize: 6 }).ok).toBe(true);
    expect(canBookParty({ capacity: 12, seatsHeld: 2, seatsBooked: 4, partySize: 7 }).ok).toBe(false);
  });
});

describe("guestPaymentCopy", () => {
  it("avoids crypto jargon for escrowed", () => {
    expect(guestPaymentCopy("ESCROWED")).toMatch(/held securely/i);
  });
});
