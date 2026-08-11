import { NextResponse } from "next/server";

/**
 * Lightweight liveness probe for Render health checks.
 * Intentionally avoids database and external I/O so a cold instance
 * can become healthy even if Postgres is slow or temporarily unavailable.
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "flowarc",
      time: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
