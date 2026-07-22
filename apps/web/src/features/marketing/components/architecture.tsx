"use client";

import { useState } from "react";
import { ARCH_NODES } from "@/features/marketing/content";
import { Reveal, Section } from "./section";
import { cn } from "@/lib/utils";

const EDGES: Array<[string, string]> = [
  ["frontend", "backend"],
  ["backend", "db"],
  ["backend", "wallet"],
  ["backend", "notify"],
  ["backend", "monitor"],
  ["wallet", "arc"],
  ["arc", "usdc"],
  ["arc", "contracts"],
  ["contracts", "usdc"],
];

export function ArchitectureSection() {
  const [active, setActive] = useState<string>("arc");
  const node = ARCH_NODES.find((n) => n.id === active) ?? ARCH_NODES[0]!;

  return (
    <Section
      id="architecture"
      eyebrow="Architecture"
      title="How TableOS fits together"
      lead="A clear boundary between the hospitality product, settlement adapters, and Arc — so demos stay honest and production stays extensible."
    >
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[var(--tos-radius-lg)] border border-tos-border bg-tos-surface p-4 md:p-6">
            <svg
              viewBox="0 0 640 360"
              className="h-auto w-full"
              role="img"
              aria-label="System architecture diagram with selectable nodes"
            >
              <title>TableOS architecture</title>
              {EDGES.map(([from, to]) => {
                const a = pos(from);
                const b = pos(to);
                const lit = active === from || active === to;
                return (
                  <line
                    key={`${from}-${to}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={lit ? "var(--tos-deep-forest)" : "var(--tos-warm-stone)"}
                    strokeWidth={lit ? 2 : 1}
                    opacity={lit ? 0.9 : 0.55}
                  />
                );
              })}
              {ARCH_NODES.map((n) => {
                const p = pos(n.id);
                const selected = active === n.id;
                return (
                  <g key={n.id}>
                    <rect
                      x={p.x - 58}
                      y={p.y - 22}
                      width={116}
                      height={44}
                      rx={4}
                      fill={selected ? "var(--tos-deep-forest)" : "var(--tos-warm-ivory)"}
                      stroke={selected ? "var(--tos-deep-forest)" : "var(--tos-warm-stone)"}
                      strokeWidth={1}
                      className="cursor-pointer"
                      onClick={() => setActive(n.id)}
                      role="button"
                      tabIndex={0}
                      aria-pressed={selected}
                      aria-label={n.label}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActive(n.id);
                        }
                      }}
                    />
                    <text
                      x={p.x}
                      y={p.y + 4}
                      textAnchor="middle"
                      className="pointer-events-none select-none"
                      fill={selected ? "var(--tos-rice-white)" : "var(--tos-charcoal)"}
                      fontSize={12}
                      fontFamily="var(--tos-font-sans)"
                    >
                      {n.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="mt-4 flex flex-wrap gap-2 md:hidden">
              {ARCH_NODES.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setActive(n.id)}
                  className={cn(
                    "rounded-[var(--tos-radius-sm)] border px-2.5 py-1.5 text-xs",
                    active === n.id
                      ? "border-tos-border-focus bg-tos-accent text-tos-text-on-accent"
                      : "border-tos-border bg-tos-bg text-tos-text-muted",
                  )}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[var(--tos-radius-lg)] bg-tos-bg-subtle px-6 py-6">
            <p className="text-xs tracking-[0.16em] text-tos-premium uppercase">Selected</p>
            <h3 className="mt-2 text-xl font-medium text-tos-text-strong">{node.label}</h3>
            <p className="mt-3 text-sm leading-relaxed text-tos-text-muted">{node.desc}</p>
            <p className="mt-6 text-xs text-tos-text-faint">
              Layer: {node.layer === "app" ? "Product" : node.layer === "money" ? "Settlement" : node.layer === "data" ? "Data" : "Operations"}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-tos-text-muted">
              <li>Click a node to inspect responsibilities.</li>
              <li>
                Live demo: <strong className="font-medium text-tos-text-strong">mock payments adapter</strong>. Arc
                testnet (Chain ID 5042002) is the integration target — never fake chain success.
              </li>
              <li>USDC is unit of account and Arc primary gas; no Arc token dependency.</li>
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function pos(id: string): { x: number; y: number } {
  const map: Record<string, { x: number; y: number }> = {
    frontend: { x: 110, y: 70 },
    backend: { x: 320, y: 70 },
    db: { x: 530, y: 70 },
    wallet: { x: 200, y: 180 },
    arc: { x: 360, y: 180 },
    usdc: { x: 520, y: 180 },
    contracts: { x: 360, y: 290 },
    notify: { x: 140, y: 290 },
    monitor: { x: 250, y: 290 },
  };
  return map[id] ?? { x: 320, y: 180 };
}
