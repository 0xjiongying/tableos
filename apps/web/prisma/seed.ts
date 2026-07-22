import { PrismaClient, StaffRole } from "@prisma/client";
import { addDays, setHours, setMinutes } from "date-fns";

const prisma = new PrismaClient();

function evening(daysFromNow: number, hour = 19) {
  const d = addDays(new Date(), daysFromNow);
  return setMinutes(setHours(d, hour), 0);
}

async function main() {
  await prisma.blockchainEvent.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.kitchenTicket.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.revenueSplitRule.deleteMany();
  await prisma.diningEvent.deleteMany();
  await prisma.diningTable.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.menuCategory.deleteMany();
  await prisma.aiMessage.deleteMany();
  await prisma.aiConversation.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.guestProfile.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.staffMember.deleteMany();
  await prisma.featureFlag.deleteMany();
  await prisma.restaurantSetting.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.agentEvent.deleteMany();

  const restaurant = await prisma.restaurant.create({
    data: {
      slug: "kintsugi",
      name: "Kintsugi",
      tagline: "Omakase by the gold seam",
      description:
        "A twelve-seat counter in Omotesando. Seasonal kaiseki, quiet service, held funds until you arrive.",
      timezone: "Asia/Tokyo",
      currency: "USD",
      branches: {
        create: {
          name: "Omotesando",
          addressLine1: "5-10-1 Jingumae",
          city: "Tokyo",
          country: "JP",
          phone: "+81-3-0000-0000",
        },
      },
      featureFlags: {
        create: [
          { key: "AI_ASSISTANT", enabled: true },
          { key: "ARC_PAYMENTS", enabled: false },
          { key: "ANALYTICS_AI", enabled: true },
          { key: "KITCHEN_BOARD", enabled: false },
          { key: "LOYALTY", enabled: false },
          { key: "COMMAND_PALETTE", enabled: false },
        ],
      },
      settings: {
        create: [
          { key: "platform_fee_bps", value: 100 },
          { key: "demo_mode", value: true },
        ],
      },
    },
    include: { branches: true },
  });

  const branch = restaurant.branches[0]!;

  await prisma.staffMember.createMany({
    data: [
      {
        restaurantId: restaurant.id,
        branchId: branch.id,
        email: "host@kintsugi.tokyo",
        name: "Aya Nakamura",
        role: StaffRole.HOST,
      },
      {
        restaurantId: restaurant.id,
        branchId: branch.id,
        email: "owner@kintsugi.tokyo",
        name: "Kenji Mori",
        role: StaffRole.OWNER,
      },
      {
        restaurantId: restaurant.id,
        branchId: branch.id,
        email: "door@kintsugi.tokyo",
        name: "Mika Sato",
        role: StaffRole.DOOR,
      },
    ],
  });

  await prisma.diningTable.createMany({
    data: [
      { branchId: branch.id, label: "C1", capacity: 1, zone: "Counter" },
      { branchId: branch.id, label: "C2", capacity: 1, zone: "Counter" },
      { branchId: branch.id, label: "C3", capacity: 1, zone: "Counter" },
      { branchId: branch.id, label: "C4", capacity: 1, zone: "Counter" },
      { branchId: branch.id, label: "T1", capacity: 2, zone: "Table" },
      { branchId: branch.id, label: "T2", capacity: 2, zone: "Table" },
    ],
  });

  const courses = await prisma.menuCategory.create({
    data: {
      restaurantId: restaurant.id,
      name: "Kaiseki courses",
      sortOrder: 1,
      items: {
        create: [
          {
            restaurantId: restaurant.id,
            name: "Sakizuke",
            description: "Hokkaido uni, cucumber ice, shiso oil",
            priceCents: 0,
            courseTag: "opening",
          },
          {
            restaurantId: restaurant.id,
            name: "Owan",
            description: "Clear broth, tilefish, yuzu",
            priceCents: 0,
            courseTag: "soup",
          },
          {
            restaurantId: restaurant.id,
            name: "Yakimono",
            description: "Binchotan-grilled amadai",
            priceCents: 0,
            courseTag: "grill",
          },
        ],
      },
    },
  });
  void courses;

  const spring = await prisma.diningEvent.create({
    data: {
      restaurantId: restaurant.id,
      branchId: branch.id,
      slug: "spring-gold-seam",
      title: "Spring Gold Seam",
      subtitle: "Twelve seats · seasonal kaiseki",
      description:
        "A single seating. Full prepayment held until attendance, then released to the house and collaborating ceramicist.",
      startsAt: evening(5, 19),
      endsAt: evening(5, 22),
      capacity: 12,
      seatsHeld: 0,
      seatsBooked: 4,
      priceCents: 420_00,
      currency: "USD",
      published: true,
      cancelPolicy: "full_refund_48h",
      splitRules: {
        create: [
          { label: "House", bps: 8500, payeeRef: "kintsugi-house", sortOrder: 0 },
          { label: "Guest ceramicist", bps: 1500, payeeRef: "ceramicist-yuki", sortOrder: 1 },
        ],
      },
    },
  });

  const tea = await prisma.diningEvent.create({
    data: {
      restaurantId: restaurant.id,
      branchId: branch.id,
      slug: "moon-tea-pairing",
      title: "Moon Tea Pairing",
      subtitle: "Eight seats · tea × dessert",
      description: "An intimate late seating with Kyoto gyokuro and wagashi.",
      startsAt: evening(12, 20),
      endsAt: evening(12, 22),
      capacity: 8,
      seatsBooked: 2,
      priceCents: 180_00,
      currency: "USD",
      published: true,
      splitRules: {
        create: [{ label: "House", bps: 10000, payeeRef: "kintsugi-house", sortOrder: 0 }],
      },
    },
  });

  const guests = await Promise.all(
    [
      { name: "Elena Vargas", email: "elena@example.com" },
      { name: "Hiro Tanaka", email: "hiro@example.com" },
      { name: "Sophie Laurent", email: "sophie@example.com" },
      { name: "James Okonkwo", email: "james@example.com" },
    ].map((g) =>
      prisma.guest.create({
        data: {
          restaurantId: restaurant.id,
          name: g.name,
          email: g.email,
          profiles: { create: { vip: g.name.startsWith("Elena"), dietaryNotes: "No shellfish if noted" } },
        },
      }),
    ),
  );

  const codes = ["KNT7A2", "KNT8B3", "KNT9C4", "KNT1D5"];
  for (let i = 0; i < 4; i++) {
    const guest = guests[i]!;
    const reservation = await prisma.reservation.create({
      data: {
        restaurantId: restaurant.id,
        branchId: branch.id,
        diningEventId: spring.id,
        guestId: guest.id,
        partySize: 1,
        status: i === 0 ? "CHECKED_IN" : "CONFIRMED",
        scheduledAt: spring.startsAt,
        confirmationCode: codes[i]!,
        checkedInAt: i === 0 ? new Date() : null,
        notes: i === 2 ? "Anniversary" : null,
      },
    });

    const payment = await prisma.payment.create({
      data: {
        restaurantId: restaurant.id,
        reservationId: reservation.id,
        guestId: guest.id,
        amountCents: spring.priceCents,
        currency: "USD",
        status: i === 0 ? "RELEASED" : "ESCROWED",
        adapter: "mock",
        externalId: `pay_seed_${i}`,
        escrowRef: `escrow_seed_${i}`,
        releaseTxRef: i === 0 ? "release_seed_0" : null,
        platformFeeCents: 420,
      },
    });
    void payment;
  }

  // Tea event bookings
  for (let i = 0; i < 2; i++) {
    const guest = guests[i]!;
    await prisma.reservation.create({
      data: {
        restaurantId: restaurant.id,
        branchId: branch.id,
        diningEventId: tea.id,
        guestId: guest.id,
        partySize: 1,
        status: "CONFIRMED",
        scheduledAt: tea.startsAt,
        confirmationCode: `TEA${i + 1}X9`,
      },
    });
  }

  await prisma.activity.createMany({
    data: [
      {
        restaurantId: restaurant.id,
        verb: "CREATED",
        actorLabel: "Aya Nakamura",
        subjectType: "DiningEvent",
        subjectId: spring.id,
        summary: "Published Spring Gold Seam",
      },
      {
        restaurantId: restaurant.id,
        verb: "BOOKED",
        actorLabel: "Elena Vargas",
        subjectType: "Reservation",
        summary: "Booked Spring Gold Seam · KNT7A2",
      },
      {
        restaurantId: restaurant.id,
        verb: "ESCROWED",
        actorLabel: "Payments",
        subjectType: "Payment",
        summary: "Held $420 for KNT8B3",
      },
      {
        restaurantId: restaurant.id,
        verb: "CHECKED_IN",
        actorLabel: "Mika Sato",
        subjectType: "Reservation",
        summary: "Checked in Elena Vargas",
      },
      {
        restaurantId: restaurant.id,
        verb: "RELEASED",
        actorLabel: "Door",
        subjectType: "Payment",
        summary: "Released held funds for KNT7A2",
      },
    ],
  });

  console.log("Seeded Kintsugi demo restaurant.");
  console.log("Staff login: host@kintsugi.tokyo / tableos-demo");
  console.log(`Events: ${spring.slug}, ${tea.slug}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
