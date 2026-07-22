import { CURRENT_FLOW, FUTURE_FLOW } from "@/features/marketing/content";
import { Reveal, Section } from "./section";

export function ProductValueSection() {
  return (
    <Section
      id="product"
      eyebrow="Product"
      title="Financial infrastructure under a hospitality surface"
      lead="TableOS is the settlement layer for high-value dining obligations — escrowed in USDC, released on a verified condition, split atomically — starting with premium experiential evenings."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Who it serves",
            body: "Michelin houses, hotel F&B, and experiential hosts who sell scarce, high-ticket inventory and cannot afford ops-grade reconciliation.",
          },
          {
            title: "Why it matters",
            body: "Deposits, attendance, partner payouts, and treasury are one workflow. Today they are five tools and a spreadsheet.",
          },
          {
            title: "Why now",
            body: "Programmable dollar settlement on Arc makes condition-gated money operational — without turning a dining room into a crypto product.",
          },
        ].map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06}>
            <div className="h-full border-t border-tos-border pt-5">
              <h3 className="text-base font-medium text-tos-text-strong">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-tos-text-muted">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function ProblemSection() {
  return (
    <Section
      id="problem"
      tone="subtle"
      eyebrow="Problem"
      title="Current rails were not built for conditioned evenings"
      lead="Premium dining already sells obligations with conditions. Banks and cards settle payment — they do not execute the business logic of the night."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal>
          <FlowCard title="Current workflow" tone="muted" steps={[...CURRENT_FLOW]} />
        </Reveal>
        <Reveal delay={0.08}>
          <FlowCard title="TableOS workflow" tone="accent" steps={[...FUTURE_FLOW]} />
        </Reveal>
      </div>
      <Reveal className="mt-10 max-w-2xl">
        <p className="text-sm text-tos-text-muted">
          The gap is not “accept crypto.” The gap is programmable settlement: hold until attendance, settle once,
          split correctly, update treasury — without manual reconciliation as the product.
        </p>
      </Reveal>
    </Section>
  );
}

function FlowCard({
  title,
  steps,
  tone,
}: {
  title: string;
  steps: string[];
  tone: "muted" | "accent";
}) {
  return (
    <div className="rounded-[var(--tos-radius-lg)] border border-tos-border bg-tos-surface p-6">
      <p className="text-xs tracking-[0.16em] text-tos-text-faint uppercase">{title}</p>
      <ol className="mt-5 space-y-0">
        {steps.map((step, i) => (
          <li key={step} className="flex gap-3">
            <div className="flex w-6 flex-col items-center">
              <span
                className={
                  tone === "accent"
                    ? "mt-1 h-2 w-2 rounded-full bg-tos-accent"
                    : "mt-1 h-2 w-2 rounded-full bg-tos-border-strong"
                }
              />
              {i < steps.length - 1 ? <span className="w-px flex-1 bg-tos-border" /> : null}
            </div>
            <p className="pb-4 text-sm text-tos-text">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function SolutionSection() {
  return (
    <Section
      id="solution"
      eyebrow="Solution"
      title="Condition-gated settlement as the operating system"
      lead="Create the evening, take the booking, hold USDC, attest attendance, settle and split, refresh treasury — one product path operators can demo in three minutes."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { t: "Escrow", d: "Funds held until the condition is met." },
          { t: "Condition", d: "Attendance (or policy) unlocks release." },
          { t: "Atomic split", d: "Partners paid with the settlement." },
          { t: "Treasury", d: "Balances follow the same truth as ops." },
        ].map((item, i) => (
          <Reveal key={item.t} delay={i * 0.05}>
            <div className="rounded-[var(--tos-radius-md)] bg-tos-bg-subtle px-5 py-6">
              <p className="text-sm font-medium text-tos-text-strong">{item.t}</p>
              <p className="mt-2 text-sm text-tos-text-muted">{item.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
