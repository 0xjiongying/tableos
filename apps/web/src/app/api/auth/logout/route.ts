import { NextResponse } from "next/server";
import { clearSession } from "@/lib/auth/session";

export async function POST() {
  await clearSession();
  return NextResponse.redirect(new URL("/staff/login", process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"), {
    status: 303,
  });
}
