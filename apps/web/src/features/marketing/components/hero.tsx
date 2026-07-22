"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hospitalityMotion } from "@/components/experience/motion";
import { SITE } from "@/features/marketing/content";

const FLOW = [
  { id: "book", label: "Reserve", detail: "Seat claimed" },
  { id: "hold", label: "Hold", detail: "USDC waiting" },
  { id: "door", label: "Door", detail: "Arrival attested" },
  { id: "settle", label: "Settle", detail: "Night closes" },
] as const;

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-tos-border-subtle">
      <div className="relative mx-auto grid max-w-[72rem] gap-14 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-28 lg:py-32">
        <div className="flex flex-col justify-center">
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
            Accept USDC, automate escrow, distribute revenue instantly, and manage treasury — every payment
            becomes an automated financial workflow on Arc.
          </motion.p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/contact">
              <Button size="lg">
                Request demo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </Link>
            <Link href="/#demo">
              <Button size="lg" variant="secondary">
                Watch the evening
                <ArrowDownRight className="h-4 w-4" aria-hidden />
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-xs text-tos-text-faint">
            Restaurants · chef’s tables · luxury hotels · dining events ·{" "}
            <Link href={SITE.demoBook} className="underline-offset-2 hover:underline">
              Try guest book
            </Link>
          </p>
        </div>

        <ServiceFlowVisual reduce={!!reduce} />
      </div>
    </section>
  );
}

function ServiceFlowVisual({ reduce }: { reduce: boolean }) {
  return (
    <div
      className="tos-plane relative overflow-hidden p-6 md:p-7"
      aria-label="Service flow from reservation to settlement"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--tos-champagne-gold)_55%,transparent),transparent)]"
      />
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.18em] text-tos-premium uppercase">Service flow</p>
          <p className="mt-1 text-sm text-tos-text-strong">One evening, continuous</p>
        </div>
        <span className="text-[11px] text-tos-text-faint">Choreography</span>
      </div>

      <ol className="relative mt-8 space-y-0">
        {FLOW.map((step, i) => (
          <motion.li
            key={step.id}
            {...hospitalityMotion.sequential(i, reduce)}
            className="relative flex gap-4 pb-7 last:pb-0"
          >
            <div className="flex w-5 flex-col items-center">
              <span
                className={cnDot(i)}
                aria-hidden
              />
              {i < FLOW.length - 1 ? (
                <span className="mt-1 w-px flex-1 bg-tos-border" aria-hidden />
              ) : null}
            </div>
            <div className="min-w-0 pt-0.5">
              <p className="text-sm font-medium text-tos-text-strong">{step.label}</p>
              <p className="mt-0.5 text-xs text-tos-text-muted">{step.detail}</p>
            </div>
          </motion.li>
        ))}
      </ol>

      <p className="mt-2 border-t border-tos-border-subtle pt-4 text-xs leading-relaxed text-tos-text-faint">
        Payments become workflows — reserve, escrow, settle, distribute, update treasury.
      </p>
    </div>
  );
}

function cnDot(i: number) {
  if (i === 1) return "mt-1 h-2.5 w-2.5 rounded-full bg-tos-premium-soft tos-waiting";
  if (i === 3) return "mt-1 h-2.5 w-2.5 rounded-full bg-tos-accent";
  return "mt-1 h-2.5 w-2.5 rounded-full bg-tos-border-strong";
}
