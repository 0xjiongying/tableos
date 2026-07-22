import { prisma } from "@/lib/db";
import { canBookParty } from "@/domain/settlement";
import { getPaymentsPort } from "@/lib/ports/payments";
import { generateConfirmationCode } from "@/lib/utils";
import type { Prisma } from "@prisma/client";

export async function getRestaurantBySlug(slug: string) {
  return prisma.restaurant.findUnique({
    where: { slug },
    include: {
      branches: true,
      diningEvents: {
        where: { published: true },
        orderBy: { startsAt: "asc" },
        include: { splitRules: { orderBy: { sortOrder: "asc" } } },
      },
    },
  });
}

export async function listEvents(restaurantId: string) {
  return prisma.diningEvent.findMany({
    where: { restaurantId },
    orderBy: { startsAt: "asc" },
    include: { splitRules: true, _count: { select: { reservations: true } } },
  });
}

export async function createEvent(input: {
  restaurantId: string;
  branchId: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  startsAt: Date;
  endsAt: Date;
  capacity: number;
  priceCents: number;
  splitRules: Array<{ label: string; bps: number; payeeRef: string }>;
}) {
  return prisma.diningEvent.create({
    data: {
      restaurantId: input.restaurantId,
      branchId: input.branchId,
      slug: input.slug,
      title: input.title,
      subtitle: input.subtitle,
      description: input.description,
      startsAt: input.startsAt,
      endsAt: input.endsAt,
      capacity: input.capacity,
      priceCents: input.priceCents,
      published: true,
      splitRules: {
        create: input.splitRules.map((r, i) => ({ ...r, sortOrder: i })),
      },
    },
    include: { splitRules: true },
  });
}

export async function bookAndPay(input: {
  restaurantSlug: string;
  eventSlug: string;
  guestName: string;
  guestEmail: string;
  partySize: number;
  notes?: string;
}) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug: input.restaurantSlug },
  });
  if (!restaurant) throw new Error("Restaurant not found");

  const event = await prisma.diningEvent.findUnique({
    where: { restaurantId_slug: { restaurantId: restaurant.id, slug: input.eventSlug } },
    include: { splitRules: true },
  });
  if (!event || !event.published) throw new Error("Event not found");

  const gate = canBookParty({
    capacity: event.capacity,
    seatsHeld: event.seatsHeld,
    seatsBooked: event.seatsBooked,
    partySize: input.partySize,
  });
  if (!gate.ok) throw new Error(gate.reason);

  const result = await prisma.$transaction(async (tx) => {
    const existingGuest = await tx.guest.findFirst({
      where: { restaurantId: restaurant.id, email: input.guestEmail },
    });
    const guest = existingGuest
      ? await tx.guest.update({
          where: { id: existingGuest.id },
          data: { name: input.guestName },
        })
      : await tx.guest.create({
          data: {
            restaurantId: restaurant.id,
            name: input.guestName,
            email: input.guestEmail,
          },
        });

    const reservation = await tx.reservation.create({
      data: {
        restaurantId: restaurant.id,
        branchId: event.branchId,
        diningEventId: event.id,
        guestId: guest.id,
        partySize: input.partySize,
        status: "HELD",
        scheduledAt: event.startsAt,
        confirmationCode: generateConfirmationCode(),
        notes: input.notes,
      },
    });

    const payment = await tx.payment.create({
      data: {
        restaurantId: restaurant.id,
        reservationId: reservation.id,
        guestId: guest.id,
        amountCents: event.priceCents * input.partySize,
        currency: event.currency,
        status: "PENDING",
        adapter: process.env.PAYMENTS_ADAPTER ?? "mock",
        platformFeeCents: Math.floor((event.priceCents * input.partySize * 100) / 10000),
      },
    });

    await tx.diningEvent.update({
      where: { id: event.id },
      data: { seatsHeld: { increment: input.partySize } },
    });

    return { guest, reservation, payment, event };
  });

  const payments = getPaymentsPort();
  const escrow = await payments.createEscrow({
    paymentId: result.payment.id,
    reservationId: result.reservation.id,
    payerRef: result.guest.email ?? result.guest.id,
    amount: {
      amountCents: result.payment.amountCents,
      currency: result.payment.currency,
    },
    splits: result.event.splitRules.map((r) => ({
      label: r.label,
      bps: r.bps,
      payeeRef: r.payeeRef,
    })),
  });

  if (!escrow.ok) {
    await prisma.$transaction([
      prisma.payment.update({
        where: { id: result.payment.id },
        data: { status: "FAILED", meta: { error: escrow.message } satisfies Prisma.InputJsonValue },
      }),
      prisma.reservation.update({
        where: { id: result.reservation.id },
        data: { status: "CANCELLED" },
      }),
      prisma.diningEvent.update({
        where: { id: result.event.id },
        data: { seatsHeld: { decrement: input.partySize } },
      }),
    ]);
    throw new Error(escrow.message);
  }

  const [payment, reservation] = await prisma.$transaction([
    prisma.payment.update({
      where: { id: result.payment.id },
      data: {
        status: "ESCROWED",
        escrowRef: escrow.escrowRef,
        externalId: escrow.externalId,
      },
    }),
    prisma.reservation.update({
      where: { id: result.reservation.id },
      data: { status: "CONFIRMED" },
    }),
    prisma.diningEvent.update({
      where: { id: result.event.id },
      data: {
        seatsHeld: { decrement: input.partySize },
        seatsBooked: { increment: input.partySize },
      },
    }),
    prisma.activity.create({
      data: {
        restaurantId: restaurant.id,
        verb: "BOOKED",
        actorLabel: result.guest.name,
        subjectType: "Reservation",
        subjectId: result.reservation.id,
        summary: `Booked ${result.event.title} · ${result.reservation.confirmationCode}`,
      },
    }),
    prisma.activity.create({
      data: {
        restaurantId: restaurant.id,
        verb: "ESCROWED",
        actorLabel: "Payments",
        subjectType: "Payment",
        subjectId: result.payment.id,
        summary: `Held funds for ${result.reservation.confirmationCode}`,
      },
    }),
  ]);

  return { payment, reservation, event: result.event, guest: result.guest };
}

