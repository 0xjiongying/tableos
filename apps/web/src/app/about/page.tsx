import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MarketingShell } from "@/features/marketing/components/marketing-shell";
import { Reveal, Section } from "@/features/marketing/components/section";
import { ARC, SITE } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "About TableOS — the financial operating system for premium dining, built for programmable USDC settlement on Arc.",
};

export default function AboutPage() {
  return (
    <MarketingShell>
      <Section
        eyebrow="About"
        title="Why TableOS deserves to exist"
        lead="Premium dining already sells conditioned commercial obligations. The industry still settles them with cards, batches, and spreadsheets. TableOS makes escrow → attendance → split → treasury a product."
      >
        <Reveal>
          <div className="prose-none max-w-2xl space-y-4 text-sm leading-relaxed text-tos-text-muted">
            <p>
              <strong className="font-medium text-tos-text-strong">Company thesis:</strong> condition-gated settlement.
              Dining is the beachhead — the distribution wedge and product skin — not the ceiling.
            </p>
            <p>
              <strong className="font-medium text-tos-text-strong">Why Arc:</strong> Circle’s stablecoin-native L1
              (“Economic OS for the internet”) is purpose-built for USDC payments and real-world finance, with
              deterministic finality and institutional backing. TableOS hides chain chrome; it does not hide the need
              for settlement-grade rails.
            </p>
            <p>
              <strong className="font-medium text-tos-text-strong">Why now:</strong> Arc public testnet is live (
              {ARC.testnetLaunched}); mainnet is targeted {ARC.mainnetTarget}. Programmable dollar settlement is
              becoming operational infrastructure for fintech and enterprises — hospitality high-ticket flows are a
              precise first wedge.
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
