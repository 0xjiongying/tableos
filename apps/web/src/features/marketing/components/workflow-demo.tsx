"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Pause, Play, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE, WORKFLOW_STEPS } from "@/features/marketing/content";
import { Reveal, Section } from "./section";
import { cn } from "@/lib/utils";

const LEDGER = [
  { label: "Guest payment", amount: "+4,800 USDC" },
  { label: "Escrow hold", amount: "Held" },
  { label: "House share", amount: "3,360 USDC" },
  { label: "Partner share", amount: "1,440 USDC" },
] as const;

export function WorkflowDemoSection() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % WORKFLOW_STEPS.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [playing, reduce]);

  const current = WORKFLOW_STEPS[step]!;
  const settled = step >= 5;
  const held = step >= 3 && step < 5;

  return (
    <Section
      id="demo"
      tone="subtle"
      eyebrow="Interactive demo"
      title="Follow the money through one evening"
      lead="A simulated settlement path — no wallet required. The live product demo uses the same mental model with a mock payments adapter."
    >
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[var(--tos-radius-lg)] border border-tos-border bg-tos-surface p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-tos-text-strong">Kintsugi · Omotesando tasting</p>
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

            <ol className="mt-6 grid gap-2 sm:grid-cols-2">
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
                        "w-full rounded-[var(--tos-radius-md)] border px-3 py-3 text-left transition-colors",
                        active
                          ? "border-tos-border-focus bg-tos-bg-subtle"
                          : done
                            ? "border-tos-border-subtle bg-tos-success-bg/40"
                            : "border-tos-border-subtle bg-tos-bg hover:bg-tos-bg-muted",
                      )}
                      aria-current={active ? "step" : undefined}
                    >
                      <span className="text-[11px] text-tos-text-faint">Step {i + 1}</span>
                      <span className="mt-0.5 block text-sm font-medium text-tos-text-strong">{s.label}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="mt-6 rounded-[var(--tos-radius-md)] bg-tos-surface-sunken px-4 py-4"
                aria-live="polite"
              >
                <p className="text-sm font-medium text-tos-text-strong">{current.label}</p>
                <p className="mt-1 text-sm text-tos-text-muted">{current.detail}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-[var(--tos-radius-lg)] border border-tos-border bg-tos-surface p-5">
              <p className="text-xs tracking-[0.16em] text-tos-premium uppercase">Money state</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <StatePill label="Escrow" value={held ? "4,800 held" : settled ? "Released" : "Empty"} active={held} />
                <StatePill label="Treasury" value={settled ? "Updated" : "Pending"} active={settled} />
              </div>
              <ul className="mt-5 space-y-2 border-t border-tos-border-subtle pt-4">
                {LEDGER.map((row, i) => {
                  const visible = step >= (i === 0 ? 2 : i === 1 ? 3 : 6);
                  return (
                    <li
                      key={row.label}
                      className={cn(
                        "flex items-center justify-between text-sm transition-opacity",
                        visible ? "opacity-100" : "opacity-30",
                      )}
                    >
                      <span className="text-tos-text-muted">{row.label}</span>
                      <span className="font-mono text-xs text-tos-text-strong">{row.amount}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-[var(--tos-radius-lg)] border border-tos-border-subtle bg-tos-bg px-5 py-4">
              <p className="text-sm text-tos-text-muted">
                Why this matters: programmable money makes the business rule the payment — not an after-the-fact
                spreadsheet.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={SITE.demoBook}>
                  <Button size="sm">Open guest book</Button>
                </Link>
                <Link href={SITE.demoStaff}>
                  <Button size="sm" variant="secondary">
                    Staff demo
                  </Button>
                </Link>
              </div>
              <p className="mt-3 text-xs text-tos-text-faint">
                Staff login: {SITE.demoCredentials.email} / {SITE.demoCredentials.password}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function StatePill({ label, value, active }: { label: string; value: string; active: boolean }) {
  return (
    <div
      className={cn(
        "rounded-[var(--tos-radius-md)] px-3 py-3",
        active ? "bg-tos-success-bg" : "bg-tos-bg-subtle",
      )}
    >
      <p className="text-[10px] tracking-[0.14em] text-tos-text-faint uppercase">{label}</p>
      <p className="mt-1 text-sm font-medium text-tos-text-strong">{value}</p>
    </div>
  );
}
