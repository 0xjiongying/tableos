import type { ReactNode } from "react";
import { Ambience } from "@/components/experience/ambience";
import { TimeOfDayProvider } from "@/components/experience/time-of-day";
import { TimeOfDayControl } from "@/components/experience/tod-control";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function MarketingShell({
  children,
  showAmbienceControl = true,
}: {
  children: ReactNode;
  showAmbienceControl?: boolean;
}) {
  return (
    <TimeOfDayProvider>
      <div className="relative flex min-h-screen flex-col">
        <Ambience />
        <div className="tos-shell flex min-h-screen flex-col">
          <SiteHeader />
          {showAmbienceControl ? (
            <div className="border-b border-tos-border-subtle/80 bg-tos-bg/40">
              <div className="mx-auto flex max-w-[72rem] px-6 py-2 md:px-8">
                <TimeOfDayControl />
              </div>
            </div>
          ) : null}
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </div>
    </TimeOfDayProvider>
  );
}
