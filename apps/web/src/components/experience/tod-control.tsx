"use client";

import { useTimeOfDay, type TimeOfDay } from "@/components/experience/time-of-day";
import { cn } from "@/lib/utils";

const LABELS: Record<TimeOfDay, string> = {
  morning: "Morning light",
  afternoon: "Afternoon calm",
  evening: "Evening service",
  night: "Night quiet",
};

export function TimeOfDayControl({ className }: { className?: string }) {
  const { tod, setTod, auto, setAuto } = useTimeOfDay();

  return (
    <div
      className={cn("flex flex-wrap items-center gap-2", className)}
      role="group"
      aria-label="Time of day ambience"
    >
      <span className="text-[10px] tracking-[0.14em] text-tos-text-faint uppercase">Ambience</span>
      {(["morning", "afternoon", "evening", "night"] as const).map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => setTod(key)}
          aria-pressed={tod === key && !auto}
          className={cn(
            "rounded-[var(--tos-radius-sm)] px-2 py-1 text-[11px] transition-colors duration-[var(--tos-duration-fast)] ease-[var(--tos-ease-soft)]",
            tod === key && !auto
              ? "bg-tos-accent text-tos-text-on-accent"
              : "bg-tos-bg-muted text-tos-text-muted hover:text-tos-text",
          )}
        >
          {LABELS[key]}
        </button>
      ))}
      <button
        type="button"
        onClick={() => setAuto(true)}
        aria-pressed={auto}
        className={cn(
          "rounded-[var(--tos-radius-sm)] px-2 py-1 text-[11px] transition-colors",
          auto ? "text-tos-premium" : "text-tos-text-faint hover:text-tos-text-muted",
        )}
      >
        Local time
      </button>
    </div>
  );
}
