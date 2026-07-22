import Link from "next/link";
import { cn } from "@/lib/utils";

const staffLinks = [
  { href: "/staff", label: "Dashboard" },
  { href: "/staff/events", label: "Events" },
  { href: "/staff/reservations", label: "Reservations" },
  { href: "/staff/door", label: "Door" },
  { href: "/staff/ai", label: "Briefing" },
] as const;

export function StaffNav({ pathname }: { pathname: string }) {
  return (
    <header className="border-b border-tos-border-subtle bg-tos-surface/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[72rem] flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-6">
          <Link href="/staff" className="font-medium tracking-tight text-tos-text-strong">
            TableOS
          </Link>
          <nav aria-label="Staff" className="flex flex-wrap gap-1">
            {staffLinks.map((l) => {
              const active = pathname === l.href || (l.href !== "/staff" && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "rounded-[var(--tos-radius-md)] px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "bg-tos-bg-muted text-tos-text-strong"
                      : "text-tos-text-muted hover:text-tos-text",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm text-tos-text-muted">
          <Link href="/book/kintsugi" className="hover:text-tos-text">
            Guest book
          </Link>
          <form action="/api/auth/logout" method="post">
            <button type="submit" className="hover:text-tos-text">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

export function GuestNav({ restaurantName }: { restaurantName: string }) {
  return (
    <header className="border-b border-tos-border-subtle">
      <div className="mx-auto flex max-w-[40rem] items-center justify-between px-8 py-6">
        <div>
          <p className="text-xs tracking-[0.18em] text-tos-premium uppercase">TableOS</p>
          <p className="mt-1 text-lg font-medium text-tos-text-strong">{restaurantName}</p>
        </div>
        <Link href="/" className="text-sm text-tos-text-muted hover:text-tos-text">
          Home
        </Link>
      </div>
    </header>
  );
}
