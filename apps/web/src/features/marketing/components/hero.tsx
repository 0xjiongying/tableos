"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, WORKFLOW_STEPS } from "@/features/marketing/content";

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-tos-border-subtle">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,_color-mix(in_oklab,var(--tos-bamboo)_16%,transparent),_transparent_50%),radial-gradient(ellipse_at_90%_20%,_color-mix(in_oklab,var(--tos-champagne-gold)_12%,transparent),_transparent_45%)]"
      />
      <div className="relative mx-auto grid max-w-[72rem] gap-12 px-6 py-16 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:py-24 lg:py-28">
        <div className="flex flex-col justify-center">
          <p className="text-xs tracking-[0.22em] text-tos-premium uppercase">{SITE.name}</p>
          <h1 className="mt-4 max-w-xl text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.08] tracking-[-0.03em] text-tos-text-strong">
            {SITE.tagline}
          </h1>
          <p className="mt-5 max-w-lg text-base text-tos-text-muted md:text-lg">
            Programmable USDC on Arc turns scarce evenings into executable financial workflows — hold until
            attendance, settle with deterministic finality, split revenue, update treasury — without turning the
            dining room into a crypto product.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact">
              <Button size="lg">
                Request demo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </Link>
            <Link href="/#architecture">
              <Button size="lg" variant="secondary">
                View architecture
                <ArrowDownRight className="h-4 w-4" aria-hidden />
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-xs text-tos-text-faint">
            For luxury dining operators · Not a restaurant website ·{" "}
            <Link href={SITE.demoBook} className="underline-offset-2 hover:underline">
              Try guest book
            </Link>
          </p>
        </div>

        <HeroWorkflowVisual reduce={!!reduce} />
      </div>
    </section>
  );
}

function HeroWorkflowVisual({ reduce }: { reduce: boolean }) {
  const visible = WORKFLOW_STEPS.slice(0, 6);

  return (
    <div
      className="relative rounded-[var(--tos-radius-lg)] border border-tos-border bg-tos-surface p-5 shadow-[0_0_0_1px_color-mix(in_oklab,var(--tos-champagne-gold)_18%,transparent)] md:p-6"
      aria-label="Interactive financial workflow preview"
    >
      <div className="flex items-center justify-between gap-3 border-b border-tos-border-subtle pb-4">
        <div>
          <p className="text-xs tracking-[0.16em] text-tos-premium uppercase">Settlement workflow</p>
          <p className="mt-1 text-sm text-tos-text-strong">Evening · held → released → split</p>
        </div>
        <span className="rounded-[var(--tos-radius-sm)] bg-tos-success-bg px-2 py-1 text-[11px] text-tos-success">
          Simulated
        </span>
      </div>

      <ol className="mt-5 space-y-2">
        {visible.map((step, i) => (
          <motion.li
            key={step.id}
            initial={reduce ? false : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduce ? 0 : 0.08 * i, duration: 0.35 }}
            className="flex items-start gap-3 rounded-[var(--tos-radius-md)] bg-tos-bg-subtle px-3 py-2.5"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tos-accent text-[10px] text-tos-text-on-accent">
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-medium text-tos-text-strong">{step.label}</p>
              <p className="text-xs text-tos-text-muted">{step.detail}</p>
            </div>
          </motion.li>
        ))}
      </ol>

      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-tos-border-subtle pt-4 text-center">
        <Metric label="Held" value="USDC" />
        <Metric label="Condition" value="Attend" />
        <Metric label="Split" value="Atomic" />
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--tos-radius-md)] bg-tos-surface-sunken px-2 py-3">
      <p className="text-[10px] tracking-[0.14em] text-tos-text-faint uppercase">{label}</p>
      <p className="mt-1 text-sm font-medium text-tos-text-strong">{value}</p>
    </div>
  );
}
