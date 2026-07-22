import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { prisma } from "@/lib/db";
import { GuestNav } from "@/components/layout/nav";
import { formatMoney } from "@/lib/utils";
import { guestPaymentCopy } from "@/domain/settlement";
import { Button } from "@/components/ui/button";

export default async function ConfirmPage({
  params,
}: {
  params: Promise<{ slug: string; code: string }>;
}) {
  const { slug, code } = await params;
  const reservation = await prisma.reservation.findUnique({
    where: { confirmationCode: code },
    include: {
      guest: true,
      diningEvent: true,
      payments: true,
      restaurant: true,
    },
  });

  if (!reservation || reservation.restaurant.slug !== slug) notFound();

  const payment = reservation.payments[0];

  return (
    <div className="min-h-screen">
      <GuestNav restaurantName={reservation.restaurant.name} />
      <main className="mx-auto flex max-w-[28rem] flex-col px-8 py-12">
        <p className="text-xs tracking-[0.18em] text-tos-premium uppercase">Confirmed</p>
        <h1 className="mt-3 text-[length:var(--tos-text-title)] text-tos-text-strong">
          Your seat is secured
        </h1>
        <p className="mt-3 text-sm text-tos-text-muted">
          {guestPaymentCopy(payment?.status ?? "PENDING")}
        </p>

        <dl className="mt-8 space-y-4 rounded-[var(--tos-radius-lg)] border border-tos-border-subtle bg-tos-surface p-6">
          <div>
            <dt className="text-xs text-tos-text-muted">Confirmation</dt>
            <dd className="font-mono text-lg text-tos-text-strong">{reservation.confirmationCode}</dd>
          </div>
          <div>
            <dt className="text-xs text-tos-text-muted">Guest</dt>
            <dd className="text-tos-text-strong">{reservation.guest.name}</dd>
          </div>
          <div>
            <dt className="text-xs text-tos-text-muted">Evening</dt>
            <dd className="text-tos-text-strong">{reservation.diningEvent?.title}</dd>
            <dd className="text-sm text-tos-text-muted">
              {format(reservation.scheduledAt, "EEEE d MMMM yyyy · HH:mm")}
            </dd>
          </div>
          {payment ? (
            <div>
              <dt className="text-xs text-tos-text-muted">Payment</dt>
              <dd className="text-tos-text-strong">
                {formatMoney(payment.amountCents, payment.currency)} ·{" "}
                {payment.status.replaceAll("_", " ")}
              </dd>
              <dd className="mt-1 text-xs text-tos-text-faint">
                Adapter: {payment.adapter}
                {payment.escrowRef ? ` · ref ${payment.escrowRef}` : ""}
              </dd>
            </div>
          ) : null}
        </dl>

        <div className="mt-8">
          <Link href={`/book/${slug}`}>
            <Button variant="secondary">Back to evenings</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
