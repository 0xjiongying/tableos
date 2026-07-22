import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession, roleCan } from "@/lib/auth/session";
import { getAiPort } from "@/lib/ports/ai";
import { prisma } from "@/lib/db";
import { dashboardStats } from "@/features/reservations/service";

const schema = z.object({
  mode: z.enum(["summary", "search"]),
  query: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || !roleCan(session.role, "view")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug: session.restaurantSlug },
  });
  if (!restaurant) {
    return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
  }

  const ai = getAiPort();

  if (parsed.data.mode === "summary") {
    const stats = await dashboardStats(restaurant.id);
    const noShows = await prisma.reservation.count({
      where: { restaurantId: restaurant.id, status: "NO_SHOW" },
    });
    const result = await ai.summarizeOperations({
      restaurantName: restaurant.name,
      reservationsTonight: stats.reservationsActive,
      escrowedCents: stats.escrowedCents,
      releasedCents: stats.releasedCents,
      noShows,
      notes: stats.activities.slice(0, 3).map((a) => a.summary),
    });
    await prisma.activity.create({
      data: {
        restaurantId: restaurant.id,
        verb: "AI_QUERY",
        actorLabel: session.name,
        subjectType: "AiBriefing",
        summary: "Generated operations briefing",
      },
    });
    return NextResponse.json(result);
  }

  const reservations = await prisma.reservation.findMany({
    where: { restaurantId: restaurant.id },
    include: { guest: true, diningEvent: true },
    take: 40,
    orderBy: { scheduledAt: "desc" },
  });

  const result = await ai.searchReservationsNaturalLanguage({
    query: parsed.data.query ?? "",
    candidates: reservations.map((r) => ({
      id: r.id,
      guestName: r.guest.name,
      confirmationCode: r.confirmationCode,
      scheduledAt: r.scheduledAt.toISOString(),
      status: r.status,
      partySize: r.partySize,
      eventTitle: r.diningEvent?.title,
    })),
  });

  return NextResponse.json(result);
}
