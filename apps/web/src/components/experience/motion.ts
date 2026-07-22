/** Financial Value Streams + UI motion presets */

export const valueStreamMotion = {
  /** Authorization — firm commit; stream arrives and locks intent */
  authorization: {
    initial: { pathLength: 0, opacity: 0.35 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
  /** Escrow — contained hold; liquid pauses in the vessel */
  escrow: {
    transition: { duration: 2.8, ease: [0.45, 0, 0.55, 1] as const, repeat: Infinity, repeatType: "reverse" as const },
    animate: { opacity: [0.55, 0.9] },
  },
  /** Settlement — release; locked stream opens downstream */
  settlement: {
    initial: { pathLength: 0.35, opacity: 0.5 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] as const },
  },
  /** Distribution — one stream forks into parallel paths */
  distribution: {
    staggerChildren: 0.12,
    delayChildren: 0.08,
  },
  /** Treasury — streams pool into a calm basin */
  treasury: {
    initial: { scaleY: 0.2, opacity: 0.4 },
    animate: { scaleY: 1, opacity: 1 },
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
  /** Forecast — quiet projection beyond the pool */
  forecast: {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 0.45 },
    transition: { duration: 1.1, ease: [0.45, 0, 0.55, 1] as const, delay: 0.2 },
  },
} as const;

/** Payment lifecycle states — money as protagonist */
export const VALUE_STREAM_STATES = [
  "authorization",
  "escrow",
  "confirmation",
  "settlement",
  "distribution",
  "treasury",
  "forecast",
] as const;

export type ValueStreamState = (typeof VALUE_STREAM_STATES)[number];

export const VALUE_STREAM_LABELS: Record<ValueStreamState, string> = {
  authorization: "Authorized",
  escrow: "In escrow",
  confirmation: "Confirmed",
  settlement: "Settled",
  distribution: "Distributed",
  treasury: "Treasury",
  forecast: "Insight",
};

/** UI chrome only — not the money narrative */
export const hospitalityMotion = {
  arrival: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
  acknowledgment: {
    transition: { duration: 0.18, ease: [0.33, 1, 0.68, 1] as const },
  },
  handoff: {
    initial: { opacity: 0, x: 6 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -4 },
    transition: { duration: 0.28, ease: [0.45, 0, 0.55, 1] as const },
  },
  completion: {
    initial: { opacity: 0, y: 4 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
  camera: {
    transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] as const },
  },
  press: {
    whileTap: { scale: 0.985 },
    transition: { duration: 0.1, ease: [0.33, 1, 0.68, 1] as const },
  },
  lift: {
    whileHover: { y: -2 },
    transition: { duration: 0.18, ease: [0.33, 1, 0.68, 1] as const },
  },
  sequential: (index: number, reduce?: boolean) => ({
    initial: reduce ? false : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: reduce ? 0 : 0.07 * index,
      duration: reduce ? 0 : 0.42,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
  cascade: (index: number, reduce?: boolean) => ({
    initial: reduce ? false : { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-8% 0px" },
    transition: {
      delay: reduce ? 0 : 0.07 * index,
      duration: reduce ? 0 : 0.42,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
} as const;

/** @deprecated Prefer VALUE_STREAM_STATES — kept for demo mapping */
export const SETTLEMENT_STATES = [
  "created",
  "escrow",
  "confirmed",
  "settled",
  "split",
  "treasury",
] as const;

export type SettlementState = (typeof SETTLEMENT_STATES)[number];
