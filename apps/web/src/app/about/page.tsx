import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MarketingShell } from "@/features/marketing/components/marketing-shell";
import { Reveal, Section } from "@/features/marketing/components/section";
import { ARC, SITE } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE.name} — ${SITE.tagline} ${SITE.description}`,
};

export default function AboutPage() {
  return (
    <MarketingShell>
      <Section
        eyebrow="About"
        title={SITE.tagline}
        lead={`${SITE.name} — ${SITE.description} Built on Arc.`}
      >
        <Reveal>
          <div className="prose-none max-w-2xl space-y-4 text-sm leading-relaxed text-tos-text-muted">
            <p>
              <strong className="font-medium text-tos-text-strong">What changes:</strong> instead of treating
              payments as isolated transactions, FlowArc transforms every payment into an automated financial
              workflow — from reservation and settlement to revenue sharing and treasury updates.
            </p>
            <p>
              <strong className="font-medium text-tos-text-strong">Why Arc:</strong> built on Arc’s
              stablecoin-native infrastructure, FlowArc demonstrates how programmable money can simplify financial
              operations, reduce manual reconciliation, and enable real-time, cross-border commerce for premium
              hospitality. Arc is Circle’s L1 with USDC gas, ~{ARC.finalityMs}ms deterministic finality (
              {ARC.consensus}), and institutional settlement primitives.
            </p>
            <p>
              <strong className="font-medium text-tos-text-strong">Trajectory:</strong> designed to evolve from a
              hackathon MVP into enterprise-grade financial infrastructure for the global premium hospitality
              industry. Arc public testnet launched {ARC.testnetLaunched}; mainnet targeted {ARC.mainnetTarget}.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/product">
              <Button>Product</Button>
            </Link>
            <Link href="/technology">
              <Button variant="secondary">Technology</Button>
            </Link>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost">GitHub</Button>
            </a>
          </div>
        </Reveal>
      </Section>
    </MarketingShell>
  );
}
