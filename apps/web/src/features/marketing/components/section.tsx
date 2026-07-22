"use client";

import { useReducedMotion } from "motion/react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className,
  tone = "default",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "subtle" | "ink";
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 border-b border-tos-border-subtle",
        tone === "default" && "bg-tos-bg",
        tone === "subtle" && "bg-tos-bg-subtle",
        tone === "ink" && "bg-[var(--tos-ink-black)] text-[var(--tos-rice-white)]",
        className,
      )}
    >
      <div className="mx-auto max-w-[72rem] px-6 py-20 md:px-8 md:py-28">
        {(eyebrow || title || lead) && (
          <Reveal className="mb-12 max-w-2xl md:mb-16">
            {eyebrow ? (
              <p
                className={cn(
                  "text-xs tracking-[0.2em] uppercase",
                  tone === "ink" ? "text-[var(--tos-champagne-gold)]" : "text-tos-premium",
                )}
              >
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2
                className={cn(
                  "mt-3 text-[length:var(--tos-text-title)] leading-[var(--tos-leading-title)] tracking-tight",
                  tone === "ink" ? "text-[var(--tos-rice-white)]" : "text-tos-text-strong",
                )}
              >
                {title}
              </h2>
            ) : null}
            {lead ? (
              <p
                className={cn(
                  "mt-4 text-base md:text-lg",
                  tone === "ink" ? "text-[var(--tos-ash-gray)]" : "text-tos-text-muted",
                )}
              >
                {lead}
              </p>
            ) : null}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
