/** Motion presets aligned with hospitality primitives in tokens.css */
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
  sequential: (index: number, reduce?: boolean) => ({
    initial: reduce ? false : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: reduce ? 0 : 0.07 * index,
      duration: reduce ? 0 : 0.42,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
} as const;
