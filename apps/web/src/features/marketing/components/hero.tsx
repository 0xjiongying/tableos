"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hospitalityMotion, type ValueStreamState } from "@/components/experience/motion";
import { ValueStreams } from "@/components/experience/value-streams";
import { SITE } from "@/features/marketing/content";

const HERO_CYCLE: ValueStreamState[] = [
  "authorization",
  "escrow",
  "confirmation",
  "settlement",
  "distribution",
  "treasury",
];

export function HeroSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [streamState, setStreamState] = useState<ValueStreamState>("authorization");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 48]);
  const midY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 20]);
  const typeY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 12]);
  const lightOpacity = useTransform(scrollYProgress, [0, 0.6], reduce ? [1, 1] : [1, 0.35]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setStreamState((prev) => {
        const i = HERO_CYCLE.indexOf(prev);
        return HERO_CYCLE[(i + 1) % HERO_CYCLE.length]!;
      });
    }, 2800);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-tos-border-subtle">
      <motion.div
        aria-hidden
        style={{ y: bgY, opacity: lightOpacity }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-[12%] top-[-18%] h-[55%] w-[55%] rounded-full bg-[radial-gradient(circle,var(--tos-light-ambient),transparent_68%)] tos-dof" />
        <div className="absolute right-[-8%] top-[8%] h-[48%] w-[42%] rounded-full bg-[radial-gradient(circle,var(--tos-tod-glow),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--tos-natural-linen)_55%,transparent))]" />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="tos-hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tos-hero-grid)" className="text-tos-warm-stone" />
        </svg>
      </motion.div>

      <div className="relative mx-auto grid max-w-[72rem] gap-14 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:py-28 lg:py-32">
        <motion.div style={{ y: typeY }} className="flex flex-col justify-center">
          <motion.p
            {...(reduce ? {} : hospitalityMotion.arrival)}
            className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.03em] text-tos-text-strong"
          >
            {SITE.name}
          </motion.p>
          <motion.h1
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { ...hospitalityMotion.arrival.transition, delay: 0.08 },
                })}
            className="mt-5 max-w-xl text-[clamp(1.35rem,2.4vw,1.85rem)] font-medium leading-[1.25] tracking-[-0.015em] text-tos-text"
          >
            {SITE.tagline}
          </motion.h1>
          <motion.p
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { ...hospitalityMotion.arrival.transition, delay: 0.14 },
                })}
            className="mt-5 max-w-lg text-base text-tos-text-muted md:text-lg"
          >
            Every payment becomes an intelligent financial workflow — authorize, escrow, settle, distribute,
            and update treasury on Arc. Programmable money you can see.
          </motion.p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/contact">
              <Button size="lg">
                Request demo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </Link>
            <Link href="/#lifecycle">
              <Button size="lg" variant="secondary">
                Follow the value
                <ArrowDownRight className="h-4 w-4" aria-hidden />
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-xs text-tos-text-faint">
            Premium restaurants · luxury hotels · tourism · dining events ·{" "}
            <Link href={SITE.demoBook} className="underline-offset-2 hover:underline">
              Try guest book
            </Link>
          </p>
        </motion.div>

        <motion.div style={{ y: midY }}>
          <ValueStreams state={streamState} />
        </motion.div>
      </div>
    </section>
  );
}
