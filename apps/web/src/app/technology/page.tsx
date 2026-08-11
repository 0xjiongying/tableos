import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArchitectureSection } from "@/features/marketing/components/architecture";
import { MarketingShell } from "@/features/marketing/components/marketing-shell";
import { Reveal, Section } from "@/features/marketing/components/section";
import { ARC, DEV_STACK, SITE } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "FlowArc architecture and Arc developer details — EVM testnet Chain ID 5042002, RPC, explorer, App Kit path, and honest adapter status.",
};

export default function TechnologyPage() {
  return (
    <MarketingShell>
      <Section
        eyebrow="Technology"
        title="Architecture for condition-gated USDC settlement"
        lead="Hospitality product shell on Next.js. Settlement core behind a PaymentsPort. Arc is Circle’s stablecoin-native EVM L1 — FlowArc targets programmable escrow, release, and split on USDC."
      >
        <Reveal>
          <div className="flex flex-wrap gap-3">
            <a href={ARC.docs} target="_blank" rel="noopener noreferrer">
              <Button>Arc docs</Button>
            </a>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary">FlowArc GitHub</Button>
            </a>
            <a href={ARC.github} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost">circlefin/arc-node</Button>
            </a>
          </div>
        </Reveal>
      </Section>

      <Section
        tone="subtle"
        eyebrow="Developers"
        title="Arc testnet & stack"
        lead="Public Arc testnet launched October 28, 2025. Mainnet targeted 2026. No Arc mainnet token is live — FlowArc does not depend on an Arc token."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal>
            <dl className="space-y-3 rounded-[var(--tos-radius-lg)] border border-tos-border bg-tos-surface p-6 text-sm">
              <div>
                <dt className="text-xs tracking-[0.14em] text-tos-text-faint uppercase">Network</dt>
                <dd className="mt-1 text-tos-text-strong">Arc public testnet</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.14em] text-tos-text-faint uppercase">Chain ID</dt>
                <dd className="mt-1 font-mono text-tos-text-strong">{ARC.chainId}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.14em] text-tos-text-faint uppercase">RPC</dt>
                <dd className="mt-1 break-all font-mono text-xs text-tos-text-muted">
                  <a href={ARC.rpc} className="underline-offset-2 hover:underline">
                    {ARC.rpc}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.14em] text-tos-text-faint uppercase">Explorer</dt>
                <dd className="mt-1">
                  <a
                    href={ARC.explorer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-tos-text-strong underline-offset-2 hover:underline"
                  >
                    testnet.arcscan.app
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.14em] text-tos-text-faint uppercase">Consensus / finality</dt>
                <dd className="mt-1 text-tos-text-muted">
                  {ARC.consensus} · ~{ARC.finalityMs}ms deterministic finality
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.14em] text-tos-text-faint uppercase">Gas</dt>
                <dd className="mt-1 text-tos-text-muted">{ARC.gas}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="space-y-4 rounded-[var(--tos-radius-lg)] border border-tos-border bg-tos-surface p-6">
              <p className="text-xs tracking-[0.14em] text-tos-premium uppercase">Integration honesty</p>
              <p className="text-sm text-tos-text-muted">{ARC.honesty}</p>
              <p className="text-sm text-tos-text-muted">{ARC.tokenNote}</p>
              <ul className="space-y-2 text-sm text-tos-text-muted">
                <li>
                  Official site:{" "}
                  <a href={ARC.site} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
                    arc.network
                  </a>
                </li>
                <li>
                  Docs:{" "}
                  <a href={ARC.docs} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
                    docs.arc.network
                  </a>
                </li>
                <li>
                  Ecosystem:{" "}
                  <a
                    href={ARC.ecosystem}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-2 hover:underline"
                  >
                    arc.network/ecosystem
                  </a>
                </li>
                <li>
                  Community:{" "}
                  <a
                    href={ARC.community}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-2 hover:underline"
                  >
                    Arc House
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DEV_STACK.map((row) => (
            <Reveal key={row.label}>
              <div className="rounded-[var(--tos-radius-md)] bg-tos-bg px-4 py-4">
                <p className="text-xs tracking-[0.14em] text-tos-text-faint uppercase">{row.label}</p>
                <p className="mt-2 text-sm text-tos-text-strong">{row.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <ArchitectureSection />

      <Section
        eyebrow="Modules"
        title="Smart contract & API posture"
        lead="Escrow, condition attestation, and distribution are domain modules behind ports. Deploy pipeline: Next.js on Vercel · Prisma generate on build · vitest for settlement domain."
      >
        <Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Contracts (EVM)",
                d: "Designed for Arc EVM: hold USDC, release on condition, split. Not claimed live on mainnet in v1.",
              },
              {
                t: "API overview",
                d: "/api/bookings, /api/events, /api/door/check-in, /api/ai, /api/auth — product surface for the vertical slice.",
              },
              {
                t: "Testing",
                d: "Domain settlement tests (vitest) · Playwright smoke · never assert fake chain receipts.",
              },
            ].map((item) => (
              <div key={item.t} className="border-t border-tos-border pt-4">
                <h3 className="text-sm font-medium text-tos-text-strong">{item.t}</h3>
                <p className="mt-2 text-sm text-tos-text-muted">{item.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-tos-text-muted">
            Stack note: Arc execution is Reth-based EVM; multichain USDC via CCTP/Gateway; App Kit for USDC application
            flows — see{" "}
            <a href={ARC.docs} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
              docs.arc.network
            </a>
            .
          </p>
          <div className="mt-6">
            <Link href="/contact">
              <Button>Request technical walkthrough</Button>
            </Link>
          </div>
        </Reveal>
      </Section>
    </MarketingShell>
  );
}
