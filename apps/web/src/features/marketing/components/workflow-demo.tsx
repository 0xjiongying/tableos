"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Pause, Play, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  hospitalityMotion,
  VALUE_STREAM_LABELS,
  VALUE_STREAM_STATES,
} from "@/components/experience/motion";
import { ValueStreams } from "@/components/experience/value-streams";
import { LIFECYCLE_STEPS, SITE } from "@/features/marketing/content";
import { Reveal, Section } from "./section";
import { cn } from "@/lib/utils";

export function WorkflowDemoSection() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % LIFECYCLE_STEPS.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [playing, reduce]);

  const current = LIFECYCLE_STEPS[step]!;
  const streamState = current.state;
  const progress = ((step + 1) / LIFECYCLE_STEPS.length) * 100;
  const stateIndex = VALUE_STREAM_STATES.indexOf(streamState);

  const transparency = useMemo(
    () => ({
      what: current.what,
      why: current.why,
      next: LIFECYCLE_STEPS[(step + 1) % LIFECYCLE_STEPS.length]!.label,
    }),
    [current, step],
  );

  return (
    <Section
      id="lifecycle"
      tone="subtle"
      eyebrow="Payment lifecycle"
      title="Value Streams through clear financial states"
      lead="Authorization → escrow → confirmation → settlement → distribution → treasury → insight. Always visible: what happened, why, and what’s next."
    >
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="tos-plane overflow-hidden p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-tos-text-strong">One payment, continuous workflow</p>
                <p className="mt-0.5 text-xs text-tos-text-faint">
                  State: {VALUE_STREAM_LABELS[streamState]}
                </p>
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

            <ol className="mt-5 flex flex-wrap gap-1.5" aria-label="Value stream progress">
              {VALUE_STREAM_STATES.map((s, i) => {
                const active = s === streamState;
                const done = i < stateIndex;
                return (
                  <li key={s}>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-[var(--tos-radius-sm)] px-2 py-1 text-[10px] tracking-[0.06em] uppercase transition-[background-color,color] duration-[var(--tos-duration-fast)]",
                        active && "bg-tos-accent text-tos-text-on-accent",
                        done && !active && "bg-tos-success-bg text-tos-success",
                        !done && !active && "bg-tos-surface-sunken text-tos-text-faint",
                        active && s === "escrow" && !reduce && "tos-waiting",
                      )}
                    >
                      {VALUE_STREAM_LABELS[s]}
                    </span>
                  </li>
                );
              })}
            </ol>
            <p className="sr-only" aria-live="polite">
              Current financial state: {VALUE_STREAM_LABELS[streamState]}. {transparency.what}. Next:{" "}
              {transparency.next}.
            </p>

            <div
              className="mt-4 h-px overflow-hidden bg-tos-border-subtle"
              role="progressbar"
              aria-valuenow={step + 1}
              aria-valuemin={1}
              aria-valuemax={LIFECYCLE_STEPS.length}
              aria-label="Lifecycle progress"
            >
              <motion.div
                className="h-full bg-[color-mix(in_oklab,var(--tos-champagne-gold)_70%,var(--tos-deep-forest))]"
                animate={{ width: `${progress}%` }}
                transition={
                  reduce ? { duration: 0 } : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
                }
              />
            </div>

            <ol className="mt-5 flex flex-col gap-1.5">
              {LIFECYCLE_STEPS.map((s, i) => {
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
                className="mt-5 space-y-3 tos-plane--sunken rounded-[var(--tos-radius-md)] px-4 py-4"
                aria-live="polite"
              >
                <p className={cn("text-sm font-medium text-tos-text-strong", !reduce && "tos-write")}>
                  {current.label}
                </p>
                <dl className="grid gap-2 text-sm text-tos-text-muted">
                  <div>
                    <dt className="text-[10px] tracking-[0.12em] text-tos-text-faint uppercase">What happened</dt>
                    <dd className="mt-0.5">{transparency.what}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] tracking-[0.12em] text-tos-text-faint uppercase">Why</dt>
                    <dd className="mt-0.5">{transparency.why}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] tracking-[0.12em] text-tos-text-faint uppercase">What’s next</dt>
                    <dd className="mt-0.5">{transparency.next}</dd>
                  </div>
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-4">
            <ValueStreams state={streamState} />
            <div className="tos-plane--glass rounded-[var(--tos-radius-lg)] px-5 py-4">
              <p className="text-sm text-tos-text-muted">
                Walk the same financial path on the live product surface — guest book and staff treasury —
                with an honest mock payments adapter on Arc-ready ports.
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
