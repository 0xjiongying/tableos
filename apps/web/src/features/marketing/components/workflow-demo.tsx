"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Pause, Play, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { hospitalityMotion } from "@/components/experience/motion";
import { SITE, WORKFLOW_STEPS } from "@/features/marketing/content";
import { Reveal, Section } from "./section";
import { cn } from "@/lib/utils";

const PHASE_COPY: Record<(typeof WORKFLOW_STEPS)[number]["phase"], string> = {
  prepare: "Preparing the room",
  arrive: "Guest arrives in the book",
  wait: "Funds wait with composure",
  acknowledge: "The house acknowledges",
  handoff: "Settlement hands off",
  complete: "Evening complete",
};

export function WorkflowDemoSection() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % WORKFLOW_STEPS.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [playing, reduce]);

  const current = WORKFLOW_STEPS[step]!;
  const progress = ((step + 1) / WORKFLOW_STEPS.length) * 100;
  const settled = step >= 5;
  const held = step >= 3 && step < 5;

  return (
    <Section
      id="demo"
      tone="subtle"
      eyebrow="Service choreography"
      title="Follow one evening from seat to settlement"
      lead="A continuous path — reserve, hold, acknowledge, settle — not a feature checklist. Money state stays quiet in the margin."
    >
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="tos-plane overflow-hidden p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-tos-text-strong">Kintsugi · Omotesando tasting</p>
                <p className="mt-0.5 text-xs text-tos-text-faint">{PHASE_COPY[current.phase]}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  aria-pressed={playing}
                  onClick={() => setPlaying((p) => !p)}
                >
                  {playing && !reduce ? (
                    <>
                      <Pause className="h-3.5 w-3.5" aria-hidden /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" aria-hidden /> Play
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setStep(0);
                    setPlaying(true);
                  }}
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Reset
                </Button>
              </div>
            </div>

            <div
              className="mt-5 h-px overflow-hidden bg-tos-border-subtle"
              role="progressbar"
              aria-valuenow={step + 1}
              aria-valuemin={1}
              aria-valuemax={WORKFLOW_STEPS.length}
              aria-label="Evening progress"
            >
              <motion.div
                className="h-full bg-[color-mix(in_oklab,var(--tos-champagne-gold)_70%,var(--tos-deep-forest))]"
                animate={{ width: `${progress}%` }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
                }
              />
            </div>

            <ol className="mt-6 flex flex-col gap-1.5">
              {WORKFLOW_STEPS.map((s, i) => {
                const active = i === step;
                const done = i < step;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setStep(i);
                        setPlaying(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-[var(--tos-radius-md)] px-3 py-2.5 text-left transition-[background-color,opacity] duration-[var(--tos-duration-fast)] ease-[var(--tos-ease-soft)]",
                        active
                          ? "bg-tos-bg-subtle"
                          : done
                            ? "opacity-70 hover:opacity-100"
                            : "opacity-45 hover:opacity-80 hover:bg-tos-bg-muted/60",
                      )}
                      aria-current={active ? "step" : undefined}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px]",
                          active
                            ? "bg-tos-accent text-tos-text-on-accent"
                            : done
                              ? "bg-tos-success-bg text-tos-success"
                              : "bg-tos-surface-sunken text-tos-text-faint",
                        )}
                        aria-hidden
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-tos-text-strong">{s.label}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                {...(reduce
                  ? {}
                  : {
                      initial: hospitalityMotion.handoff.initial,
                      animate: hospitalityMotion.handoff.animate,
                      exit: hospitalityMotion.handoff.exit,
                      transition: hospitalityMotion.handoff.transition,
                    })}
                className="mt-5 tos-plane--sunken rounded-[var(--tos-radius-md)] px-4 py-4"
                aria-live="polite"
              >
                <p className={cn("text-sm font-medium text-tos-text-strong", !reduce && "tos-write")}>
                  {current.label}
                </p>
                <p className="mt-1 text-sm text-tos-text-muted">{current.detail}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-4">
            <div className="tos-plane p-5">
              <p className="text-xs tracking-[0.16em] text-tos-premium uppercase">Quiet ledger</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <StatePill
                  label="Held"
                  value={held ? "Waiting" : settled ? "Released" : "—"}
                  active={held}
                  waiting={held}
                />
                <StatePill
                  label="Treasury"
                  value={settled ? "Updated" : "Pending"}
                  active={settled}
                />
              </div>
              <p className="mt-5 text-sm leading-relaxed text-tos-text-muted">
                Programmable money makes the business rule the payment — attendance unlocks release; partners settle
                with the night.
              </p>
            </div>

            <div className="rounded-[var(--tos-radius-lg)] border border-tos-border-subtle bg-tos-bg/70 px-5 py-4 backdrop-blur-[2px]">
              <p className="text-sm text-tos-text-muted">
                Walk the same path on the live product surface — guest book and door — with an honest mock payments
                adapter.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={SITE.demoBook}>
                  <Button size="sm">Open guest book</Button>
                </Link>
                <Link href={SITE.demoStaff}>
                  <Button size="sm" variant="secondary">
                    Staff entrance
                  </Button>
                </Link>
              </div>
              <p className="mt-3 text-xs text-tos-text-faint">
                Staff: {SITE.demoCredentials.email} / {SITE.demoCredentials.password}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function StatePill({
  label,
  value,
  active,
  waiting,
}: {
  label: string;
  value: string;
  active: boolean;
  waiting?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--tos-radius-md)] px-3 py-3",
        active ? "bg-tos-success-bg" : "bg-tos-bg-subtle",
        waiting && "tos-waiting",
      )}
    >
      <p className="text-[10px] tracking-[0.14em] text-tos-text-faint uppercase">{label}</p>
      <p className="mt-1 text-sm font-medium text-tos-text-strong">{value}</p>
    </div>
  );
}
