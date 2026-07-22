"use client";

import type { ReactNode } from "react";
import { Ambience } from "@/components/experience/ambience";
import { TimeOfDayProvider } from "@/components/experience/time-of-day";

export function GuestExperienceShell({ children }: { children: ReactNode }) {
  return (
    <TimeOfDayProvider>
      <div className="relative min-h-screen">
        <Ambience />
        <div className="tos-shell relative min-h-screen">{children}</div>
      </div>
    </TimeOfDayProvider>
  );
}
