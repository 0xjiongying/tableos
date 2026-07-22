import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

export type SessionUser = {
  email: string;
  name: string;
  role: "OWNER" | "GM" | "HOST" | "DOOR" | "FINANCE" | "VIEWER";
  restaurantSlug: string;
};

const COOKIE = "tableos_session";

function secret() {
  return process.env.SESSION_SECRET ?? "tableos-dev-session-secret-change-me";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function encodeSession(user: SessionUser): string {
  const body = Buffer.from(JSON.stringify(user), "utf8").toString("base64url");
  return `${body}.${sign(body)}`;
}

export function decodeSession(token: string | undefined): SessionUser | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = sign(body);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionUser;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const jar = await cookies();
  return decodeSession(jar.get(COOKIE)?.value);
}

export async function setSession(user: SessionUser) {
  const jar = await cookies();
  jar.set(COOKIE, encodeSession(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export const DEMO_STAFF: SessionUser = {
  email: "host@kintsugi.tokyo",
  name: "Aya Nakamura",
  role: "HOST",
  restaurantSlug: "kintsugi",
};

export function verifyDemoPassword(password: string): boolean {
  const expected = process.env.DEMO_STAFF_PASSWORD ?? "tableos-demo";
  return password === expected;
}

export function roleCan(role: SessionUser["role"], action: "manage_events" | "door" | "finance" | "view") {
  const rank: Record<SessionUser["role"], number> = {
    VIEWER: 1,
    DOOR: 2,
    HOST: 3,
    FINANCE: 3,
    GM: 4,
    OWNER: 5,
  };
  switch (action) {
    case "view":
      return rank[role] >= 1;
    case "door":
      return rank[role] >= 2;
    case "manage_events":
      return rank[role] >= 3;
    case "finance":
      return role === "FINANCE" || role === "GM" || role === "OWNER";
    default:
      return false;
  }
}