export async function checkInAndRelease(input: {
  reservationId: string;
  attestedBy: string;
}) {
  const reservation = await prisma.reservation.findUnique({
    where: { id: input.reservationId },
    include: { payments: true, diningEvent: true },
  });
  if (!reservation) throw new Error("Reservation not found");

  const payment = reservation.payments.find((p) => p.status === "ESCROWED") ?? reservation.payments[0];
  if (!payment?.escrowRef) throw new Error("No held payment to release");

  const payments = getPaymentsPort();
  const released = await payments.releaseOnCondition({
    escrowRef: payment.escrowRef,
    paymentId: payment.id,
    condition: "attendance_verified",
    attestedBy: input.attestedBy,
  });

  if (!released.ok) throw new Error(released.message);

  await prisma.$transaction([
    prisma.reservation.update({
      where: { id: reservation.id },
      data: { status: "CHECKED_IN", checkedInAt: new Date() },
    }),
    prisma.payment.update({
      where: { id: payment.id },
      data: { status: "RELEASED", releaseTxRef: released.releaseTxRef },
    }),
    prisma.activity.create({
      data: {
        restaurantId: reservation.restaurantId,
        verb: "CHECKED_IN",
        actorLabel: input.attestedBy,
        subjectType: "Reservation",
        subjectId: reservation.id,
        summary: `Checked in ${reservation.confirmationCode}`,
      },
    }),
    prisma.activity.create({
      data: {
        restaurantId: reservation.restaurantId,
        verb: "RELEASED",
        actorLabel: input.attestedBy,
        subjectType: "Payment",
        subjectId: payment.id,
        summary: `Released held funds for ${reservation.confirmationCode}`,
      },
    }),
  ]);

  return { reservationId: reservation.id, paymentId: payment.id };
}

export async function dashboardStats(restaurantId: string) {
  const [reservations, escrowed, released, activities, events] = await Promise.all([
    prisma.reservation.count({
      where: { restaurantId, status: { in: ["CONFIRMED", "CHECKED_IN", "HELD"] } },
    }),
    prisma.payment.aggregate({
      where: { restaurantId, status: "ESCROWED" },
      _sum: { amountCents: true },
      _count: true,
    }),
    prisma.payment.aggregate({
      where: { restaurantId, status: "RELEASED" },
      _sum: { amountCents: true },
    }),
    prisma.activity.findMany({
      where: { restaurantId },
      orderBy: { createdAt: "desc" },
      take: 12,
    }),
    prisma.diningEvent.findMany({
      where: { restaurantId, published: true },
      orderBy: { startsAt: "asc" },
      take: 5,
    }),
  ]);

  return {
    reservationsActive: reservations,
    escrowedCents: escrowed._sum.amountCents ?? 0,
    escrowedCount: escrowed._count,
    releasedCents: released._sum.amountCents ?? 0,
    activities,
    events,
  };
}
