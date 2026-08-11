import Link from "next/link";
import {
  ARC,
  ENTERPRISE,
  FAQ,
  FEATURES,
  SITE,
  USE_CASES,
  WHY_ARC,
  WHY_NOT_ALTERNATIVES,
} from "@/features/marketing/content";
import { Button } from "@/components/ui/button";
import { Reveal, Section } from "./section";

export function WhyArcSection() {
  return (
    <Section
      id="why-arc"
      tone="ink"
      eyebrow="Why Arc"
      title="Circle’s stablecoin-native L1 for settlement-grade money"
      lead={`${ARC.summary} Public testnet launched ${ARC.testnetLaunched}; mainnet targeted ${ARC.mainnetTarget}. FlowArc uses Arc for programmable USDC escrow, release, and split — not speculation.`}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {WHY_ARC.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05}>
            <div className="border-t border-[color-mix(in_oklab,var(--tos-champagne-gold)_35%,transparent)] pt-5">
              <h3 className="text-base font-medium text-[var(--tos-rice-white)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--tos-ash-gray)]">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {WHY_NOT_ALTERNATIVES.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05}>
            <div className="rounded-[var(--tos-radius-md)] border border-[color-mix(in_oklab,var(--tos-champagne-gold)_28%,transparent)] px-5 py-5">
              <h3 className="text-sm font-medium text-[var(--tos-rice-white)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--tos-ash-gray)]">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 flex flex-wrap gap-4 text-sm">
        <a
          href={ARC.site}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--tos-champagne-gold)] underline-offset-2 hover:underline"
        >
          arc.network
        </a>
        <a
          href={ARC.docs}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--tos-champagne-gold)] underline-offset-2 hover:underline"
        >
          Arc docs
        </a>
        <Link href="/technology" className="text-[var(--tos-ash-gray)] underline-offset-2 hover:underline">
          Developers & testnet details
        </Link>
      </Reveal>

      <Reveal className="mt-8 max-w-2xl space-y-2">
        <p className="text-sm text-[var(--tos-ash-gray)]">{ARC.partnersNote}</p>
        <p className="text-sm text-[var(--tos-ash-gray)]">{ARC.tokenNote}</p>
        <p className="text-sm text-[var(--tos-ash-gray)]">{ARC.honesty}</p>
      </Reveal>
    </Section>
  );
}

export function FeaturesSection() {
  return (
    <Section
      id="features"
      eyebrow="Core MVP"
      title="Six capabilities. Each earns its place in the evening."
      lead="Six settlement-critical capabilities — premium dining is the setting; programmable money is the story."
    >
      <ol className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <Reveal key={feature.id} delay={i * 0.05}>
            <li className="tos-lift border-t border-tos-border-subtle px-1 py-8 md:px-4">
              <p className="font-mono text-[11px] tracking-[0.12em] text-tos-text-faint">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-base font-medium text-tos-text-strong">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-tos-text-muted">{feature.solution}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function UseCasesSection() {
  return (
    <Section
      id="use-cases"
      tone="subtle"
      eyebrow="Who it’s for"
      title="Hospitality businesses"
      lead="Premium restaurants, chef’s tables, luxury hotels, tourism and travel experiences, and dining event organizers — real-time, cross-border commerce without spreadsheet settlement."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {USE_CASES.map((u, i) => (
          <Reveal key={u.title} delay={i * 0.05}>
            <div className="tos-lift h-full border-t border-tos-border-subtle pt-5">
              <h3 className="text-base font-medium text-tos-text-strong">{u.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-tos-text-muted">{u.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function EnterpriseSection() {
  return (
    <Section
      id="enterprise"
      eyebrow="Enterprise"
      title="Trust requirements, in plain language"
      lead="Luxury operators and investors need security, auditability, and honest failure modes — not crypto spectacle."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ENTERPRISE.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.04}>
            <div className="rounded-[var(--tos-radius-md)] border border-tos-border-subtle bg-tos-bg-subtle/80 px-5 py-5">
              <h3 className="text-sm font-medium text-tos-text-strong">{e.title}</h3>
              <p className="mt-2 text-sm text-tos-text-muted">{e.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function FaqSection() {
  return (
    <Section
      id="faq"
      tone="subtle"
      eyebrow="FAQ"
      title="Direct answers"
      lead="What FlowArc is — and what it deliberately is not."
    >
      <div className="mx-auto max-w-3xl divide-y divide-tos-border-subtle border-y border-tos-border-subtle">
        {FAQ.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="cursor-pointer list-none text-base font-medium text-tos-text-strong marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-4">
                {item.q}
                <span className="text-tos-text-faint transition group-open:rotate-45" aria-hidden>
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-tos-text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

export function CtaSection() {
  return (
    <Section id="cta" className="border-b-0">
      <Reveal>
        <div className="rounded-[var(--tos-radius-lg)] border border-tos-border bg-[var(--tos-ink-black)] px-8 py-14 text-center md:px-16">
          <p className="text-xs tracking-[0.2em] text-[var(--tos-champagne-gold)] uppercase">Next step</p>
          <h2 className="mx-auto mt-4 max-w-xl text-[length:var(--tos-text-title)] leading-tight text-[var(--tos-rice-white)]">
            See programmable money on a live surface
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-[var(--tos-ash-gray)]">
            Request a walkthrough, or open the guest and staff demos. Arc wiring stays honest — mock payments today,
            adapters ready for testnet.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact">
              <Button size="lg">Request demo</Button>
            </Link>
            <Link href={SITE.demoBook}>
              <Button size="lg" variant="premium">
                Guest book demo
              </Button>
            </Link>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="ghost" className="text-[var(--tos-rice-white)] hover:bg-white/10">
                GitHub
              </Button>
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
