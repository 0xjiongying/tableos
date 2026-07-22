"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  VALUE_STREAM_LABELS,
  VALUE_STREAM_STATES,
  valueStreamMotion,
  type ValueStreamState,
} from "./motion";

const PARTIES = [
  { id: "house", label: "Restaurant", y: 52 },
  { id: "chef", label: "Chef", y: 88 },
  { id: "venue", label: "Venue", y: 124 },
  { id: "org", label: "Organizer", y: 160 },
] as const;

/**
 * Signature Value Streams cinematic — programmable money as liquid geometry.
 * Architectural paths only. No particles, coins, hexagons, or neon chains.
 */
export function ValueStreams({
  state = "treasury",
  className,
  compact = false,
}: {
  state?: ValueStreamState;
  className?: string;
  compact?: boolean;
}) {
  const reduce = useReducedMotion();
  const activeIndex = VALUE_STREAM_STATES.indexOf(state);
  const inEscrow = state === "escrow";
  const settled = activeIndex >= VALUE_STREAM_STATES.indexOf("settlement");
  const distributed = activeIndex >= VALUE_STREAM_STATES.indexOf("distribution");
  const treasury = activeIndex >= VALUE_STREAM_STATES.indexOf("treasury");
  const forecast = state === "forecast";

  return (
    <div
      className={cn("tos-plane relative overflow-hidden", compact ? "p-4" : "p-5 md:p-6", className)}
      data-value-state={state}
      aria-label={`Value stream state: ${VALUE_STREAM_LABELS[state]}`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.18em] text-tos-premium uppercase">Value Streams</p>
          <p className="mt-1 text-sm text-tos-text-strong">Payment → financial workflow</p>
        </div>
        <span className="text-[11px] text-tos-text-faint">{VALUE_STREAM_LABELS[state]}</span>
      </div>

      <svg
        viewBox="0 0 360 200"
        className={cn("mt-5 w-full text-tos-border-strong", compact ? "h-36" : "h-48 md:h-56")}
        role="img"
        aria-hidden={false}
        aria-label="Diagram of value flowing from authorization through escrow, settlement, distribution, and treasury"
      >
        <title>Value Streams</title>
        {/* Structured grid — editorial / architectural */}
        <g opacity="0.18" stroke="currentColor" strokeWidth="0.5">
          {[40, 80, 120, 160].map((y) => (
            <line key={y} x1="16" y1={y} x2="344" y2={y} />
          ))}
          {[60, 140, 220, 300].map((x) => (
            <line key={x} x1={x} y1="24" x2={x} y2="184" />
          ))}
        </g>

        {/* Main trunk — authorization → escrow vessel → settlement */}
        <motion.path
          d="M 28 100 C 70 100, 90 100, 118 100"
          fill="none"
          stroke="var(--tos-deep-forest)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={reduce ? false : valueStreamMotion.authorization.initial}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={reduce ? { duration: 0 } : valueStreamMotion.authorization.transition}
        />

        {/* Escrow vessel — containment, not spinner */}
        <motion.rect
          x="118"
          y="78"
          width="52"
          height="44"
          rx="2"
          fill="color-mix(in oklab, var(--tos-champagne-gold) 12%, var(--tos-surface))"
          stroke="var(--tos-brushed-brass)"
          strokeWidth="1.25"
          animate={
            reduce
              ? undefined
              : inEscrow
                ? { opacity: [0.65, 1] }
                : { opacity: settled ? 0.45 : 0.85 }
          }
          transition={
            reduce
              ? { duration: 0 }
              : inEscrow
                ? valueStreamMotion.escrow.transition
                : { duration: 0.4 }
          }
        />
        {/* Liquid fill inside escrow */}
        <motion.rect
          x="122"
          y="98"
          width="44"
          height="20"
          rx="1"
          fill="color-mix(in oklab, var(--tos-deep-forest) 22%, transparent)"
          style={{ originY: 1 }}
          animate={{
            scaleY: inEscrow || activeIndex >= 1 ? 1 : 0.15,
            opacity: settled ? 0.25 : 0.85,
          }}
          transition={reduce ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Settlement release path */}
        <motion.path
          d="M 170 100 C 198 100, 210 100, 228 100"
          fill="none"
          stroke="var(--tos-deep-forest)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={reduce ? undefined : "6 5"}
          className={!reduce && settled ? "tos-stream-flow" : undefined}
          initial={reduce ? false : { pathLength: 0, opacity: 0.3 }}
          animate={{
            pathLength: settled ? 1 : activeIndex >= 2 ? 0.5 : 0.15,
            opacity: settled ? 1 : 0.4,
          }}
          transition={reduce ? { duration: 0 } : valueStreamMotion.settlement.transition}
        />

        {/* Distribution forks — restaurant / chef / venue / organizer */}
        <motion.g
          initial="hidden"
          animate={distributed ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: reduce ? {} : valueStreamMotion.distribution,
          }}
        >
          {PARTIES.map((p) => (
            <motion.path
              key={p.id}
              d={`M 228 100 C 250 100, 262 ${p.y}, 286 ${p.y}`}
              fill="none"
              stroke="var(--tos-moss)"
              strokeWidth="1.5"
              strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0.2 },
                show: {
                  pathLength: 1,
                  opacity: 0.9,
                  transition: reduce ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            />
          ))}
        </motion.g>

        {/* Party terminals */}
        {PARTIES.map((p) => (
          <g key={`t-${p.id}`} opacity={distributed ? 1 : 0.25}>
            <circle cx="292" cy={p.y} r="3" fill="var(--tos-deep-forest)" />
            <text
              x="302"
              y={p.y + 3}
              className="fill-[var(--tos-warm-gray)]"
              style={{ fontSize: 9, fontFamily: "var(--tos-font-sans)" }}
            >
              {p.label}
            </text>
          </g>
        ))}

        {/* Treasury pool — accumulation */}
        <motion.rect
          x="16"
          y="168"
          width="200"
          height="14"
          rx="1"
          fill="color-mix(in oklab, var(--tos-deep-forest) 18%, var(--tos-natural-linen))"
          stroke="var(--tos-border)"
          strokeWidth="0.75"
          style={{ originX: 0 }}
          initial={reduce ? false : { scaleX: 0.2, opacity: 0.35 }}
          animate={{
            scaleX: treasury ? 1 : 0.2,
            opacity: treasury ? 1 : 0.35,
          }}
          transition={reduce ? { duration: 0 } : valueStreamMotion.treasury.transition}
        />
        <text
          x="20"
          y="178"
          className="fill-[var(--tos-charcoal)]"
          style={{ fontSize: 8, fontFamily: "var(--tos-font-sans)" }}
          opacity={treasury ? 0.75 : 0.35}
        >
          Treasury
        </text>

        {/* Forecast — quiet projection */}
        <motion.path
          d="M 220 175 C 260 175, 300 168, 340 160"
          fill="none"
          stroke="var(--tos-ash-gray)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="3 4"
          initial={reduce ? false : valueStreamMotion.forecast.initial}
          animate={
            forecast || treasury
              ? { pathLength: 1, opacity: forecast ? 0.55 : 0.28 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={reduce ? { duration: 0 } : valueStreamMotion.forecast.transition}
        />
      </svg>

      <ol className="mt-3 flex flex-wrap gap-1.5" aria-label="Financial states">
        {VALUE_STREAM_STATES.filter((s) => s !== "forecast").map((s, i) => {
          const active = s === state || (state === "forecast" && s === "treasury");
          const done = VALUE_STREAM_STATES.indexOf(s) < activeIndex;
          return (
            <li key={s}>
              <span
                className={cn(
                  "inline-flex rounded-[var(--tos-radius-sm)] px-2 py-1 text-[10px] tracking-[0.05em] uppercase",
                  active && "bg-tos-accent text-tos-text-on-accent",
                  done && !active && "bg-tos-success-bg text-tos-success",
                  !done && !active && "bg-tos-surface-sunken text-tos-text-faint",
                  active && s === "escrow" && !reduce && "tos-waiting",
                )}
              >
                {VALUE_STREAM_LABELS[s]}
              </span>
              {i < 5 ? <span className="sr-only"> then </span> : null}
            </li>
          );
        })}
      </ol>

      <p className="mt-3 text-xs leading-relaxed text-tos-text-faint">
        Streams lock, release, split, and pool — observable at every state. No hidden settlement.
      </p>
    </div>
  );
}
