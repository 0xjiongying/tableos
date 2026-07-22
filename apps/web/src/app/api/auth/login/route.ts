import { NextResponse } from "next/server";
import { z } from "zod";
import {
  DEMO_STAFF,
  setSession,
  verifyDemoPassword,
} from "@/lib/auth/session";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  if (process.env.DEMO_AUTH_ENABLED === "false") {
    return NextResponse.json(
      {
        error:
          "Demo auth disabled. Configure Supabase Auth (scaffold) or set DEMO_AUTH_ENABLED=true.",
      },
      { status: 501 },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid credentials payload" }, { status: 400 });
  }

  const allowed = ["host@kintsugi.tokyo", "owner@kintsugi.tokyo", "door@kintsugi.tokyo"];
  if (!allowed.includes(parsed.data.email.toLowerCase()) || !verifyDemoPassword(parsed.data.password)) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const role =
    parsed.data.email.startsWith("owner")
      ? "OWNER"
      : parsed.data.email.startsWith("door")
        ? "DOOR"
        : "HOST";

  await setSession({
    ...DEMO_STAFF,
    email: parsed.data.email.toLowerCase(),
    name:
      role === "OWNER" ? "Kenji Mori" : role === "DOOR" ? "Mika Sato" : "Aya Nakamura",
    role,
  });

  return NextResponse.json({ ok: true });
}
