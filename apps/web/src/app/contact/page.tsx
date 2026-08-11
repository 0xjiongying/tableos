"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MarketingShell } from "@/features/marketing/components/marketing-shell";
import { SITE } from "@/features/marketing/content";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const org = String(data.get("org") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`FlowArc demo request — ${org || name || "inquiry"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nOrganization: ${org}\n\n${message}\n\n— Sent from ${SITE.url}/contact`,
    );
    window.location.href = `mailto:hello@flowarc.app?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <MarketingShell>
      <section className="border-b border-tos-border-subtle">
        <div className="mx-auto grid max-w-[72rem] gap-12 px-6 py-20 md:grid-cols-2 md:px-8 md:py-28">
          <div>
            <p className="text-xs tracking-[0.2em] text-tos-premium uppercase">Contact</p>
            <h1 className="mt-3 text-[length:var(--tos-text-title)] leading-tight text-tos-text-strong">
              Request a demo
            </h1>
            <p className="mt-4 max-w-md text-tos-text-muted">
              Walk through the settlement workflow with your team — or open the live product demos immediately.
            </p>
            <ul className="mt-8 space-y-2 text-sm text-tos-text-muted">
              <li>
                Guest book:{" "}
                <Link href={SITE.demoBook} className="text-tos-text-strong underline-offset-2 hover:underline">
                  /book/kintsugi
                </Link>
              </li>
              <li>
                Staff:{" "}
                <Link href={SITE.demoStaff} className="text-tos-text-strong underline-offset-2 hover:underline">
                  /staff/login
                </Link>{" "}
                · {SITE.demoCredentials.email}
              </li>
              <li>
                GitHub:{" "}
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  0xjiongying/tableos
                </a>
              </li>
            </ul>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-[var(--tos-radius-lg)] border border-tos-border bg-tos-surface p-6 md:p-8"
            noValidate
          >
            <div className="space-y-4">
              <Field label="Name" name="name" required autoComplete="name" />
              <Field label="Work email" name="email" type="email" required autoComplete="email" />
              <Field label="Organization" name="org" autoComplete="organization" />
              <div>
                <label htmlFor="message" className="text-sm text-tos-text-strong">
                  What should we cover?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="mt-1.5 w-full rounded-[var(--tos-radius-md)] border border-tos-border bg-tos-surface-sunken px-3 py-2 text-sm text-tos-text outline-none focus-visible:shadow-[var(--tos-focus-ring)]"
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Open email draft
              </Button>
              {sent ? (
                <p className="text-sm text-tos-success" role="status">
                  Your mail client should open with a prefilled request. If it does not, email hello@flowarc.app.
                </p>
              ) : (
                <p className="text-xs text-tos-text-faint">
                  Opens your mail client — no data is stored on this form yet.
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </MarketingShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm text-tos-text-strong">
        {label}
      </label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-1.5"
      />
    </div>
  );
}
