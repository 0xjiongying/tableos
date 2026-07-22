import { CURRENT_FLOW, FUTURE_FLOW } from "@/features/marketing/content";
import { Reveal, Section } from "./section";

export function ProductValueSection() {
  return (
    <Section
      id="product"
      eyebrow="Product"
      title="Programmable financial OS for hospitality"
      lead="Built on Arc — accept USDC, automate escrow, distribute revenue instantly, and manage treasury through programmable money."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Who it serves",
            body: "Premium restaurants, chef’s tables, luxury hotels, tourism businesses, and dining event organizers running scarce, high-ticket inventory.",
          },
          {
            title: "Why it matters",
            body: "Payments become automated financial workflows — reservation, settlement, revenue sharing, treasury — not isolated transactions and spreadsheets.",
          },
          {
            title: "Why now",
            body: "Arc’s stablecoin-native rails make programmable money operational: less manual reconciliation, real-time and cross-border commerce for premium hospitality.",
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
      title="Isolated payments cannot run a financial workflow"
      lead="Banks and cards authorize transactions. Premium dining needs value that escrows, settles, distributes, and updates treasury — continuously, observably, on Arc."
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
          The gap is not “accept crypto.” The gap is programmable money on Arc: hold until attendance, settle once,
          distribute correctly, update treasury — reducing manual reconciliation and enabling real-time settlement.
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
    <div className="tos-plane p-6">
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
      title="Value Streams — money you can follow"
      lead="Authorize, contain in escrow, settle with certainty, split to parties, pool into treasury, explain the change. Automation without opacity."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { t: "Authorization", d: "Payment commits; the stream begins." },
          { t: "Escrow", d: "Value holds in a visible vessel — not a spinner." },
          { t: "Settlement", d: "Escrow unlocks; funds move with certainty." },
          { t: "Distribution", d: "Streams fork to house, chef, venue, organizer." },
          { t: "Treasury", d: "Balances pool into live cash position." },
          { t: "Insight", d: "AI explains what changed — never chat-first." },
        ].map((item, i) => (
          <Reveal key={item.t} delay={i * 0.05}>
            <div className="rounded-[var(--tos-radius-md)] bg-tos-bg-subtle/90 px-5 py-6">
              <p className="text-sm font-medium text-tos-text-strong">{item.t}</p>
              <p className="mt-2 text-sm text-tos-text-muted">{item.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
