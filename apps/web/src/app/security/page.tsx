import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MarketingShell } from "@/features/marketing/components/marketing-shell";
import { Reveal, Section } from "@/features/marketing/components/section";
import { ARC, ENTERPRISE } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: "Security",
  description:
    "FlowArc enterprise posture — security, compliance, auditability, reliability, and honest Arc adapter boundaries.",
};

export default function SecurityPage() {
  return (
    <MarketingShell>
      <Section
        eyebrow="Security & enterprise"
        title="Trust requirements for high-ticket settlement"
        lead="Luxury operators need calm UX and serious controls. FlowArc separates guest language from settlement mechanics and refuses to fabricate chain success."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {ENTERPRISE.map((e) => (
            <Reveal key={e.title}>
              <div className="rounded-[var(--tos-radius-md)] border border-tos-border-subtle bg-tos-bg-subtle px-5 py-5">
                <h2 className="text-base font-medium text-tos-text-strong">{e.title}</h2>
                <p className="mt-2 text-sm text-tos-text-muted">{e.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        tone="subtle"
        eyebrow="Arc & compliance"
        title="Network primitives that matter to enterprises"
        lead="Arc provides opt-in configurable privacy for compliance-oriented workloads, USDC-native gas for predictable costs, and deterministic finality for settlement — Circle-backed institutional infrastructure."
      >
        <Reveal>
          <ul className="max-w-2xl space-y-3 text-sm text-tos-text-muted">
            <li>· {ARC.privacy}</li>
            <li>· {ARC.gas}</li>
            <li>
              · ~{ARC.finalityMs}ms deterministic finality ({ARC.consensus}) — no re-org risk for release/split
            </li>
            <li>· {ARC.partnersNote}</li>
            <li>· {ARC.honesty}</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={ARC.docs} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary">Arc documentation</Button>
            </a>
            <Link href="/contact">
              <Button>Talk to us</Button>
            </Link>
          </div>
        </Reveal>
      </Section>
    </MarketingShell>
  );
}
