"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

/** Camera-like section: slight depth shift as the section enters the viewport. */
export function SpatialSection({
  children,
  className,
  depth = "mid",
}: {
  children: ReactNode;
  className?: string;
  depth?: "bg" | "mid" | "fg";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const factor = depth === "bg" ? 28 : depth === "fg" ? -12 : 14;
  const y = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [0, 0, 0] : [factor, 0, -factor * 0.4]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    reduce ? [1, 1, 1, 1] : [0.72, 1, 1, 0.85],
  );

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={cn("will-change-transform", className)}>
      {children}
    </motion.div>
  );
}

/** Hero parallax layer helper */
export function useParallax(
  scrollYProgress: MotionValue<number>,
  distance: number,
  reduce?: boolean | null,
) {
  return useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, distance]);
}
