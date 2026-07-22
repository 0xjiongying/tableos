import { format } from "date-fns";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { dashboardStats } from "@/features/reservations/service";
import { formatMoney } from "@/lib/utils";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/states";

export default async function StaffDashboardPage() {
  const session = await getSession();
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug: session!.restaurantSlug },
  });
  if (!restaurant) {
    return <EmptyState title="Restaurant missing" description="Run pnpm db:seed" />;
  }

  const stats = await dashboardStats(restaurant.id);

  return (
    <main className="space-y-8">
      <header>
        <p className="text-xs tracking-[0.18em] text-tos-premium uppercase">{restaurant.name}</p>
        <h1 className="mt-2 text-[length:var(--tos-text-title)] text-tos-text-strong">
          Good evening, {session!.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-tos-text-muted">
          Reservations, held funds, and house activity — calm at a glance.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Active reservations</CardDescription>
            <CardTitle className="text-3xl tabular-nums">{stats.reservationsActive}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Held funds</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {formatMoney(stats.escrowedCents, restaurant.currency)}
            </CardTitle>
          </CardHeader>
          <p className="text-xs text-tos-text-muted">{stats.escrowedCount} payment(s) awaiting attendance</p>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Released</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {formatMoney(stats.releasedCents, restaurant.currency)}
            </CardTitle>
          </CardHeader>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming events</CardTitle>
            <CardDescription>Premium inventory on the book</CardDescription>
          </CardHeader>
          <ul className="space-y-3">
            {stats.events.map((e) => (
              <li key={e.id} className="flex items-baseline justify-between gap-4 border-b border-tos-border-subtle pb-3 last:border-0">
                <div>
                  <p className="font-medium text-tos-text-strong">{e.title}</p>
                  <p className="text-xs text-tos-text-muted">
                    {format(e.startsAt, "EEE d MMM · HH:mm")} · {e.seatsBooked}/{e.capacity} seated
                  </p>
                </div>
                <p className="font-mono text-sm text-tos-text-muted">
                  {formatMoney(e.priceCents, e.currency)}
                </p>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>Recent house movements</CardDescription>
          </CardHeader>
          <ul className="space-y-3">
            {stats.activities.map((a) => (
              <li key={a.id} className="border-b border-tos-border-subtle pb-3 last:border-0">
                <p className="text-sm text-tos-text-strong">{a.summary}</p>
                <p className="mt-0.5 text-xs text-tos-text-faint">
                  {a.actorLabel} · {format(a.createdAt, "d MMM HH:mm")}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </main>
  );
}
