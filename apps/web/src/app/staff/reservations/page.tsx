import { format } from "date-fns";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/states";

export default async function StaffReservationsPage() {
  const session = await getSession();
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug: session!.restaurantSlug },
  });
  if (!restaurant) return <EmptyState title="Restaurant missing" />;

  const reservations = await prisma.reservation.findMany({
    where: { restaurantId: restaurant.id },
    include: { guest: true, diningEvent: true, payments: true },
    orderBy: { scheduledAt: "asc" },
  });

  return (
    <main className="space-y-8">
      <header>
        <h1 className="text-[length:var(--tos-text-title)] text-tos-text-strong">Reservations</h1>
        <p className="mt-1 text-sm text-tos-text-muted">Guest book with payment state.</p>
      </header>

      {reservations.length === 0 ? (
        <EmptyState title="No reservations" description="Share the guest booking link." />
      ) : (
        <Table>
          <THead>
            <TR>
              <TH>Guest</TH>
              <TH>Code</TH>
              <TH>Evening</TH>
              <TH>When</TH>
              <TH>Status</TH>
              <TH>Payment</TH>
            </TR>
          </THead>
          <TBody>
            {reservations.map((r) => (
              <TR key={r.id}>
                <TD>
                  <p className="font-medium text-tos-text-strong">{r.guest.name}</p>
                  <p className="text-xs text-tos-text-faint">{r.guest.email}</p>
                </TD>
                <TD className="font-mono text-xs">{r.confirmationCode}</TD>
                <TD>{r.diningEvent?.title ?? "—"}</TD>
                <TD>{format(r.scheduledAt, "d MMM HH:mm")}</TD>
                <TD>
                  <StatusPill label={r.status} />
                </TD>
                <TD>
                  <StatusPill label={r.payments[0]?.status ?? "—"} />
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}
    </main>
  );
}

function StatusPill({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-[var(--tos-radius-sm)] border border-tos-border-subtle bg-tos-bg-subtle px-2 py-0.5 text-xs tracking-wide text-tos-text">
      {label.replaceAll("_", " ")}
    </span>
  );
}
