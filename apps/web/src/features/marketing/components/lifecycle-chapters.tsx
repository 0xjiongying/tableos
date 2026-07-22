import { SERVICE_CHAPTERS } from "@/features/marketing/content";
import { Reveal, Section } from "./section";

/** Documentary chapters of the payment lifecycle (not restaurant OS screens). */
export function LifecycleChaptersSection() {
  return (
    <Section
      id="chapters"
      eyebrow="Financial journey"
      title="From reservation to treasury intelligence"
      lead="Six beats of programmable money — dining is the setting; the payment lifecycle is the story."
    >
      <div className="space-y-0">
        {SERVICE_CHAPTERS.map((chapter, i) => (
          <Reveal key={chapter.id} delay={i * 0.05}>
            <article
              className={
                i === 0
                  ? "border-t border-tos-border-subtle pt-10"
                  : "mt-10 border-t border-tos-border-subtle pt-10"
              }
            >
              <div className="grid gap-6 md:grid-cols-[7rem_1fr] md:gap-12">
                <p className="font-mono text-xs tracking-[0.18em] text-tos-premium uppercase">
                  {chapter.hour}
                </p>
                <div>
                  <h3 className="text-[length:var(--tos-text-heading)] font-medium text-tos-text-strong">
                    {chapter.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-tos-text-muted">
                    {chapter.body}
                  </p>
                  <p className="mt-4 text-xs tracking-[0.04em] text-tos-text-faint">
                    {chapter.capability}
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
