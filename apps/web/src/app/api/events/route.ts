import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession, roleCan } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { assertSplitsValid } from "@/domain/settlement";
import { createEvent } from "@/features/reservations/service";

const schema = z.object({
  slug: z.string().min(2).max(64).regex(/^[a-z0-9-]+$/),
  title: z.string().min(2).max(120),
  subtitle: z.string().max(160).optional(),
  description: z.string().max(2000).optional(),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  capacity: z.number().int().min(1).max(200),
  priceCents: z.number().int().min(1),
  splitRules: z
    .array(
      z.object({
        label: z.string().min(1),
        bps: z.number().int().min(0).max(10000),
        payeeRef: z.string().min(1),
      }),
    )
    .min(1),
});

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || !roleCan(session.role, "manage_events")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid event", details: parsed.error.flatten() }, { status: 400 });
  }

  const splits = assertSplitsValid(parsed.data.splitRules);
  if (!splits.ok) {
    return NextResponse.json({ error: splits.message }, { status: 400 });
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug: session.restaurantSlug },
    include: { branches: true },
  });
  const branch = restaurant?.branches[0];
  if (!restaurant || !branch) {
    return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
  }

  try {
    const event = await createEvent({
      restaurantId: restaurant.id,
      branchId: branch.id,
      ...parsed.data,
      startsAt: new Date(parsed.data.startsAt),
      endsAt: new Date(parsed.data.endsAt),
    });
    await prisma.activity.create({
      data: {
        restaurantId: restaurant.id,
        verb: "CREATED",
        actorLabel: session.name,
        subjectType: "DiningEvent",
        subjectId: event.id,
        summary: `Published ${event.title}`,
      },
    });
    return NextResponse.json({ event });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Create failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
