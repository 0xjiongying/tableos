"use client";

import type { ReactNode } from "react";
import { Ambience } from "@/components/experience/ambience";
import { TimeOfDayProvider } from "@/components/experience/time-of-day";

export function StaffExperienceShell({
  children,
  bare = false,
}: {
  children: ReactNode;
  bare?: boolean;
}) {
  return (
    <TimeOfDayProvider>
      <div className="relative min-h-screen">
        <Ambience />
        <div className={bare ? "tos-shell min-h-screen" : "tos-shell min-h-screen"}>{children}</div>
      </div>
    </TimeOfDayProvider>
  );
}
