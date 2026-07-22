import Link from "next/link";
import { ARC, SITE } from "@/features/marketing/content";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/product", label: "Overview" },
      { href: "/#lifecycle", label: "Value Streams" },
      { href: "/#features", label: "MVP features" },
      { href: SITE.demoBook, label: "Guest booking" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/security", label: "Security" },
      { href: "/contact", label: "Contact" },
      { href: SITE.demoStaff, label: "Staff entrance" },
    ],
  },
  {
    title: "Developers",
    links: [
      { href: "/technology", label: "Architecture & Arc" },
      { href: SITE.github, label: "TableOS GitHub", external: true },
      { href: ARC.docs, label: "Arc docs", external: true },
      { href: ARC.github, label: "arc-node", external: true },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-tos-border-subtle bg-tos-bg-subtle">
      <div className="mx-auto grid max-w-[72rem] gap-10 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8">
        <div>
          <p className="text-sm font-medium text-tos-text-strong">{SITE.name}</p>
          <p className="mt-3 max-w-xs text-sm text-tos-text-muted">{SITE.tagline}</p>
          <p className="mt-4 text-xs text-tos-text-faint">
            Built for{" "}
            <a href={ARC.site} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
              Arc
            </a>{" "}
            by Circle · Settled in USDC
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-xs tracking-[0.16em] text-tos-text-faint uppercase">{col.title}</p>
            <ul className="mt-4 space-y-2">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  {"external" in l && l.external ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-tos-text-muted hover:text-tos-text"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="text-sm text-tos-text-muted hover:text-tos-text">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-tos-border-subtle">
        <div className="mx-auto flex max-w-[72rem] flex-col gap-2 px-6 py-6 text-xs text-tos-text-faint md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} TableOS. Programmable financial OS for premium dining.</p>
          <p>Built on Arc · Settled in USDC</p>
        </div>
      </div>
    </footer>
  );
}
