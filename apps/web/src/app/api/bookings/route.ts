import { NextResponse } from "next/server";
import { z } from "zod";
import { bookAndPay } from "@/features/reservations/service";

const schema = z.object({
  restaurantSlug: z.string().min(1),
  eventSlug: z.string().min(1),
  guestName: z.string().min(1).max(120),
  guestEmail: z.string().email(),
  partySize: z.number().int().min(1).max(12),
  notes: z.string().max(500).optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid booking payload", details: parsed.error.flatten() }, { status: 400 });
  }
  try {
    const result = await bookAndPay(parsed.data);
    return NextResponse.json({
      confirmationCode: result.reservation.confirmationCode,
      reservationId: result.reservation.id,
      paymentStatus: result.payment.status,
      escrowRef: result.payment.escrowRef,
      amountCents: result.payment.amountCents,
      currency: result.payment.currency,
      eventTitle: result.event.title,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Booking failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
