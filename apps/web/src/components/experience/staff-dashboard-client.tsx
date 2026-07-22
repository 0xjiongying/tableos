"use client";

import { format } from "date-fns";
import { greetingFor, useTimeOfDay } from "@/components/experience/time-of-day";
import { TimeOfDayControl } from "@/components/experience/tod-control";
import { formatMoney } from "@/lib/utils";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type EventRow = {
  id: string;
  title: string;
  startsAt: string | Date;
  seatsBooked: number;
  capacity: number;
  priceCents: number;
  currency: string;
};

type ActivityRow = {
  id: string;
  summary: string;
  actorLabel: string;
  createdAt: string | Date;
};

export function StaffDashboardClient({
  restaurantName,
  staffName,
  currency,
  stats,
}: {
  restaurantName: string;
  staffName: string;
  currency: string;
  stats: {
    reservationsActive: number;
    escrowedCents: number;
    escrowedCount: number;
    releasedCents: number;
    events: EventRow[];
    activities: ActivityRow[];
  };
}) {
  const { tod } = useTimeOfDay();
  const greeting = greetingFor(tod, staffName);

  return (
    <main className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs tracking-[0.18em] text-tos-premium uppercase">{restaurantName}</p>
          <h1 className="mt-2 text-[length:var(--tos-text-title)] text-tos-text-strong">{greeting}</h1>
          <p className="mt-1 text-sm text-tos-text-muted">
            Reservations, held funds, and house activity — calm at a glance.
          </p>
        </div>
        <TimeOfDayControl className="justify-end" />
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border-tos-border-subtle bg-tos-surface/90">
          <CardHeader>
            <CardDescription>Active reservations</CardDescription>
            <CardTitle className="text-3xl tabular-nums">{stats.reservationsActive}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-tos-border-subtle bg-tos-surface/90">
          <CardHeader>
            <CardDescription>Held funds</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {formatMoney(stats.escrowedCents, currency)}
            </CardTitle>
          </CardHeader>
          <p className="text-xs text-tos-text-muted">
            <span className={stats.escrowedCount > 0 ? "tos-waiting inline-block" : undefined}>
              {stats.escrowedCount} payment(s) awaiting attendance
            </span>
          </p>
        </Card>
        <Card className="border-tos-border-subtle bg-tos-surface/90">
          <CardHeader>
            <CardDescription>Released</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {formatMoney(stats.releasedCents, currency)}
            </CardTitle>
          </CardHeader>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="border-tos-border-subtle bg-tos-surface/90">
          <CardHeader>
            <CardTitle>Upcoming evenings</CardTitle>
            <CardDescription>Premium inventory on the book</CardDescription>
          </CardHeader>
          <ul className="space-y-3">
            {stats.events.map((e) => (
              <li
                key={e.id}
                className="flex items-baseline justify-between gap-4 border-b border-tos-border-subtle pb-3 last:border-0"
              >
                <div>
                  <p className="font-medium text-tos-text-strong">{e.title}</p>
                  <p className="text-xs text-tos-text-muted">
                    {format(new Date(e.startsAt), "EEE d MMM · HH:mm")} · {e.seatsBooked}/{e.capacity} seated
                  </p>
                </div>
                <p className="font-mono text-sm text-tos-text-muted">
                  {formatMoney(e.priceCents, e.currency)}
                </p>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border-tos-border-subtle bg-tos-surface/90">
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>Recent house movements</CardDescription>
          </CardHeader>
          <ul className="space-y-3">
            {stats.activities.map((a) => (
              <li key={a.id} className="border-b border-tos-border-subtle pb-3 last:border-0">
                <p className="text-sm text-tos-text-strong">{a.summary}</p>
                <p className="mt-0.5 text-xs text-tos-text-faint">
                  {a.actorLabel} · {format(new Date(a.createdAt), "d MMM HH:mm")}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </main>
  );
}
