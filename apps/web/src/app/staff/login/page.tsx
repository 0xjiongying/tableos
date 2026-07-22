"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";

export default function StaffLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("host@kintsugi.tokyo");
  const [password, setPassword] = useState("tableos-demo");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Sign-in failed");
      return;
    }
    router.push("/staff");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-[28rem] flex-col justify-center px-6 py-12">
      <Card>
        <CardHeader>
          <p className="text-xs tracking-[0.18em] text-tos-premium uppercase">Staff</p>
          <CardTitle>Entrance</CardTitle>
          <CardDescription>
            Demo auth for Kintsugi. Password: <span className="font-mono">tableos-demo</span>
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error ? (
            <p role="alert" className="text-sm text-tos-danger">
              {error}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in…" : "Enter"}
          </Button>
        </form>
      </Card>
    </main>
  );
}
