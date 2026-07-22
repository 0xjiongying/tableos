import { format } from "date-fns";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { CheckInButton } from "@/features/door/check-in-button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/states";
import { formatMoney } from "@/lib/utils";

export default async function DoorPage() {
  const session = await getSession();
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug: session!.restaurantSlug },
  });
  if (!restaurant) return <EmptyState title="Restaurant missing" />;

  const list = await prisma.reservation.findMany({
    where: {
      restaurantId: restaurant.id,
      status: { in: ["CONFIRMED", "CHECKED_IN"] },
    },
    include: { guest: true, diningEvent: true, payments: true },
    orderBy: { scheduledAt: "asc" },
  });

  return (
    <main className="space-y-8">
      <header>
        <h1 className="text-[length:var(--tos-text-title)] text-tos-text-strong">Door</h1>
        <p className="mt-1 text-sm text-tos-text-muted">
          Verify attendance, then release held funds to the house.
        </p>
      </header>

      {list.length === 0 ? (
        <EmptyState title="No guests on the list" />
      ) : (
        <ul className="space-y-3">
          {list.map((r) => {
            const payment = r.payments[0];
            const canRelease = r.status === "CONFIRMED" && payment?.status === "ESCROWED";
            return (
              <li key={r.id}>
                <Card className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <CardHeader className="mb-0">
                      <CardTitle className="text-base">{r.guest.name}</CardTitle>
                      <CardDescription>
                        {r.confirmationCode} · {r.diningEvent?.title} ·{" "}
                        {format(r.scheduledAt, "HH:mm")}
                      </CardDescription>
                    </CardHeader>
                    <p className="mt-2 text-xs text-tos-text-muted">
                      {payment
                        ? `${payment.status.replaceAll("_", " ")} · ${formatMoney(payment.amountCents, payment.currency)}`
                        : "No payment"}
                    </p>
                  </div>
                  {canRelease ? (
                    <CheckInButton reservationId={r.id} />
                  ) : (
                    <span className="text-xs tracking-wide text-tos-premium">
                      {r.status === "CHECKED_IN" ? "Settled" : r.status}
                    </span>
                  )}
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
