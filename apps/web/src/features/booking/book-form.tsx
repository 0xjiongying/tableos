"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

export function BookForm({
  restaurantSlug,
  eventSlug,
  maxParty,
  disabled,
}: {
  restaurantSlug: string;
  eventSlug: string;
  maxParty: number;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (disabled) return;
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        restaurantSlug,
        eventSlug,
        guestName: String(fd.get("guestName")),
        guestEmail: String(fd.get("guestEmail")),
        partySize: Number(fd.get("partySize")),
        notes: String(fd.get("notes") || "") || undefined,
      }),
    });
    const data = (await res.json()) as {
      error?: string;
      confirmationCode?: string;
    };
    setLoading(false);
    if (!res.ok || !data.confirmationCode) {
      setError(data.error ?? "Booking failed");
      return;
    }
    router.push(`/book/${restaurantSlug}/confirm/${data.confirmationCode}`);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 rounded-[var(--tos-radius-lg)] bg-tos-bg-subtle p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor={`name-${eventSlug}`}>Full name</Label>
          <Input id={`name-${eventSlug}`} name="guestName" required disabled={disabled} />
        </div>
        <div>
          <Label htmlFor={`email-${eventSlug}`}>Email</Label>
          <Input
            id={`email-${eventSlug}`}
            name="guestEmail"
            type="email"
            required
            disabled={disabled}
          />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor={`party-${eventSlug}`}>Guests</Label>
          <Input
            id={`party-${eventSlug}`}
            name="partySize"
            type="number"
            min={1}
            max={maxParty}
            defaultValue={1}
            required
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor={`notes-${eventSlug}`}>Notes</Label>
          <Textarea
            id={`notes-${eventSlug}`}
            name="notes"
            className="min-h-[42px]"
            placeholder="Allergies, celebration"
            disabled={disabled}
          />
        </div>
      </div>
      {error ? (
        <p role="alert" className="text-sm text-tos-danger">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={disabled || loading}>
        {disabled ? "Fully reserved" : loading ? "Securing seat…" : "Reserve & hold payment"}
      </Button>
    </form>
  );
}
