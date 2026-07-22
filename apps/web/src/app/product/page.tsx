import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MarketingShell } from "@/features/marketing/components/marketing-shell";
import { Reveal, Section } from "@/features/marketing/components/section";
import { FEATURES, SERVICE_CHAPTERS, SITE } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: "Product",
  description:
    "TableOS product — programmable financial OS for premium dining: USDC on Arc, smart contract escrow, automatic revenue distribution, and real-time treasury.",
};

export default function ProductPage() {
  return (
    <MarketingShell>
      <Section
        eyebrow="Product"
        title="Financial workflows, not isolated payments"
        lead="TableOS turns every payment into an automated financial workflow — from reservation and settlement to revenue sharing and treasury updates — for restaurants, chef’s tables, luxury hotels, and dining event organizers."
      >
        <Reveal>
          <div className="flex flex-wrap gap-3">
            <Link href="/#demo">
              <Button>Watch the evening</Button>
            </Link>
            <Link href={SITE.demoBook}>
              <Button variant="secondary">Live guest demo</Button>
            </Link>
          </div>
        </Reveal>
      </Section>

      <Section
        tone="subtle"
        eyebrow="Core MVP"
        title="Six capabilities. No feature bloat."
        lead="The MVP proves programmable money for premium dining end to end on Arc."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.id} delay={i * 0.04}>
              <div className="h-full border-t border-tos-border pt-5">
                <p className="text-xs text-tos-text-faint">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-base font-medium text-tos-text-strong">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-tos-text-muted">{feature.solution}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="A day in service"
        title="What ships, told as chapters"
        lead="Four moments. Each ties the evening to programmable settlement on Arc."
      >
        <div className="space-y-10">
          {SERVICE_CHAPTERS.map((chapter) => (
            <Reveal key={chapter.id}>
              <article className="grid gap-4 border-t border-tos-border pt-6 md:grid-cols-[7rem_1fr]">
                <p className="text-xs tracking-[0.18em] text-tos-premium uppercase">{chapter.hour}</p>
                <div>
                  <h3 className="text-lg font-medium text-tos-text-strong">{chapter.title}</h3>
                  <p className="mt-2 text-sm text-tos-text-muted">{chapter.body}</p>
                  <p className="mt-3 text-xs text-tos-text-faint">{chapter.capability}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Demo path"
        title="Three-minute narrative"
        lead="Compose or open an event → guest books → payment held → door attendance → release → treasury glance."
      >
        <Reveal>
          <ol className="max-w-xl space-y-3 text-sm text-tos-text-muted">
            <li>1. Open staff demo and review tonight’s inventory.</li>
            <li>2. Complete a guest booking on /book/kintsugi.</li>
            <li>3. Confirm held funds on the confirmation path.</li>
            <li>4. Check in at Door — settlement status advances.</li>
            <li>5. Return to dashboard / briefing for the evening posture.</li>
          </ol>
          <p className="mt-6 text-xs text-tos-text-faint">
            Staff: {SITE.demoCredentials.email} / {SITE.demoCredentials.password} · Payments: mock adapter (honest)
          </p>
        </Reveal>
      </Section>
    </MarketingShell>
  );
}
