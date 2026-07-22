import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_color-mix(in_oklab,var(--tos-bamboo)_18%,transparent),_transparent_55%)]"
      />
      <div className="relative mx-auto flex min-h-screen max-w-[40rem] flex-col justify-center px-8 py-16">
        <p className="text-xs tracking-[0.22em] text-tos-premium uppercase">TableOS</p>
        <h1 className="mt-4 text-[length:var(--tos-text-display)] leading-[var(--tos-leading-display)] tracking-[var(--tos-tracking-display)] text-tos-text-strong">
          Quiet technology for the world’s finest tables
        </h1>
        <p className="mt-4 max-w-md text-tos-text-muted">
          Book scarce seats. Hold funds until attendance. Settle the house with calm certainty.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/book/kintsugi">
            <Button size="lg">Reserve an evening</Button>
          </Link>
          <Link href="/staff/login">
            <Button size="lg" variant="secondary">
              Staff entrance
            </Button>
          </Link>
        </div>
        <p className="mt-10 text-xs text-tos-text-faint">
          Demo restaurant: Kintsugi · Omotesando · tasting inventory with settlement-grade payments.
        </p>
      </div>
    </main>
  );
}
