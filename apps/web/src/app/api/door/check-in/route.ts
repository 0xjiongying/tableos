import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession, roleCan } from "@/lib/auth/session";
import { checkInAndRelease } from "@/features/reservations/service";

const schema = z.object({
  reservationId: z.string().min(1),
});

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || !roleCan(session.role, "door")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  try {
    const result = await checkInAndRelease({
      reservationId: parsed.data.reservationId,
      attestedBy: session.name,
    });
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Check-in failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
