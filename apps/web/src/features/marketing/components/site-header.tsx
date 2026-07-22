"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/features/marketing/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-tos-border-subtle bg-tos-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[72rem] items-center justify-between gap-4 px-6 md:px-8">
        <Link href="/" className="flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="text-base font-medium tracking-[-0.02em] text-tos-text-strong">{SITE.name}</span>
          <span className="hidden text-xs text-tos-text-faint sm:inline">Hospitality OS</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => {
            const active = !l.href.includes("#") && pathname === l.href;
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

        <div className="hidden items-center gap-2 md:flex">
          <Link href={SITE.demoBook}>
            <Button variant="ghost" size="sm">
              Live demo
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="sm">Request demo</Button>
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--tos-radius-md)] border border-tos-border md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-tos-border-subtle bg-tos-bg px-6 py-4 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-[var(--tos-radius-md)] px-3 py-2.5 text-sm text-tos-text"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link href={SITE.demoBook} className="px-3 py-2.5 text-sm text-tos-text-muted" onClick={() => setOpen(false)}>
              Live product demo
            </Link>
            <Link href="/contact" className="mt-2" onClick={() => setOpen(false)}>
              <Button className="w-full">Request demo</Button>
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
