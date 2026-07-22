"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";

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
    <main className="space-y-8">
      <header>
        <h1 className="text-[length:var(--tos-text-title)] text-tos-text-strong">Briefing</h1>
        <p className="mt-1 text-sm text-tos-text-muted">
          AI operations summary and natural-language reservation search. Works offline via
          heuristics when <span className="font-mono">OPENAI_API_KEY</span> is unset.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Evening brief</CardTitle>
          <CardDescription>Revenue glance in calm language.</CardDescription>
        </CardHeader>
        <Button onClick={() => run("summary")} disabled={loading === "summary"}>
          {loading === "summary" ? "Composing…" : "Generate briefing"}
        </Button>
        {summary?.content ? (
          <p className="mt-4 text-sm leading-relaxed text-tos-text">{summary.content}</p>
        ) : null}
        {summary?.provider ? (
          <p className="mt-2 text-xs text-tos-text-faint">
            Provider: {summary.provider}
            {summary.model ? ` · ${summary.model}` : ""}
          </p>
        ) : null}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Find a reservation</CardTitle>
          <CardDescription>Ask in plain language.</CardDescription>
        </CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Label htmlFor="query">Query</Label>
            <Input id="query" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <Button onClick={() => run("search")} disabled={loading === "search"}>
            {loading === "search" ? "Searching…" : "Search"}
          </Button>
        </div>
        {search?.content ? (
          <p className="mt-4 text-sm text-tos-text">{search.content}</p>
        ) : null}
        {search?.hits?.length ? (
          <ul className="mt-3 space-y-2">
            {search.hits.map((h) => (
              <li
                key={h.id}
                className="rounded-[var(--tos-radius-md)] border border-tos-border-subtle bg-tos-bg-subtle px-3 py-2 text-sm"
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
      </Card>
    </main>
  );
}
