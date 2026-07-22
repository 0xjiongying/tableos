"use client";

import type { ReactNode } from "react";
import { SpatialSection } from "@/components/experience/spatial";

/** Connects homepage chapters with a quiet rail + camera-like depth. */
export function JourneyFrame({
  children,
  index,
  label,
}: {
  children: ReactNode;
  index: number;
  label: string;
}) {
  return (
    <SpatialSection depth={index % 2 === 0 ? "mid" : "bg"}>
      <div className="tos-journey-rail relative">
        <div className="pointer-events-none absolute left-6 top-6 z-[1] hidden md:block md:left-8">
          <p className="font-mono text-[10px] tracking-[0.16em] text-tos-text-faint uppercase">
            {String(index).padStart(2, "0")} · {label}
          </p>
        </div>
        {children}
      </div>
    </SpatialSection>
  );
}
