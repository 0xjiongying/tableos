"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type AiResponse = {
  ok?: boolean;
  content?: string;
  provider?: string;
  model?: string;
  hits?: Array<{
    id: string;
    guestName: string;
    confirmationCode: string;
    status: string;
    eventTitle?: string;
  }>;
  message?: string;
  error?: string;
};

export default function StaffAiPage() {
  const [summary, setSummary] = useState<AiResponse | null>(null);
  const [search, setSearch] = useState<AiResponse | null>(null);
  const [query, setQuery] = useState("Elena confirmed");
  const [loading, setLoading] = useState<"summary" | "search" | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading("summary");
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "summary", query: "" }),
      });
      const data = (await res.json()) as AiResponse;
      if (!cancelled) {
        setSummary(data);
        setLoading(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function run(mode: "summary" | "search") {
    setLoading(mode);
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, query }),
    });
    const data = (await res.json()) as AiResponse;
    setLoading(null);
    if (mode === "summary") setSummary(data);
    else setSearch(data);
  }

  return (
    <main className="space-y-10">
      <header>
        <p className="text-xs tracking-[0.18em] text-tos-premium uppercase">Before service</p>
        <h1 className="mt-2 text-[length:var(--tos-text-title)] text-tos-text-strong">Evening posture</h1>
        <p className="mt-1 max-w-xl text-sm text-tos-text-muted">
          What settled, what is held, what needs attention — already composed for the floor.
        </p>
      </header>

      <section className="tos-plane p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-medium text-tos-text-strong">Tonight</h2>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => run("summary")}
            disabled={loading === "summary"}
          >
            {loading === "summary" ? "Refreshing…" : "Refresh"}
          </Button>
        </div>
        <div
          className={cn("mt-4 min-h-[4.5rem] text-sm leading-relaxed text-tos-text", !summary?.content && "tos-waiting")}
          aria-live="polite"
        >
          {summary?.content ?? (loading === "summary" ? "Composing the evening…" : "—")}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-tos-text-strong">Find a guest</h2>
        <p className="mt-1 text-sm text-tos-text-muted">Ask in plain language.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Label htmlFor="query">Query</Label>
            <Input id="query" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <Button onClick={() => run("search")} disabled={loading === "search"}>
            {loading === "search" ? "Searching…" : "Search"}
          </Button>
        </div>
        {search?.content ? <p className="mt-4 text-sm text-tos-text">{search.content}</p> : null}
        {search?.hits?.length ? (
          <ul className="mt-3 space-y-2">
            {search.hits.map((h) => (
              <li
                key={h.id}
                className="rounded-[var(--tos-radius-md)] bg-tos-bg-subtle px-3 py-2 text-sm"
              >
                <span className="font-medium text-tos-text-strong">{h.guestName}</span>
                <span className="text-tos-text-muted">
                  {" "}
                  · {h.confirmationCode} · {h.status}
                  {h.eventTitle ? ` · ${h.eventTitle}` : ""}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </main>
  );
}
