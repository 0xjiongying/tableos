import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MarketingShell } from "@/features/marketing/components/marketing-shell";
import { Reveal, Section } from "@/features/marketing/components/section";
import { FEATURES, SITE } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: "Product",
  description:
    "TableOS product overview — USDC payments, programmable escrow, revenue distribution, treasury, and AI briefing for premium dining.",
};

export default function ProductPage() {
  return (
    <MarketingShell>
      <Section
        eyebrow="Product"
        title="The financial OS under premium dining"
        lead="TableOS is not a restaurant website. It is condition-gated settlement — book, hold USDC, attest attendance, settle and split, update treasury — with a hospitality surface guests and staff already understand."
      >
        <Reveal>
          <div className="flex flex-wrap gap-3">
            <Link href="/#demo">
              <Button>Interactive workflow</Button>
            </Link>
            <Link href={SITE.demoBook}>
              <Button variant="secondary">Live guest demo</Button>
            </Link>
          </div>
        </Reveal>
      </Section>

      <Section tone="subtle" eyebrow="MVP" title="What ships" lead="Five capabilities. Each tied to settlement value.">
        <div className="space-y-4">
          {FEATURES.map((f) => (
            <Reveal key={f.id}>
              <article className="border-t border-tos-border pt-5">
                <h3 className="text-lg font-medium text-tos-text-strong">{f.title}</h3>
                <p className="mt-2 text-sm text-tos-text-muted">{f.solution}</p>
                <p className="mt-3 text-sm text-tos-text-faint">
                  <span className="text-tos-premium">Arc · </span>
                  {f.arc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Demo path"
        title="Three-minute narrative"
        lead="Create or open an event → guest books → payment held → door attendance → release → treasury glance."
      >
        <Reveal>
          <ol className="max-w-xl space-y-3 text-sm text-tos-text-muted">
            <li>1. Open staff demo and review tonight’s inventory.</li>
            <li>2. Complete a guest booking on /book/kintsugi.</li>
            <li>3. Confirm held funds on the confirmation path.</li>
            <li>4. Check in at Door — settlement status advances.</li>
            <li>5. Return to dashboard / AI briefing for the evening posture.</li>
          </ol>
          <p className="mt-6 text-xs text-tos-text-faint">
            Staff: {SITE.demoCredentials.email} / {SITE.demoCredentials.password} · Payments: mock adapter (honest)
          </p>
        </Reveal>
      </Section>
    </MarketingShell>
  );
}
