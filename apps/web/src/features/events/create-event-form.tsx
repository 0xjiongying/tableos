"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";

export function CreateEventForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const startsLocal = String(fd.get("startsAt"));
    const endsLocal = String(fd.get("endsAt"));
    const payload = {
      slug: String(fd.get("slug")),
      title: String(fd.get("title")),
      subtitle: String(fd.get("subtitle") || "") || undefined,
      description: String(fd.get("description") || "") || undefined,
      startsAt: new Date(startsLocal).toISOString(),
      endsAt: new Date(endsLocal).toISOString(),
      capacity: Number(fd.get("capacity")),
      priceCents: Math.round(Number(fd.get("price")) * 100),
      splitRules: [
        {
          label: "House",
          bps: Number(fd.get("houseBps")),
          payeeRef: "kintsugi-house",
        },
        {
          label: "Partner",
          bps: 10000 - Number(fd.get("houseBps")),
          payeeRef: String(fd.get("partnerRef") || "partner"),
        },
      ],
    };

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Could not create event");
      return;
    }
    router.refresh();
    e.currentTarget.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New evening</CardTitle>
        <CardDescription>Create premium inventory with a revenue split.</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" required placeholder="Autumn Counter" />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" required pattern="[a-z0-9-]+" placeholder="autumn-counter" />
        </div>
        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input id="subtitle" name="subtitle" placeholder="Ten seats · kaiseki" />
        </div>
        <div>
          <Label htmlFor="startsAt">Starts</Label>
          <Input id="startsAt" name="startsAt" type="datetime-local" required />
        </div>
        <div>
          <Label htmlFor="endsAt">Ends</Label>
          <Input id="endsAt" name="endsAt" type="datetime-local" required />
        </div>
        <div>
          <Label htmlFor="capacity">Capacity</Label>
          <Input id="capacity" name="capacity" type="number" min={1} defaultValue={10} required />
        </div>
        <div>
          <Label htmlFor="price">Price per guest (USD)</Label>
          <Input id="price" name="price" type="number" min={1} defaultValue={320} required />
        </div>
        <div>
          <Label htmlFor="houseBps">House share (bps)</Label>
          <Input id="houseBps" name="houseBps" type="number" min={0} max={10000} defaultValue={9000} required />
        </div>
        <div>
          <Label htmlFor="partnerRef">Partner payee ref</Label>
          <Input id="partnerRef" name="partnerRef" defaultValue="partner-collab" />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" placeholder="Single seating. Held funds until attendance." />
        </div>
        {error ? (
          <p role="alert" className="md:col-span-2 text-sm text-tos-danger">
            {error}
          </p>
        ) : null}
        <div className="md:col-span-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Publishing…" : "Publish evening"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
