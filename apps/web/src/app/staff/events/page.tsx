import { format } from "date-fns";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { listEvents } from "@/features/reservations/service";
import { formatMoney } from "@/lib/utils";
import { CreateEventForm } from "@/features/events/create-event-form";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/states";

export default async function StaffEventsPage() {
  const session = await getSession();
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug: session!.restaurantSlug },
  });
  if (!restaurant) return <EmptyState title="Restaurant missing" />;

  const events = await listEvents(restaurant.id);

  return (
    <main className="space-y-8">
      <header>
        <h1 className="text-[length:var(--tos-text-title)] text-tos-text-strong">Events</h1>
        <p className="mt-1 text-sm text-tos-text-muted">
          Scarce inventory with programmable split rules.
        </p>
      </header>

      <CreateEventForm />

      {events.length === 0 ? (
        <EmptyState title="No evenings yet" description="Publish your first tasting or pairing." />
      ) : (
        <Table>
          <THead>
            <TR>
              <TH>Evening</TH>
              <TH>When</TH>
              <TH>Seats</TH>
              <TH>Price</TH>
              <TH>Split</TH>
            </TR>
          </THead>
          <TBody>
            {events.map((e) => (
              <TR key={e.id}>
                <TD>
                  <p className="font-medium text-tos-text-strong">{e.title}</p>
                  <p className="text-xs text-tos-text-faint">{e.slug}</p>
                </TD>
                <TD>{format(e.startsAt, "d MMM yyyy HH:mm")}</TD>
                <TD className="tabular-nums">
                  {e.seatsBooked}/{e.capacity}
                </TD>
                <TD className="tabular-nums">{formatMoney(e.priceCents, e.currency)}</TD>
                <TD className="text-xs text-tos-text-muted">
                  {e.splitRules.map((r) => `${r.label} ${(r.bps / 100).toFixed(0)}%`).join(" · ")}
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}
    </main>
  );
}
