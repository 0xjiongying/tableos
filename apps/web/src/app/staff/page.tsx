import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { dashboardStats } from "@/features/reservations/service";
import { EmptyState } from "@/components/ui/states";
import { StaffDashboardClient } from "@/components/experience/staff-dashboard-client";

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
    <StaffDashboardClient
      restaurantName={restaurant.name}
      staffName={session!.name}
      currency={restaurant.currency}
      stats={{
        reservationsActive: stats.reservationsActive,
        escrowedCents: stats.escrowedCents,
        escrowedCount: stats.escrowedCount,
        releasedCents: stats.releasedCents,
        events: stats.events.map((e) => ({
          id: e.id,
          title: e.title,
          startsAt: e.startsAt.toISOString(),
          seatsBooked: e.seatsBooked,
          capacity: e.capacity,
          priceCents: e.priceCents,
          currency: e.currency,
        })),
        activities: stats.activities.map((a) => ({
          id: a.id,
          summary: a.summary,
          actorLabel: a.actorLabel,
          createdAt: a.createdAt.toISOString(),
        })),
      }}
    />
  );
}
